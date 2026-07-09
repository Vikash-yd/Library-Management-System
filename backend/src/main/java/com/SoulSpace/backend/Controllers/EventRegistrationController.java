package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.LoungeEventRegistration;
import com.SoulSpace.backend.Services.EventRegistrationServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventRegistrationController {

    private final EventRegistrationServices service;

    public EventRegistrationController(EventRegistrationServices service) {
        this.service = service;
    }

    // ==========================
    // REGISTER FOR EVENT
    // ==========================
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam UUID userId,
            @RequestParam UUID eventId
    ) {
        try {
            LoungeEventRegistration result =
                    service.registerForEvent(userId, eventId);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(e.getMessage())
            );
        }
    }

    // ==========================
    // MY REGISTRATIONS
    // ==========================
    @GetMapping("/registrations/{userId}")
    public ResponseEntity<List<LoungeEventRegistration>> myRegs(
            @PathVariable UUID userId
    ) {
        return ResponseEntity.ok(service.getMyRegistrations(userId));
    }

    // ==========================
    // CANCEL REGISTRATION
    // ==========================
    @PutMapping("/cancel/{registrationId}")
    public ResponseEntity<?> cancel(
            @PathVariable UUID registrationId
    ) {
        try {
            return ResponseEntity.ok(
                    service.cancelRegistration(registrationId)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ErrorResponse(e.getMessage())
            );
        }
    }

    // ==========================
    // ERROR RESPONSE CLASS
    // ==========================
    static class ErrorResponse {
        public String message;

        public ErrorResponse(String message) {
            this.message = message;
        }
    }
}