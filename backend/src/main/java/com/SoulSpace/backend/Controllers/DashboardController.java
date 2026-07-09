package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.BookReservation;
import com.SoulSpace.backend.Models.LoungeEventRegistration;
import com.SoulSpace.backend.Models.SeatBooking;
import com.SoulSpace.backend.Services.DashboardServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardServices dashboardService;

    public DashboardController(DashboardServices dashboardService) {
        this.dashboardService = dashboardService;
    }

    // ================= BOOKS =================

    @GetMapping("/{userId}/books")
    public BookReservation getCurrentBook(
            @PathVariable UUID userId
    ) {
        return dashboardService.getCurrentBook(userId);
    }

    @GetMapping("/{userId}/books/history")
    public List<BookReservation> getBookHistory(
            @PathVariable UUID userId
    ) {
        return dashboardService.getBookHistory(userId);
    }

    // ================= SEATS =================

    @GetMapping("/{userId}/seats")
    public SeatBooking getCurrentSeat(
            @PathVariable UUID userId
    ) {
        return dashboardService.getCurrentSeat(userId);
    }

    @GetMapping("/{userId}/seats/history")
    public List<SeatBooking> getSeatHistory(
            @PathVariable UUID userId
    ) {
        return dashboardService.getSeatHistory(userId);
    }

    // ================= EVENTS =================

    @GetMapping("/{userId}/events")
    public List<LoungeEventRegistration> getCurrentEvents(
            @PathVariable UUID userId
    ) {
        return dashboardService.getCurrentEvents(userId);
    }

    @GetMapping("/{userId}/events/history")
    public List<LoungeEventRegistration> getEventHistory(
            @PathVariable UUID userId
    ) {
        return dashboardService.getEventHistory(userId);
    }

}