package com.SoulSpace.backend.Repositories;

import com.SoulSpace.backend.Models.Hall;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HallRepository extends JpaRepository<Hall, Long> {

    List<Hall> findByActiveTrue();

    List<Hall> findByRecommendedLounges_Title(String lounge);
}