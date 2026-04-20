package com.enterprise.events.service

import com.stripe.Stripe
import com.stripe.model.PaymentIntent
import com.stripe.param.PaymentIntentCreateParams
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import javax.annotation.PostConstruct

@Slf4j
@Service
class PaymentService {
    
    @Value('${app.stripe.api-key}')
    private String stripeApiKey
    
    @PostConstruct
    void init() {
        Stripe.apiKey = stripeApiKey
    }
    
    PaymentIntent createPaymentIntent(BigDecimal amount, String currency, String eventId, String userId) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amount.multiply(100).longValue()) // Convert to cents
                .setCurrency(currency)
                .putMetadata("eventId", eventId)
                .putMetadata("userId", userId)
                .build()
            
            return PaymentIntent.create(params)
        } catch (Exception e) {
            log.error("Payment intent creation failed", e)
            throw new RuntimeException("Payment processing failed: ${e.message}")
        }
    }
    
    PaymentIntent confirmPayment(String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId)
            return paymentIntent.confirm()
        } catch (Exception e) {
            throw new RuntimeException("Payment confirmation failed", e)
        }
    }
    
    PaymentIntent refundPayment(String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId)
            return paymentIntent.refund()
        } catch (Exception e) {
            throw new RuntimeException("Refund failed", e)
        }
    }
}