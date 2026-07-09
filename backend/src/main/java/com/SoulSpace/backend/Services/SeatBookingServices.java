package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Models.BookingStatus;
import com.SoulSpace.backend.Models.SeatBooking;
import com.SoulSpace.backend.Models.Seat;
import com.SoulSpace.backend.Models.Users;
import com.SoulSpace.backend.Repositories.SeatBookingRepository;
import com.SoulSpace.backend.Repositories.SeatRepository;
import com.SoulSpace.backend.Repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Service
public class SeatBookingServices {

    private final SeatBookingRepository bookingRepo;
    private final SeatRepository seatRepo;
    private final UserRepository userRepo;
    // ==========================================
// LIBRARY TIMINGS & BOOKING RULES
// ==========================================
    private static final LocalTime LIBRARY_OPEN_TIME = LocalTime.of(8, 0);
    private static final LocalTime LIBRARY_CLOSE_TIME = LocalTime.of(22, 0);

    private static final int MIN_BOOKING_DURATION = 30;
    private static final int MAX_BOOKING_DURATION = 480;

    public SeatBookingServices(
            SeatBookingRepository bookingRepo,
            SeatRepository seatRepo,
            UserRepository userRepo
    ) {
        this.bookingRepo = bookingRepo;
        this.seatRepo = seatRepo;
        this.userRepo = userRepo;
    }

    // ==========================================
    // BOOK SEAT
    // ==========================================
    public SeatBooking bookSeat(

            UUID userId,
            Long seatId,
            LocalDate bookingDate,
            LocalTime startTime,
            Integer durationMinutes
    ) {

        expireOldBookings();

        Users user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Seat seat = seatRepo.findById(seatId)
                .orElseThrow(() -> new RuntimeException("Seat not found"));
        validateBookingRequest(
                bookingDate,
                startTime,
                durationMinutes
        );
        validateUserActiveBooking(user);

        LocalTime endTime = startTime.plusMinutes(durationMinutes);


        // check overlapping bookings
        List<SeatBooking> existing = bookingRepo
                .findBySeat_Hall_IdAndBookingDate(
                        seat.getHall().getId(),
                        bookingDate
                );

        for (SeatBooking b : existing) {

            if (b.getStatus() != BookingStatus.ACTIVE) continue;


            if (b.getSeat().getId().equals(seatId)
                    && isOverlapping(
                    startTime,
                    endTime,
                    b.getStartTime(),
                    b.getEndTime()
            )) {

                throw new RuntimeException(
                        "Seat is already booked for the selected time slot."
                );
            }
        }

        SeatBooking booking = SeatBooking.builder()
                .user(user)
                .seat(seat)
                .bookingDate(bookingDate)
                .startTime(startTime)
                .durationMinutes(durationMinutes)
                .endTime(endTime)
                .status(BookingStatus.ACTIVE)
                .checkedIn(false)
                .build();

        return bookingRepo.save(booking);
    }

    // ==========================================
    // CANCEL BOOKING
    // ==========================================
    public SeatBooking cancelBooking(String bookingId) {

        SeatBooking booking = bookingRepo.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (booking.getStatus() != BookingStatus.ACTIVE) {
            throw new RuntimeException(
                    "Only active bookings can be cancelled."
            );
        }

        booking.setStatus(BookingStatus.CANCELLED);

        return bookingRepo.save(booking);
    }

    // ==========================================
    // CURRENT BOOKING
    // ==========================================
    public SeatBooking getCurrentBooking(UUID userId) {
        expireOldBookings();

        return bookingRepo.findByUser_IdAndStatus(
                        userId,
                        BookingStatus.ACTIVE
                )
                .stream()
                .findFirst()
                .orElse(null);
    }

    // ==========================================
    // BOOKING HISTORY
    // ==========================================
    public List<SeatBooking> getBookingHistory(UUID userId) {
        expireOldBookings();
        return bookingRepo.findByUser_Id(userId);
    }

    // ==========================================
    // HALL BOOKINGS (TIME SLOT BASED)
    // ==========================================
    public List<SeatBooking> getHallBookings(
            Long hallId,
            LocalDate bookingDate,
            LocalTime startTime,
            Integer durationMinutes
    ) {
        expireOldBookings();

        LocalTime endTime = startTime.plusMinutes(durationMinutes);

        List<SeatBooking> bookings =
                bookingRepo.findBySeat_Hall_IdAndBookingDate(
                        hallId,
                        bookingDate
                );

        return bookings.stream()
                .filter(b -> b.getStatus() == BookingStatus.ACTIVE)
                .filter(b -> isOverlapping(
                        startTime,
                        endTime,
                        b.getStartTime(),
                        b.getEndTime()
                ))
                .toList();
    }

