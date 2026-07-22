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


    @Column(nullable = false)
    private String seatNumber;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hall_id", nullable = false)
    @JsonIgnore
    private Hall hall;


    private Integer floor;


    private String location;


    private String zone;


    private Boolean hasChargingPort = false;


    private Boolean nearWindow = false;


    private Boolean active = true;



    // ============================
    // TABLE INFORMATION
    // ============================

    @Column(name = "table_no")
    private Integer tableNo;


    @Column(name = "row_no")
    private Integer rowNo;


    @Column(name = "table_order")
    private Integer tableOrder;



    // ============================
    // SEAT POSITION
    // ============================

     



     


    // ============================
    // BOOKINGS
    // ============================

    @OneToMany(mappedBy = "seat", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<SeatBooking> bookings = new ArrayList<>();

}