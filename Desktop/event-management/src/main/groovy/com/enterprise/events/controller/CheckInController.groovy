package com.enterprise.events.controller

import com.enterprise.events.dto.CheckInDTO
import com.enterprise.events.service.CheckInService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/checkin")
class CheckInController {
    
    @Autowired
    CheckInService checkInService
    
    @PostMapping
    ResponseEntity<?> checkInAttendee(@RequestBody CheckInDTO checkInDTO) {
        try {
            def checkIn = checkInService.checkInAttendee(
                checkInDTO.ticketId,
                checkInDTO.ticketNumber,
                checkInDTO.deviceId
            )
            return ResponseEntity.ok(checkIn)
        } catch (Exception e) {
            return ResponseEntity.badRequest().body([error: e.message])
        }
    }
    
    @GetMapping("/event/{eventId}")
    ResponseEntity<?> getEventCheckIns(@PathVariable String eventId) {
        def checkIns = checkInService.getEventCheckIns(eventId)
        return ResponseEntity.ok(checkIns)
    }
    
    @GetMapping("/live/{eventId}")
    ResponseEntity<?> getLiveCheckIns(@PathVariable String eventId) {
        def liveStats = checkInService.getLiveCheckInStats(eventId)
        return ResponseEntity.ok(liveStats)
    }
}