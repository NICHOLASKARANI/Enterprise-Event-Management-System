package com.enterprise.events.websocket

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import java.time.LocalDateTime

@Controller
class AttendeeTracker {
    
    @MessageMapping("/checkin")
    @SendTo("/topic/live-updates")
    CheckInUpdate handleCheckIn(CheckInMessage message) {
        return new CheckInUpdate(
            eventId: message.eventId,
            attendeeName: message.attendeeName,
            checkInTime: LocalDateTime.now(),
            totalCheckedIn: message.totalCheckedIn,
            remainingCapacity: message.remainingCapacity
        )
    }
    
    @MessageMapping("/analytics")
    @SendTo("/topic/analytics")
    AnalyticsUpdate sendAnalytics(AnalyticsRequest request) {
        return new AnalyticsUpdate(
            eventId: request.eventId,
            checkInRate: request.checkInRate,
            occupancyRate: request.occupancyRate,
            timestamp: LocalDateTime.now()
        )
    }
}

class CheckInMessage {
    String eventId
    String attendeeName
    Integer totalCheckedIn
    Integer remainingCapacity
}

class CheckInUpdate {
    String eventId
    String attendeeName
    LocalDateTime checkInTime
    Integer totalCheckedIn
    Integer remainingCapacity
}

class AnalyticsRequest {
    String eventId
    Double checkInRate
    Double occupancyRate
}

class AnalyticsUpdate {
    String eventId
    Double checkInRate
    Double occupancyRate
    LocalDateTime timestamp
}