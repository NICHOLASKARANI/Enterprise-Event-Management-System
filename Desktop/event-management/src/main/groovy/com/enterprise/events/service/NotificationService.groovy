package com.enterprise.events.service

import com.twilio.Twilio
import com.twilio.rest.api.v2010.account.Message
import com.twilio.type.PhoneNumber
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct

@Slf4j
@Service
class NotificationService {
    
    @Autowired
    private JavaMailSender mailSender
    
    @Value('${app.twilio.account-sid}')
    private String twilioAccountSid
    
    @Value('${app.twilio.auth-token}')
    private String twilioAuthToken
    
    @Value('${app.twilio.phone-number}')
    private String twilioPhoneNumber
    
    @PostConstruct
    void initTwilio() {
        Twilio.init(twilioAccountSid, twilioAuthToken)
    }
    
    @Async
    void sendEmail(String to, String subject, String content) {
        try {
            SimpleMailMessage message = new SimpleMailMessage()
            message.setTo(to)
            message.setSubject(subject)
            message.setText(content)
            mailSender.send(message)
            log.info("Email sent to: {}", to)
        } catch (Exception e) {
            log.error("Email sending failed: {}", e.message)
        }
    }
    
    @Async
    void sendSMS(String to, String message) {
        try {
            Message.creator(
                new PhoneNumber(to),
                new PhoneNumber(twilioPhoneNumber),
                message
            ).create()
            log.info("SMS sent to: {}", to)
        } catch (Exception e) {
            log.error("SMS sending failed: {}", e.message)
        }
    }
    
    @Async
    void sendTicketConfirmation(String email, String phone, String ticketNumber, String eventName) {
        String subject = "Ticket Confirmation: ${eventName}"
        String content = """
            Your ticket has been confirmed!
            Ticket Number: ${ticketNumber}
            Event: ${eventName}
            Please present this QR code at the venue.
        """
        
        sendEmail(email, subject, content)
        sendSMS(phone, "Ticket confirmed: ${ticketNumber} for ${eventName}")
    }
    
    void notifyAdmin(String message) {
        // Admin notification implementation (email, Slack, etc.)
        sendEmail("admin@enterprise.com", "System Notification", message)
    }
    
    void notifyAllUsers(String message) {
        // Broadcast to all users (could be via WebSocket)
        log.info("Broadcasting to all users: {}", message)
    }
}