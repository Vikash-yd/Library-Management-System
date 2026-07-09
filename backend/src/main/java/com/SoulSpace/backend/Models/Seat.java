package com.SoulSpace.backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@JsonIgnoreProperties({
        "hibernateLazyInitializer",
        "handler"
})
@Entity
@Table(name = "seats")
@Getter
@Setter
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Example: A01, A02, B01
    @Column(nullable = false)
    private String seatNumber;

    // Hall to which this seat belongs
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hall_id", nullable = false)
    @JsonIgnore
    private Hall hall;

    // Floor (optional but useful)
    private Integer floor;

    // Window / Center / Corner
    private String location;

    // Silent Zone / Discussion Zone
    private String zone;

    // Charging facility
    private Boolean hasChargingPort = false;

    // Near window
    private Boolean nearWindow = false;

    // Admin can disable seats for maintenance
    private Boolean active = true;

    // Booking history of this seat
    @OneToMany(mappedBy = "seat", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SeatBooking> bookings = new ArrayList<>();

}