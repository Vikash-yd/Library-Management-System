package com.SoulSpace.backend.Repositories;

import com.SoulSpace.backend.Models.LoungeEvent;
import com.SoulSpace.backend.Models.LoungeEventRegistration;
import com.SoulSpace.backend.Models.RegistrationStatus;
import com.SoulSpace.backend.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventRegistrationRepository extends JpaRepository<LoungeEventRegistration, UUID> {

    Optional<LoungeEventRegistration> findByUserAndEvent(
            Users user,
            LoungeEvent event
    );

    Optional<LoungeEventRegistration> findByUserAndEventAndStatus(
            Users user,
            LoungeEvent event,
            RegistrationStatus status
    );

    List<LoungeEventRegistration> findByUserOrderByRegisteredAtDesc(
            Users user
    );

    List<LoungeEventRegistration> findByEvent(
            LoungeEvent event
    );

    long countByEventAndStatus(
            LoungeEvent event,
            RegistrationStatus status
    );

    boolean existsByUserAndEvent(
            Users user,
            LoungeEvent event
    );
    List<LoungeEventRegistration>
    findByUserAndEvent_EventDateGreaterThanEqualOrderByEvent_EventDateAsc(
            Users user,
            LocalDate date
    );

    List<LoungeEventRegistration>
    findByUserAndEvent_EventDateLessThanOrderByEvent_EventDateDesc(
            Users user,
            LocalDate date
    );
}