package com.enterprise.events.service

import com.google.zxing.BarcodeFormat
import com.google.zxing.client.j2se.MatrixToImageWriter
import com.google.zxing.qrcode.QRCodeWriter
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.nio.file.Path
import java.nio.file.Paths
import java.time.LocalDateTime

@Service
class QRCodeService {
    
    @Value('${app.qr.base-url}')
    private String baseUrl
    
    String generateQRCode(String ticketId, String ticketNumber, String eventId) {
        try {
            String qrData = "${baseUrl}/checkin/${ticketId}/${ticketNumber}"
            
            QRCodeWriter qrCodeWriter = new QRCodeWriter()
            def bitMatrix = qrCodeWriter.encode(qrData, BarcodeFormat.QR_CODE, 300, 300)
            
            Path path = Paths.get("src/main/resources/static/qr/${ticketId}_${LocalDateTime.now().format('yyyyMMddHHmmss')}.png")
            MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path)
            
            return path.toString()
        } catch (Exception e) {
            throw new RuntimeException("QR Code generation failed", e)
        }
    }
    
    boolean validateQRCode(String qrData, String ticketId, String ticketNumber) {
        String expectedData = "${baseUrl}/checkin/${ticketId}/${ticketNumber}"
        return qrData == expectedData
    }
}