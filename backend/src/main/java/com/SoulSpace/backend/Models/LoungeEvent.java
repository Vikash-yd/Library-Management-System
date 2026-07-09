package com.SoulSpace.backend.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
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
public class LoungeEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // BASIC INFO

    private String title;

    @Column(length = 3000)
    private String description;

    private String bannerImage;

    // EVENT STATUS

    @Enumerated(EnumType.STRING)
    private EventStatus status;

    // DATE & TIME

    private LocalDate eventDate;

    private LocalTime eventTime;

    private Integer durationMinutes;

    // SEAT MANAGEMENT

    private Integer totalSeats;

    private Integer seatsLeft;

    private Integer registrations;

    // HOST DETAILS

    private String hostName;

    private String hostDesignation;

    private String hostQualification;

    private String hostOrganization;

    private String hostProfileImage;

    // VENUE DETAILS

    private String venueName;

    private String venueAddress;

    // EVENT METRICS

    private Integer views;

    private Double rating;

    private Boolean featured;

    private Boolean certificateProvided;

    // CONTACT

    private String contactEmail;

    // LEARNING DETAILS

    @Column(length = 2000)
    private String whatYouWillLearn;

    @Column(length = 1000)
    private String prerequisites;

    // TAGS

    @ElementCollection(targetClass = EventTag.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(
            name = "event_tags",
            joinColumns = @JoinColumn(name = "lounge_event_id")
    )
    @Column(name = "tags")
    private List<EventTag> tags;

    // RELATIONSHIP

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lounge_id")
    @JsonBackReference
    private Lounge lounge;
}