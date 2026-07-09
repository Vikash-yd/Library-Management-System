package com.SoulSpace.backend.Repositories;

import com.SoulSpace.backend.Models.BookReservation;
import com.SoulSpace.backend.Models.BookingStatus;
import com.SoulSpace.backend.Models.Books;
import com.SoulSpace.backend.Models.SeatBooking;
import com.SoulSpace.backend.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookReservationRepository extends JpaRepository<BookReservation, UUID> {

    // ==========================================
    // FIND BY RESERVATION ID
    // ==========================================
    Optional<BookReservation> findByReservationId(String reservationId);

    // ==========================================
    // USER RESERVATIONS
    // ==========================================
    List<BookReservation> findByUser(Users user);

    List<BookReservation> findByUser_Id(UUID userId);

    Optional<BookReservation> findByUserAndStatus(
            Users user,
            BookingStatus status
    );

    List<BookReservation> findByUser_IdAndStatus(
            UUID userId,
            BookingStatus status
    );

    // ==========================================
    // BOOK RESERVATIONS
    // ==========================================
    List<BookReservation> findByBook(Books book);

    List<BookReservation> findByBook_Id(UUID bookId);

    Optional<BookReservation> findByBookAndStatus(
            Books book,
            BookingStatus status
    );

    // ==========================================
    // SEAT BOOKING RELATION
    // ==========================================
    List<BookReservation> findBySeatBooking(SeatBooking seatBooking);

    Optional<BookReservation> findBySeatBookingAndStatus(
            SeatBooking seatBooking,
            BookingStatus status
    );

    // ==========================================
    // STATUS
    // ==========================================
    List<BookReservation> findByStatus(BookingStatus status);
    Optional<BookReservation> findByUserAndBookAndStatus(
            Users user,
            Books book,
            BookingStatus status
    );
}