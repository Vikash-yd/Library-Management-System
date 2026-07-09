package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.LoungeEvent;
import com.SoulSpace.backend.Services.LoungeEventServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/events")
public class LoungeEventController {

    @Autowired
    private LoungeEventServices eventService;

    @GetMapping("/lounge/{loungeId}")
    public List<LoungeEvent> getEventsByLounge(
            @PathVariable UUID loungeId
    ) {

        return eventService.getEventsByLounge(loungeId);

    }

    @GetMapping("/{eventId}")
    public LoungeEvent getEventById(
            @PathVariable UUID eventId
    ) {

        return eventService.getEventById(eventId);

    }
}