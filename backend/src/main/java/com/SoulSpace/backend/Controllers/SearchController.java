package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Dtos.SearchResponseDTO;
import com.SoulSpace.backend.Services.SearchServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "*")
public class SearchController {

    private final SearchServices searchService;

    public SearchController(SearchServices searchService) {
        this.searchService = searchService;
    }

    @GetMapping
    public ResponseEntity<SearchResponseDTO> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "all") String type
    ) {

        SearchResponseDTO response = searchService.search(query, type);

        return ResponseEntity.ok(response);
    }
}