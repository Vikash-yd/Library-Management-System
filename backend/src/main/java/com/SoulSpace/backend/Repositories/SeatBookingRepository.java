package com.SoulSpace.backend.Repositories;

import com.SoulSpace.backend.Models.BookingStatus;
import com.SoulSpace.backend.Models.Seat;
import com.SoulSpace.backend.Models.SeatBooking;
import com.SoulSpace.backend.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SeatBookingRepository extends JpaRepository<SeatBooking, UUID> {

    // Find booking by bookingId
    Optional<SeatBooking> findByBookingId(String bookingId);

    // Current booking of a user
    List<SeatBooking> findByUser_IdAndStatus(
            UUID userId,
            BookingStatus status
    );

    // Booking history
    List<SeatBooking> findByUser_Id(UUID userId);

    // Hall bookings on a particular date
    List<SeatBooking> findBySeat_Hall_IdAndBookingDate(
            Long hallId,
            LocalDate bookingDate
    );

    // Extra helper methods
    Optional<SeatBooking> findByUserAndStatus(
            Users user,
            BookingStatus status
    );

    Optional<SeatBooking> findBySeatAndStatus(
            Seat seat,
            BookingStatus status
    );

    List<SeatBooking> findByUser(Users user);

    List<SeatBooking> findByStatus(BookingStatus status);

    List<SeatBooking> findBySeat(Seat seat);
    List<SeatBooking> findByStatusAndBookingDateLessThan(
            BookingStatus status,
            LocalDate bookingDate
    );

    List<SeatBooking> findByStatusAndBookingDate(
            BookingStatus status,
            LocalDate bookingDate
    );
}