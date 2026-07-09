package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Models.Lounge;
import com.SoulSpace.backend.Repos.LoungeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoungeServices {

    private final LoungeRepository loungeRepository;

    public List<Lounge> getAllLounges() {
        return loungeRepository.findAll();
    }
}