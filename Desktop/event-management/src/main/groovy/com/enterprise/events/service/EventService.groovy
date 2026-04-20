package com.enterprise.events.service

import com.enterprise.events.domain.Event
import com.enterprise.events.domain.EventStatus
import com.enterprise.events.dto.EventDTO
import com.enterprise.events.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class EventService {
    
    @Autowired
    EventRepository eventRepository
    
    @Autowired
    QRCodeService qrCodeService
    
    @Autowired
    NotificationService notificationService
    
    Event createEvent(EventDTO eventDTO, String organizerId) {
        Event event = new Event(
            name: eventDTO.name,
            description: eventDTO.description,
            startDateTime: eventDTO.startDateTime,
            endDateTime: eventDTO.endDateTime,
            venue: eventDTO.venue,
            venueAddress: eventDTO.venueAddress,
            totalCapacity: eventDTO.totalCapacity,
            availableTickets: eventDTO.totalCapacity,
            ticketPrice: eventDTO.ticketPrice,
            tags: eventDTO.tags,
            organizerId: organizerId
        )
        
        Event savedEvent = eventRepository.save(event)
        notificationService.notifyAdmin("New event created: ${savedEvent.name}")
        
        return savedEvent
    }
    
    Event publishEvent(String eventId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new RuntimeException("Event not found"))
        
        if (event.status == EventStatus.DRAFT) {
            event.status = EventStatus.PUBLISHED
            event = eventRepository.save(event)
            notificationService.notifyAllUsers("New event: ${event.name} is now available!")
        }
        
        return event
    }
    
    List<Event> getUpcomingEvents() {
        return eventRepository.findByStartDateTimeAfterAndStatus(
            LocalDateTime.now(), 
            EventStatus.PUBLISHED
        )
    }
    
    Map<String, Object> getEventAnalytics(String eventId) {
        Event event = eventRepository.findById(eventId).orElse(null)
        
        if (!event) return [:]
        
        return [
            totalTicketsSold: event.totalCapacity - event.availableTickets,
            totalRevenue: (event.totalCapacity - event.availableTickets) * event.ticketPrice,
            checkInRate: calculateCheckInRate(eventId),
            occupancyRate: ((event.totalCapacity - event.availableTickets) as Double / event.totalCapacity) * 100
        ]
    }
    
    private Double calculateCheckInRate(String eventId) {
        // Implementation for check-in rate calculation
        return 75.5 // Placeholder
    }
}