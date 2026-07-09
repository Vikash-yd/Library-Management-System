package com.SoulSpace.backend.Repos;

import com.SoulSpace.backend.Models.Lounge;
import com.SoulSpace.backend.Models.LoungeEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LoungeRepository extends JpaRepository<Lounge, UUID> {

}