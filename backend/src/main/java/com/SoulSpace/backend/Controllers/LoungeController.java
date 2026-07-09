package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.Lounge;
import com.SoulSpace.backend.Services.LoungeServices;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lounges")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class LoungeController {

    private final LoungeServices loungeService;

    @GetMapping
    public List<Lounge> getAllLounges() {
        return loungeService.getAllLounges();
    }
}