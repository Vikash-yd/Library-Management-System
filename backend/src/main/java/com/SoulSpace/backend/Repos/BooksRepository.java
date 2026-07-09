package com.SoulSpace.backend.Repos;

import com.SoulSpace.backend.Models.Books;
import com.SoulSpace.backend.Models.BooksCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BooksRepository extends JpaRepository<Books, UUID> {

    @Query("SELECT DISTINCT b.category FROM Books b")
    List<BooksCategory> findDistinctCategories();

    List<Books> findByTitleContainingIgnoreCase(String title);

    List<Books> findByAuthorContainingIgnoreCase(String author);

    List<Books> findByCategory(BooksCategory category);

    List<Books> findByLanguageIgnoreCase(String language);

    Optional<Books> findById(UUID id);

    @Query("""
        SELECT b
        FROM Books b
        WHERE
            LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(b.publisher) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(CAST(b.category AS string)) LIKE LOWER(CONCAT('%', :query, '%'))
        """)
    List<Books> searchBooks(@Param("query") String query);

}