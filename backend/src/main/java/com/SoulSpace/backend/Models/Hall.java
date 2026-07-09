package com.SoulSpace.backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "halls")
@Getter
@Setter
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Example: Silent Reading Hall
    @Column(nullable = false, unique = true)
    private String name;

    // Example: 1, 2, 3
    private Integer floor;

    // Example: Silent Zone, Innovation Zone
    private String zone;

    // Example: Reading, Coding, Group Study
    private String purpose;

    @Column(length = 1000)
    private String description;

    private Boolean active = true;

    // Lounges for which this hall is recommended
    @ManyToMany
    @JoinTable(
            name = "hall_lounge_mapping",
            joinColumns = @JoinColumn(name = "hall_id"),
            inverseJoinColumns = @JoinColumn(name = "lounge_id")
    )
    @JsonIgnore
    private List<Lounge> recommendedLounges = new ArrayList<>();

    // Seats available in this hall
    @OneToMany(mappedBy = "hall", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Seat> seats = new ArrayList<>();
}