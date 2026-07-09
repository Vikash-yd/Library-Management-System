package com.SoulSpace.backend.Models;
import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
@JsonIgnoreProperties({
        "hibernateLazyInitializer",
        "handler"
})

@Entity
@Table(name = "books")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Books {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    private String isbn;

    private String publisher;

    private LocalDate publishedDate;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private BooksCategory category; // self-care, comics, religious

    private String language;

    private int pageCount;

    private double rating;

    private int totalCopies;

    private int availableCopies;

    private String coverImageUrl;

    private String bookPdfUrl; // for digital access

    public boolean isAvailable() {
        return availableCopies > 0;
    };

    private LocalDateTime createdAt ;
    private LocalDateTime updatedAt ;
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}
