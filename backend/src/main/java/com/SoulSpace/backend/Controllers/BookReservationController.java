package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.BookReservation;
import com.SoulSpace.backend.Services.BookReservationServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/book-reservations")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BookReservationController {

    private final BookReservationServices reservationServices;

    public BookReservationController(
            BookReservationServices reservationServices
    ) {
        this.reservationServices = reservationServices;
    }

    // ==========================================
    // RESERVE BOOK
    // ==========================================
    @PostMapping("/reserve")
    public BookReservation reserveBook(
            @RequestParam UUID userId,
            @RequestParam UUID bookId
    ) {

        return reservationServices.reserveBook(
                userId,
                bookId
        );
    }

    // ==========================================
    // RETURN BOOK
    // ==========================================
    @PutMapping("/return/{reservationId}")
    public BookReservation returnBook(
            @PathVariable String reservationId
    ) {

        return reservationServices.returnBook(
                reservationId
        );
    }

    // ==========================================
    // CURRENT RESERVATION
    // ==========================================
   @GetMapping("/current/{userId}")
public List<BookReservation> getCurrentReservations(
        @PathVariable UUID userId
) {
    return reservationServices.getCurrentReservation(userId);
}

    // ==========================================
    // RESERVATION HISTORY
    // ==========================================
    @GetMapping("/history/{userId}")
    public List<BookReservation> getReservationHistory(
            @PathVariable UUID userId
    ) {

        return reservationServices.getReservationHistory(
                userId
        );
    }

    // ==========================================
    // GET RESERVATION BY ID
    // ==========================================
    @GetMapping("/{reservationId}")
    public BookReservation getReservationByReservationId(
            @PathVariable String reservationId
    ) {

        return reservationServices.getReservationByReservationId(
                reservationId
        );
    }

    // ==========================================
    // GET ALL RESERVATIONS
    // ==========================================
    @GetMapping
    public List<BookReservation> getAllReservations() {

        return reservationServices.getAllReservations();
    }

}