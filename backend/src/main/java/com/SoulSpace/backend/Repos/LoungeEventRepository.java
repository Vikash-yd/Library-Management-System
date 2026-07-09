package com.SoulSpace.backend.Repos;

import com.SoulSpace.backend.Models.LoungeEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface LoungeEventRepository extends JpaRepository<LoungeEvent, UUID> {

    List<LoungeEvent> findByLoungeId(UUID loungeId);

    @Query("""
    SELECT e FROM LoungeEvent e
    WHERE LOWER(e.title) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(e.description) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(e.venueName) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(e.venueAddress) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(e.hostName) LIKE LOWER(CONCAT('%', :query, '%'))
       OR LOWER(e.hostOrganization) LIKE LOWER(CONCAT('%', :query, '%'))
""")
    List<LoungeEvent> searchEvents(String query);

}