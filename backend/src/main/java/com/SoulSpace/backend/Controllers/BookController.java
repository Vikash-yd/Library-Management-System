package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.Books;
import com.SoulSpace.backend.Models.BooksCategory;
import com.SoulSpace.backend.Services.bookServices;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class BookController {

    private final bookServices bookService;

    public BookController(bookServices bookService) {
        this.bookService = bookService;
    }

    // GET ALL CATEGORIES
    @GetMapping
    public List<BooksCategory> getCategories() {

        return bookService.getAllCategories();
    }

    // GET BOOKS BY CATEGORY
    @GetMapping("/category/{category}")
    public List<Books> getBooksByCategory(
            @PathVariable String category
    ) {

        return bookService.getBooksByCategory(category);
    }

    // GET SINGLE BOOK DETAILS
    @GetMapping("/book/{id}")
    public Books getBookById(
            @PathVariable String id
    ) {

        return bookService.getBookById(id);
    }
}