package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.SeatBooking;
import com.SoulSpace.backend.Services.SeatBookingServices;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/seat-bookings")
@CrossOrigin(origins = "*")
public class SeatBookingController {

    private final SeatBookingServices seatBookingServices;

    public SeatBookingController(SeatBookingServices seatBookingServices) {
        this.seatBookingServices = seatBookingServices;
    }

    // ================= BOOK SEAT =================
    @PostMapping("/book")
    public SeatBooking bookSeat(
            @RequestParam UUID userId,
            @RequestParam Long seatId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate bookingDate,
            @RequestParam
            @DateTimeFormat(pattern = "HH:mm")
            LocalTime startTime,
            @RequestParam Integer durationMinutes
    ) {
        return seatBookingServices.bookSeat(
                userId,
                seatId,
                bookingDate,
                startTime,
                durationMinutes
        );
    }

    // ================= CANCEL =================
    @PutMapping("/cancel/{bookingId}")
    public SeatBooking cancelBooking(@PathVariable String bookingId) {
        return seatBookingServices.cancelBooking(bookingId);
    }

    // ================= CURRENT =================
    @GetMapping("/current/{userId}")
    public SeatBooking getCurrentBooking(@PathVariable UUID userId) {
        return seatBookingServices.getCurrentBooking(userId);
    }

    // ================= HISTORY =================
    @GetMapping("/history/{userId}")
    public List<SeatBooking> getBookingHistory(@PathVariable UUID userId) {
        return seatBookingServices.getBookingHistory(userId);
    }

    // ================= HALL BOOKINGS =================
    @GetMapping("/hall/{hallId}")
    public List<SeatBooking> getHallBookings(
            @PathVariable Long hallId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate bookingDate,
            @RequestParam
            @DateTimeFormat(pattern = "HH:mm")
            LocalTime startTime,
            @RequestParam Integer durationMinutes
    ) {
        return seatBookingServices.getHallBookings(
                hallId,
                bookingDate,
                startTime,
                durationMinutes
        );
    }

    // ================= SINGLE BOOKING =================
    @GetMapping("/{bookingId}")
    public SeatBooking getBookingByBookingId(@PathVariable String bookingId) {
        return seatBookingServices.getBookingByBookingId(bookingId);
    }

    // ================= ALL BOOKINGS =================
    @GetMapping
    public List<SeatBooking> getAllBookings() {
        try {
            return seatBookingServices.getAllBookings();
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}