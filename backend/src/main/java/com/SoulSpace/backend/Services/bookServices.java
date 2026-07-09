package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Dtos.searchrequestDTO;
import com.SoulSpace.backend.Models.Books;
import com.SoulSpace.backend.Models.BooksCategory;
import com.SoulSpace.backend.Repos.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class bookServices {

    private final BooksRepository bookRepository;

    @Autowired
    public bookServices(BooksRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // GET ALL DISTINCT CATEGORIES
    public List<BooksCategory> getAllCategories() {

        return bookRepository.findDistinctCategories();
    }
    public List<Books> getBooksByCategory(String category) {

        BooksCategory booksCategory =
                BooksCategory.valueOf(category);

        return bookRepository.findByCategory(booksCategory);
    }
    public Books getBookById(String id) {

        UUID uuid = UUID.fromString(id);

        return bookRepository.findById(uuid)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }
}