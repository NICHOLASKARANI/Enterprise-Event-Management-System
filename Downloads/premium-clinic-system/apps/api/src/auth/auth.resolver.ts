import { Resolver, Mutation, Args, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginInput, RegisterInput, AuthResponse, RefreshTokenResponse } from './dto/auth.dto'
import { GqlAuthGuard } from '../common/guards/gql-auth.guard'
import { CurrentUser } from '../common/decorators/current-user.decorator'
import { User } from '@clinic/database'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('input') loginInput: LoginInput,
    @Context() context: any,
  ): Promise<AuthResponse> {
    const tenantId = context.req.tenantId
    return this.authService.login(loginInput, tenantId)
  }

  @Mutation(() => AuthResponse)
  async register(@Args('input') registerInput: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(registerInput)
  }

  @Mutation(() => RefreshTokenResponse)
  async refreshToken(@Args('token') token: string): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(token)
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logout(@CurrentUser() user: User): Promise<boolean> {
    return this.authService.logout(user.id)
  }

  @Mutation(() => Boolean)
  async validateToken(@Args('token') token: string): Promise<any> {
    return this.authService.validateToken(token)
  }
}