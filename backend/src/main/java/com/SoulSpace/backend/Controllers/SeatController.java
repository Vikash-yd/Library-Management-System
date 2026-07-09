package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.Seat;
import com.SoulSpace.backend.Services.SeatServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "*")
public class SeatController {

    private final SeatServices seatService;

    public SeatController(SeatServices seatService) {
        this.seatService = seatService;
    }

    // Get all seats
    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    // Get seat by ID
    @GetMapping("/{id}")
    public Seat getSeatById(@PathVariable Long id) {
        return seatService.getSeatById(id);
    }

    // Get seats by hall
    @GetMapping("/hall/{hallId}")
    public List<Seat> getSeatsByHall(@PathVariable Long hallId) {
        return seatService.getSeatsByHall(hallId);
    }

    // Create seat
    @PostMapping
    public Seat createSeat(@RequestBody Seat seat) {
        return seatService.createSeat(seat);
    }

    // Update seat
    @PutMapping("/{id}")
    public Seat updateSeat(
            @PathVariable Long id,
            @RequestBody Seat seat
    ) {
        return seatService.updateSeat(id, seat);
    }

    // Delete seat
    @DeleteMapping("/{id}")
    public void deleteSeat(@PathVariable Long id) {
        seatService.deleteSeat(id);
    }
}