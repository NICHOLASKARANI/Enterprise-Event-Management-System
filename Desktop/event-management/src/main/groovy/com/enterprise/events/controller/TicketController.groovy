package com.enterprise.events.controller

import com.enterprise.events.service.TicketService
import com.enterprise.events.service.PaymentService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/tickets")
class TicketController {
    
    @Autowired
    TicketService ticketService
    
    @Autowired
    PaymentService paymentService
    
    @PostMapping("/purchase")
    ResponseEntity<?> purchaseTicket(@RequestParam String eventId,
                                     @RequestParam String userId,
                                     @RequestParam String paymentMethodId) {
        try {
            def paymentIntent = paymentService.createPaymentIntent(
                1000, "usd", eventId, userId
            )
            
            def ticket = ticketService.createTicket(eventId, userId, paymentIntent.id)
            return ResponseEntity.ok([ticket: ticket, clientSecret: paymentIntent.clientSecret])
        } catch (Exception e) {
            return ResponseEntity.badRequest().body([error: e.message])
        }
    }
    
    @GetMapping("/user/{userId}")
    ResponseEntity<?> getUserTickets(@PathVariable String userId) {
        def tickets = ticketService.getUserTickets(userId)
        return ResponseEntity.ok(tickets)
    }
    
    @GetMapping("/{ticketId}/qr")
    ResponseEntity<?> getTicketQRCode(@PathVariable String ticketId) {
        def qrData = ticketService.getTicketQRCode(ticketId)
        return ResponseEntity.ok([qrCode: qrData])
    }
}