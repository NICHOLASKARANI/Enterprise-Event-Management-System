package com.enterprise.events.controller

import com.enterprise.events.dto.EventDTO
import com.enterprise.events.service.EventService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/events")
class EventController {
    
    @Autowired
    EventService eventService
    
    @PostMapping
    ResponseEntity<?> createEvent(@RequestBody EventDTO eventDTO, 
                                   @RequestHeader("userId") String userId) {
        try {
            def event = eventService.createEvent(eventDTO, userId)
            return ResponseEntity.status(HttpStatus.CREATED).body(event)
        } catch (Exception e) {
            return ResponseEntity.badRequest().body([error: e.message])
        }
    }
    
    @PutMapping("/{eventId}/publish")
    ResponseEntity<?> publishEvent(@PathVariable String eventId) {
        try {
            def event = eventService.publishEvent(eventId)
            return ResponseEntity.ok(event)
        } catch (Exception e) {
            return ResponseEntity.badRequest().body([error: e.message])
        }
    }
    
    @GetMapping("/upcoming")
    ResponseEntity<?> getUpcomingEvents() {
        def events = eventService.getUpcomingEvents()
        return ResponseEntity.ok(events)
    }
    
    @GetMapping("/{eventId}/analytics")
    ResponseEntity<?> getEventAnalytics(@PathVariable String eventId) {
        def analytics = eventService.getEventAnalytics(eventId)
        return ResponseEntity.ok(analytics)
    }
}