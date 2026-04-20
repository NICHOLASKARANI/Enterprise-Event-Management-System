package com.enterprise.events.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "events")
class Event {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id
    
    @Column(nullable = false)
    String name
    
    String description
    
    @Column(nullable = false)
    LocalDateTime startDateTime
    
    LocalDateTime endDateTime
    
    @Column(nullable = false)
    String venue
    
    String venueAddress
    
    Integer totalCapacity
    
    Integer availableTickets
    
    BigDecimal ticketPrice
    
    String currency = "USD"
    
    @Enumerated(EnumType.STRING)
    EventStatus status = EventStatus.DRAFT
    
    String bannerImageUrl
    
    @ElementCollection
    List<String> tags = []
    
    @Column(nullable = false)
    String organizerId
    
    LocalDateTime createdAt = LocalDateTime.now()
    
    LocalDateTime updatedAt = LocalDateTime.now()
    
    @PreUpdate
    void preUpdate() {
        this.updatedAt = LocalDateTime.now()
    }
}

enum EventStatus {
    DRAFT, PUBLISHED, CANCELLED, COMPLETED
}