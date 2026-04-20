package com.enterprise.events.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id
    
    @Column(unique = true, nullable = false)
    String email
    
    @Column(nullable = false)
    String password
    
    String firstName
    
    String lastName
    
    String phoneNumber
    
    @Enumerated(EnumType.STRING)
    UserRole role = UserRole.ATTENDEE
    
    Boolean isEmailVerified = false
    
    Boolean isPhoneVerified = false
    
    String profileImageUrl
    
    @ElementCollection
    List<String> interests = []
    
    LocalDateTime lastLoginAt
    
    LocalDateTime createdAt = LocalDateTime.now()
    
    LocalDateTime updatedAt = LocalDateTime.now()
}

enum UserRole {
    SUPER_ADMIN, ADMIN, ORGANIZER, ATTENDEE
}