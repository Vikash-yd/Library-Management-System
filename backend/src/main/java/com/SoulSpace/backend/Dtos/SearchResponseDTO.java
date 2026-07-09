package com.SoulSpace.backend.Dtos;

import com.SoulSpace.backend.Models.Books;
import com.SoulSpace.backend.Models.BooksCategory;
import com.SoulSpace.backend.Models.LoungeEvent;
import com.SoulSpace.backend.Models.Lounge;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponseDTO {

    private List<Books> books = new ArrayList<>();

    private List<LoungeEvent> events = new ArrayList<>();

    private List<Lounge> lounges = new ArrayList<>();

    private List<BooksCategory> categories = new ArrayList<>();

}