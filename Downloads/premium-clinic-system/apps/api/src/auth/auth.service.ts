import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, hash } from 'bcryptjs'
import { PrismaService } from '../prisma/prisma.service'
import { LoginInput, RegisterInput, AuthResponse } from './dto/auth.dto'
import { User } from '@clinic/database'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { tenant: true },
    })

    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(loginInput: LoginInput, tenantId?: string): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginInput.email },
      include: { tenant: true },
    })

    if (!user || !(await compare(loginInput.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated')
    }

    if (tenantId && user.tenantId !== tenantId) {
      throw new UnauthorizedException('Invalid tenant')
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    }

    const token = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '30d',
    })

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    // Create audit log
    await this.prisma.auditLog.create({
      data: {
        userId: user.id,
        tenantId: user.tenantId,
        action: 'LOGIN',
        entity: 'USER',
        entityId: user.id,
      },
    })

    const { password, ...userWithoutPassword } = user

    return {
      token,
      refreshToken,
      user: userWithoutPassword as User,
    }
  }

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const hashedPassword = await hash(registerInput.password, 12)

    const user = await this.prisma.user.create({
      data: {
        email: registerInput.email,
        password: hashedPassword,
        firstName: registerInput.firstName,
        lastName: registerInput.lastName,
        role: 'PATIENT',
        phone: registerInput.phone,
        tenantId: registerInput.tenantId,
      },
      include: { tenant: true },
    })

    return this.login({ email: user.email, password: registerInput.password }, user.tenantId)
  }

  async refreshToken(token: string): Promise<{ token: string }> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      })

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      })

      if (!user || !user.isActive) {
        throw new UnauthorizedException()
      }

      const newPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
      }

      return {
        token: this.jwtService.sign(newPayload),
      }
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.auditLog.create({
      data: {
        userId,
        action: 'LOGOUT',
        entity: 'USER',
        entityId: userId,
      },
    })
    return true
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token)
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }
}