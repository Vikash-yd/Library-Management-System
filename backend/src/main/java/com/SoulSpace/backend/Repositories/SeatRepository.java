package com.SoulSpace.backend.Repositories;

import com.SoulSpace.backend.Models.Hall;
import com.SoulSpace.backend.Models.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByHall(Hall hall);

    List<Seat> findByHallAndActiveTrue(Hall hall);

    Optional<Seat> findBySeatNumber(String seatNumber);

    Optional<Seat> findBySeatNumberAndHall(String seatNumber, Hall hall);

    List<Seat> findByActiveTrue();

}