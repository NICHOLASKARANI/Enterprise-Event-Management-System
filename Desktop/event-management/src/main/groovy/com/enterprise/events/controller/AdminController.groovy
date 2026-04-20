package com.enterprise.events.controller

import com.enterprise.events.service.AnalyticsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/admin")
class AdminController {
    
    @Autowired
    AnalyticsService analyticsService
    
    @GetMapping("/dashboard")
    ResponseEntity<?> getDashboardAnalytics() {
        def analytics = analyticsService.getDashboardAnalytics()
        return ResponseEntity.ok(analytics)
    }
    
    @GetMapping("/reports/events")
    ResponseEntity<?> exportEventsReport(@RequestParam String startDate,
                                         @RequestParam String endDate) {
        def report = analyticsService.generateEventsReport(startDate, endDate)
        return ResponseEntity.ok(report)
    }
    
    @GetMapping("/revenue")
    ResponseEntity<?> getRevenueAnalytics() {
        def revenue = analyticsService.getRevenueAnalytics()
        return ResponseEntity.ok(revenue)
    }
    
    @GetMapping("/attendees/trends")
    ResponseEntity<?> getAttendeeTrends() {
        def trends = analyticsService.getAttendeeTrends()
        return ResponseEntity.ok(trends)
    }
}