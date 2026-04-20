package com.enterprise.events

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableAsync
@EnableScheduling
class EventManagementApplication {
    
    static void main(String[] args) {
        SpringApplication.run(EventManagementApplication, args)
        println """
        ===============================================
        Enterprise Event Management System Started!
        Access: http://localhost:8080/api
        ===============================================
        """
    }
}