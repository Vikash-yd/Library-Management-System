package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Models.*;
import com.SoulSpace.backend.Repos.BooksRepository;
import com.SoulSpace.backend.Repositories.BookReservationRepository;
import com.SoulSpace.backend.Repositories.SeatBookingRepository;
import com.SoulSpace.backend.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class BookReservationServices {

    private final BookReservationRepository reservationRepo;
    private final BooksRepository booksRepo;
    private final UserRepository userRepo;
    private final SeatBookingRepository seatBookingRepo;

    public BookReservationServices(
            BookReservationRepository reservationRepo,
            BooksRepository booksRepo,
            UserRepository userRepo,
            SeatBookingRepository seatBookingRepo
    ) {
        this.reservationRepo = reservationRepo;
        this.booksRepo = booksRepo;
        this.userRepo = userRepo;
        this.seatBookingRepo = seatBookingRepo;
    }

    // ==========================================
    // RESERVE BOOK
    // ==========================================
    public BookReservation reserveBook(
            UUID userId,
            UUID bookId
    ) {

        // Expire old reservations if any
        expireOldReservations();

        Users user = userRepo.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found."));

        Books book = booksRepo.findById(bookId)
                .orElseThrow(() ->
                        new RuntimeException("Book not found."));

        // User must have an ACTIVE seat booking
        SeatBooking seatBooking = seatBookingRepo
                .findByUserAndStatus(user, BookingStatus.ACTIVE)
                .orElseThrow(() ->
                        new RuntimeException(
                                "You must have an active seat booking to reserve a book."
                        ));

        // Seat booking should not already be over
        if (seatBooking.getEndTime().isBefore(LocalDateTime.now().toLocalTime())
                && seatBooking.getBookingDate().equals(LocalDateTime.now().toLocalDate())) {

            seatBooking.setStatus(BookingStatus.EXPIRED);
            seatBookingRepo.save(seatBooking);

            throw new RuntimeException(
                    "Your seat booking has expired."
            );
        }

        validateBookAvailability(book);
        validateDuplicateReservation(user, book);



        book.setAvailableCopies(
                book.getAvailableCopies() - 1
        );

        booksRepo.save(book);

        BookReservation reservation = BookReservation.builder()
                .reservationId("BR-" + System.currentTimeMillis())
                .user(user)
                .book(book)
                .seatBooking(seatBooking)
                .reservedAt(LocalDateTime.now())
                .expiresAt(
                        LocalDateTime.of(
                                seatBooking.getBookingDate(),
                                seatBooking.getEndTime()
                        )
                )
                .borrowedAt(LocalDateTime.now())
                .dueDate(
                        LocalDateTime.of(
                                seatBooking.getBookingDate(),
                                seatBooking.getEndTime()
                        )
                )
                .status(BookingStatus.ACTIVE)
                .build();

        return reservationRepo.save(reservation);
    }
    // ==========================================
    // RETURN BOOK
    // ==========================================
    public BookReservation returnBook(String reservationId) {

        expireOldReservations();

        BookReservation reservation = reservationRepo
                .findByReservationId(reservationId)
                .orElseThrow(() ->
                        new RuntimeException("Reservation not found."));

        if (reservation.getStatus() != BookingStatus.ACTIVE) {
            throw new RuntimeException(
                    "Only active reservations can be returned."
            );
        }

        Books book = reservation.getBook();

        book.setAvailableCopies(
                book.getAvailableCopies() + 1
        );

        booksRepo.save(book);

        reservation.setReturnedAt(LocalDateTime.now());
        reservation.setStatus(BookingStatus.COMPLETED);

        return reservationRepo.save(reservation);
    }

    // ==========================================
    // CURRENT BOOK RESERVATION
    // ==========================================
    public BookReservation getCurrentReservation(UUID userId) {

        expireOldReservations();

        return reservationRepo
                .findByUser_IdAndStatus(
                        userId,
                        BookingStatus.ACTIVE
                )
                .stream()
                .findFirst()
                .orElse(null);
    }

    // ==========================================
    // RESERVATION HISTORY
    // ==========================================
    public java.util.List<BookReservation> getReservationHistory(UUID userId) {

        expireOldReservations();

        return reservationRepo.findByUser_Id(userId);
    }

    // ==========================================
    // GET BY RESERVATION ID
    // ==========================================
    public BookReservation getReservationByReservationId(
            String reservationId
    ) {

        expireOldReservations();

        return reservationRepo.findByReservationId(reservationId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Reservation not found."
                        ));
    }

    // ==========================================
    // ALL RESERVATIONS
    // ==========================================
    public java.util.List<BookReservation> getAllReservations() {

        expireOldReservations();

        return reservationRepo.findAll();
    }
    // ==========================================
    // EXPIRE OLD RESERVATIONS
    // ==========================================
    private void expireOldReservations() {

        LocalDateTime now = LocalDateTime.now();

        for (BookReservation reservation : reservationRepo.findByStatus(BookingStatus.ACTIVE)) {

            if (reservation.getExpiresAt().isBefore(now)) {

                reservation.setStatus(BookingStatus.EXPIRED);

                Books book = reservation.getBook();

                book.setAvailableCopies(
                        book.getAvailableCopies() + 1
                );

                booksRepo.save(book);

                reservationRepo.save(reservation);
            }
        }
    }

    // ==========================================
    // VALIDATE BOOK AVAILABILITY
    // ==========================================
    private void validateBookAvailability(Books book) {

        if (book.getAvailableCopies() <= 0) {
            throw new RuntimeException(
                    "This book is currently unavailable."
            );
        }
    }
    private void validateDuplicateReservation(
            Users user,
            Books book
    ) {

        reservationRepo.findByUserAndBookAndStatus(
                user,
                book,
                BookingStatus.ACTIVE
        ).ifPresent(reservation -> {
            throw new RuntimeException(
                    "You have already reserved this book."
            );
        });

    }




}