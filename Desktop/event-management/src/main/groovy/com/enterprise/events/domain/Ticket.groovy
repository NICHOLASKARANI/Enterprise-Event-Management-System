package com.enterprise.events.domain

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "tickets")
class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id
    
    @ManyToOne
    @JoinColumn(name = "event_id")
    Event event
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user
    
    @Column(unique = true, nullable = false)
    String ticketNumber
    
    @Enumerated(EnumType.STRING)
    TicketType type = TicketType.REGULAR
    
    @Enumerated(EnumType.STRING)
    TicketStatus status = TicketStatus.PENDING
    
    String qrCodeData
    
    String qrCodeImageUrl
    
    BigDecimal price
    
    LocalDateTime purchaseDate
    
    LocalDateTime checkInTime
    
    String paymentIntentId
    
    @ElementCollection
    Map<String, String> metadata = [:]
    
    LocalDateTime createdAt = LocalDateTime.now()
}

enum TicketType {
    REGULAR, VIP, EARLY_BIRD, STUDENT
}

enum TicketStatus {
    PENDING, CONFIRMED, CANCELLED, REFUNDED, CHECKED_IN
}