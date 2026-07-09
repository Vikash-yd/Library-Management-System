package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Dtos.SearchResponseDTO;
import com.SoulSpace.backend.Models.LoungeEvent;
import com.SoulSpace.backend.Repos.BooksRepository;
import com.SoulSpace.backend.Repos.LoungeEventRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class SearchServices {

    private final BooksRepository bookRepository;
    private final LoungeEventRepository loungeEventRepository;

    public SearchServices(BooksRepository bookRepository,
                          LoungeEventRepository loungeEventRepository) {
        this.bookRepository = bookRepository;
        this.loungeEventRepository = loungeEventRepository;
    }

    public SearchResponseDTO search(String query, String type) {

        SearchResponseDTO response = new SearchResponseDTO();

        switch (type.toLowerCase()) {

            case "books":
                response.setBooks(bookRepository.searchBooks(query));
                break;

            case "events":
                List<LoungeEvent> repositoryResults =
                        loungeEventRepository.searchEvents(query);

                String normalizedQuery = query
                        .toLowerCase()
                        .replace(" ", "_");

                List<LoungeEvent> tagResults = loungeEventRepository.findAll()
                        .stream()
                        .filter(event ->
                                event.getTags() != null &&
                                        event.getTags().stream().anyMatch(tag ->
                                                tag.name()
                                                        .toLowerCase()
                                                        .contains(normalizedQuery)
                                        )
                        )
                        .toList();

                Set<LoungeEvent> finalResults = new LinkedHashSet<>();
                finalResults.addAll(repositoryResults);
                finalResults.addAll(tagResults);

                response.setEvents(new ArrayList<>(finalResults));

                break;

            case "all":
                response.setBooks(bookRepository.searchBooks(query));
                response.setEvents(loungeEventRepository.searchEvents(query));
                break;

            case "lounges":
                // Implement later
                break;

            case "categories":
                // Implement later
                break;

            default:
                response.setBooks(bookRepository.searchBooks(query));
                break;
        }

        return response;
    }
}