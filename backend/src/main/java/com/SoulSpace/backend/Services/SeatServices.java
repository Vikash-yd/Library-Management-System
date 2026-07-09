package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Models.Hall;
import com.SoulSpace.backend.Models.Seat;
import com.SoulSpace.backend.Repositories.HallRepository;
import com.SoulSpace.backend.Repositories.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServices {

    private final SeatRepository seatRepository;
    private final HallRepository hallRepository;

    public SeatServices(SeatRepository seatRepository,
                        HallRepository hallRepository) {
        this.seatRepository = seatRepository;
        this.hallRepository = hallRepository;
    }

    // Get all seats
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    // Get seats by hall
    public List<Seat> getSeatsByHall(Long hallId) {

        Hall hall = hallRepository.findById(hallId)
                .orElseThrow(() ->
                        new RuntimeException("Hall not found"));

        return seatRepository.findByHallAndActiveTrue(hall);
    }

    // Get seat by ID
    public Seat getSeatById(Long id) {
        return seatRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Seat not found with id: " + id));
    }

    // Create seat
    public Seat createSeat(Seat seat) {
        return seatRepository.save(seat);
    }

    // Update seat
    public Seat updateSeat(Long id, Seat updatedSeat) {

        Seat seat = getSeatById(id);

        seat.setSeatNumber(updatedSeat.getSeatNumber());
        seat.setHall(updatedSeat.getHall());
        seat.setFloor(updatedSeat.getFloor());
        seat.setZone(updatedSeat.getZone());
        seat.setLocation(updatedSeat.getLocation());
        seat.setHasChargingPort(updatedSeat.getHasChargingPort());
        seat.setNearWindow(updatedSeat.getNearWindow());
        seat.setActive(updatedSeat.getActive());

        return seatRepository.save(seat);
    }

    // Delete seat
    public void deleteSeat(Long id) {

        Seat seat = getSeatById(id);

        seatRepository.delete(seat);
    }
}