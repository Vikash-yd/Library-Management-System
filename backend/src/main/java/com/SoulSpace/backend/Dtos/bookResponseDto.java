package com.SoulSpace.backend.Dtos;

import java.util.UUID;

public class bookResponseDto {
    public class BookResponseDTO {
        private UUID id;
        private String title;
        private String author;
        private String category;
        private String coverImageUrl;
        private boolean available;
    }
}
