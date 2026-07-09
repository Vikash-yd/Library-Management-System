package com.SoulSpace.backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;
@JsonIgnoreProperties({
        "hibernateLazyInitializer",
        "handler"
})

@Entity
@Table(name = "seat_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // Public Booking ID
    @Column(nullable = false, unique = true)
    private String bookingId;

    // User who booked the seat
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    // Booked Seat
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;

    // Booking Date
    @Column(nullable = false)
    private LocalDate bookingDate;

    // Booking Start Time
    @Column(nullable = false)
    private LocalTime startTime;

    // Duration selected by user (minutes)
    @Column(nullable = false)
    private Integer durationMinutes;

    // Automatically calculated End Time
    @Column(nullable = false)
    private LocalTime endTime;

    // ACTIVE / COMPLETED / CANCELLED / EXPIRED
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    // User entered library
    private Boolean checkedIn = false;

    // Actual check-in time
    private LocalDateTime checkInTime;

    // Actual check-out time
    private LocalDateTime checkOutTime;

    // Optional cancellation reason
    @Column(length = 500)
    private String cancellationReason;

    // Audit
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (bookingId == null || bookingId.isBlank()) {
            bookingId = "SB-" + System.currentTimeMillis();
        }

        if (status == null) {
            status = BookingStatus.ACTIVE;
        }

        if (checkedIn == null) {
            checkedIn = false;
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}