    // ==========================================
    // OVERLAP CHECK
    // ==========================================
    private void expireOldBookings() {

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        // Expire all active bookings before today
        List<SeatBooking> pastBookings = bookingRepo
                .findByStatusAndBookingDateLessThan(
                        BookingStatus.ACTIVE,
                        today
                );

        if (!pastBookings.isEmpty()) {

            pastBookings.forEach(booking ->
                    booking.setStatus(BookingStatus.EXPIRED)
            );

            bookingRepo.saveAll(pastBookings);
        }

        // Expire today's bookings whose end time has passed
        List<SeatBooking> todayBookings = bookingRepo
                .findByStatusAndBookingDate(
                        BookingStatus.ACTIVE,
                        today
                );

        List<SeatBooking> expiredToday = todayBookings.stream()
                .filter(booking -> !booking.getEndTime().isAfter(now))
                .peek(booking -> booking.setStatus(BookingStatus.EXPIRED))
                .toList();

        if (!expiredToday.isEmpty()) {
            bookingRepo.saveAll(expiredToday);
        }
    }
    private void validateBookingRequest(
            LocalDate bookingDate,
            LocalTime startTime,
            Integer durationMinutes
    ) {

        // ==========================================
        // NULL VALIDATIONS
        // ==========================================
        if (bookingDate == null) {
            throw new RuntimeException("Booking date is required.");
        }

        if (startTime == null) {
            throw new RuntimeException("Start time is required.");
        }

        if (durationMinutes == null) {
            throw new RuntimeException("Booking duration is required.");
        }

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        // ==========================================
        // BOOKING DATE VALIDATION
        // ==========================================
        if (bookingDate.isBefore(today)) {
            throw new RuntimeException("Booking date cannot be in the past.");
        }

        // ==========================================
        // BOOKING TIME VALIDATION
        // ==========================================
        if (bookingDate.equals(today) && !startTime.isAfter(now)) {
            throw new RuntimeException("Selected start time has already passed.");
        }

        // ==========================================
        // DURATION VALIDATION
        // ==========================================
        if (durationMinutes < MIN_BOOKING_DURATION ||
                durationMinutes > MAX_BOOKING_DURATION) {

            throw new RuntimeException(
                    "Booking duration must be between "
                            + MIN_BOOKING_DURATION
                            + " and "
                            + MAX_BOOKING_DURATION
                            + " minutes."
            );
        }

        LocalTime endTime = startTime.plusMinutes(durationMinutes);

        // ==========================================
        // LIBRARY TIMING VALIDATION
        // ==========================================
        if (startTime.isBefore(LIBRARY_OPEN_TIME)) {
            throw new RuntimeException(
                    "Library opens at " + LIBRARY_OPEN_TIME + "."
            );
        }

        if (!startTime.isBefore(LIBRARY_CLOSE_TIME)) {
            throw new RuntimeException(
                    "Library is already closed at the selected start time."
            );
        }

        if (endTime.isAfter(LIBRARY_CLOSE_TIME)) {
            throw new RuntimeException(
                    "Booking exceeds library closing time."
            );
        }
    }
    private boolean isOverlapping(
            LocalTime reqStart,
            LocalTime reqEnd,
            LocalTime existingStart,
            LocalTime existingEnd
    ) {
        return reqStart.isBefore(existingEnd)
                && reqEnd.isAfter(existingStart);
    }
    private void validateUserActiveBooking(Users user) {

        bookingRepo.findByUserAndStatus(user, BookingStatus.ACTIVE)
                .ifPresent(existingBooking -> {
                    throw new RuntimeException(
                            "You already have an active seat booking."
                    );
                });
    }

    // ==========================================
    // GET BY BOOKING ID
    // ==========================================
    public SeatBooking getBookingByBookingId(String bookingId) {
        expireOldBookings();

        return bookingRepo.findByBookingId(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
    // ==========================================
    // ALL BOOKINGS
    // ==========================================
    public List<SeatBooking> getAllBookings() {
        expireOldBookings();
        return bookingRepo.findAll();
    }
}