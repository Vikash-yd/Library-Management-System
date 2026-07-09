package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Models.LoungeEvent;
import com.SoulSpace.backend.Models.LoungeEventRegistration;
import com.SoulSpace.backend.Models.RegistrationStatus;
import com.SoulSpace.backend.Models.Users;
import com.SoulSpace.backend.Repositories.EventRegistrationRepository;
import com.SoulSpace.backend.Repos.LoungeEventRepository;
import com.SoulSpace.backend.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class EventRegistrationServices {

    private final EventRegistrationRepository registrationRepo;
    private final LoungeEventRepository eventRepo;
    private final UserRepository userRepo;

    public EventRegistrationServices(
            EventRegistrationRepository registrationRepo,
            LoungeEventRepository eventRepo,
            UserRepository userRepo
    ) {
        this.registrationRepo = registrationRepo;
        this.eventRepo = eventRepo;
        this.userRepo = userRepo;
    }

    // ==========================================
    // REGISTER FOR EVENT
    // ==========================================
    public LoungeEventRegistration registerForEvent(
            UUID userId,
            UUID eventId
    ) {

        Users user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        LoungeEvent event = eventRepo.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found."));

        validateDuplicateRegistration(user, event);

        if (event.getEventDate()
                .atTime(event.getEventTime())
                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Registration has closed. Event has already started."
            );
        }

        if (event.getSeatsLeft() == null || event.getSeatsLeft() <= 0) {
            throw new RuntimeException(
                    "No seats available for this event."
            );
        }

        event.setSeatsLeft(event.getSeatsLeft() - 1);

        if (event.getRegistrations() == null) {
            event.setRegistrations(1);
        } else {
            event.setRegistrations(event.getRegistrations() + 1);
        }

        eventRepo.save(event);

        LoungeEventRegistration registration = LoungeEventRegistration.builder()
                .registrationId("ER-" + System.currentTimeMillis())
                .user(user)
                .event(event)
                .registeredAt(LocalDateTime.now())
                .status(RegistrationStatus.REGISTERED)
                .build();

        return registrationRepo.save(registration);
    }

    // ==========================================
    // CANCEL REGISTRATION
    // ==========================================
    public LoungeEventRegistration cancelRegistration(UUID registrationId) {

        LoungeEventRegistration registration = registrationRepo.findById(registrationId)
                .orElseThrow(() ->
                        new RuntimeException("Registration not found."));

        if (registration.getStatus() == RegistrationStatus.CANCELLED) {
            throw new RuntimeException(
                    "Registration is already cancelled."
            );
        }

        LoungeEvent event = registration.getEvent();

        if (event.getEventDate()
                .atTime(event.getEventTime())
                .isBefore(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Cannot cancel after the event has started."
            );
        }

        registration.setStatus(RegistrationStatus.CANCELLED);

        event.setSeatsLeft(event.getSeatsLeft() + 1);

        if (event.getRegistrations() != null && event.getRegistrations() > 0) {
            event.setRegistrations(event.getRegistrations() - 1);
        }

        eventRepo.save(event);

        return registrationRepo.save(registration);
    }

    // ==========================================
    // CURRENT EVENTS
    // ==========================================
    public List<LoungeEventRegistration> getCurrentRegistrations(UUID userId) {

        Users user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        return registrationRepo
                .findByUserAndEvent_EventDateGreaterThanEqualOrderByEvent_EventDateAsc(
                        user,
                        LocalDate.now()
                );
    }

    // ==========================================
    // EVENT HISTORY
    // ==========================================
    public List<LoungeEventRegistration> getRegistrationHistory(UUID userId) {

        Users user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        return registrationRepo
                .findByUserAndEvent_EventDateLessThanOrderByEvent_EventDateDesc(
                        user,
                        LocalDate.now()
                );
    }

    // ==========================================
    // MY REGISTRATIONS
    // ==========================================
    public List<LoungeEventRegistration> getMyRegistrations(UUID userId) {

        Users user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        return registrationRepo.findByUserOrderByRegisteredAtDesc(user);
    }

    // ==========================================
    // GET REGISTRATION
    // ==========================================
    public LoungeEventRegistration getRegistration(UUID registrationId) {

        return registrationRepo.findById(registrationId)
                .orElseThrow(() ->
                        new RuntimeException("Registration not found."));
    }

    // ==========================================
    // ALL REGISTRATIONS
    // ==========================================
    public List<LoungeEventRegistration> getAllRegistrations() {
        return registrationRepo.findAll();
    }

    // ==========================================
    // VALIDATE DUPLICATE REGISTRATION
    // ==========================================
    private void validateDuplicateRegistration(
            Users user,
            LoungeEvent event
    ) {

        registrationRepo.findByUserAndEventAndStatus(
                user,
                event,
                RegistrationStatus.REGISTERED
        ).ifPresent(registration -> {
            throw new RuntimeException(
                    "You are already registered for this event."
            );
        });
    }
}