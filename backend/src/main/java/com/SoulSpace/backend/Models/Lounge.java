package com.SoulSpace.backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;
@JsonIgnoreProperties({
        "hibernateLazyInitializer",
        "handler"
})

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lounge {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String icon;

    private String bannerImage;

    private Boolean active;

    private String location;

    private Integer capacity;

    private String openingHours;

    @OneToMany(
            mappedBy = "lounge",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<LoungeEvent> events;
}