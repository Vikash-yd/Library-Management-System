package com.SoulSpace.backend.Dtos;

import java.util.UUID;

public class bookDetailsResponseDto {
    public class BookDetailResponseDTO {
        private UUID id;
        private String title;
        private String author;
        private String description;
        private String category;
        private String publisher;
        private int pageCount;
        private double rating;
        private String coverImageUrl;
        private boolean available;
    }
}
