package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Models.LoungeEvent;
import com.SoulSpace.backend.Repos.LoungeEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LoungeEventServices {

    @Autowired
    private LoungeEventRepository eventRepository;

    public List<LoungeEvent> getEventsByLounge(UUID loungeId) {

        return eventRepository.findByLoungeId(loungeId);

    }

    public LoungeEvent getEventById(UUID eventId) {

        return eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found with id: " + eventId));

    }
}