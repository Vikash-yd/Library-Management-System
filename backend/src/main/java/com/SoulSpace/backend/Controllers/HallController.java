package com.SoulSpace.backend.Controllers;

import com.SoulSpace.backend.Models.Hall;
import com.SoulSpace.backend.Services.HallServices;
import com.SoulSpace.backend.Services.HallServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/halls")
@CrossOrigin(origins = "*")
public class HallController {

    private final HallServices hallService;

    public HallController(HallServices hallService) {
        this.hallService = hallService;
    }

    @GetMapping
    public List<Hall> getAllHalls() {
        return hallService.getAllHalls();
    }

    @GetMapping("/active")
    public List<Hall> getActiveHalls() {
        return hallService.getActiveHalls();
    }

    @GetMapping("/{id}")
    public Hall getHallById(@PathVariable Long id) {
        return hallService.getHallById(id);
    }

    @GetMapping("/recommended")
    public List<Hall> getRecommendedHall(
            @RequestParam String lounge
    ) {
        return hallService.getRecommendedHalls(lounge);
    }

    @PostMapping
    public Hall createHall(@RequestBody Hall hall) {
        return hallService.createHall(hall);
    }

    @PutMapping("/{id}")
    public Hall updateHall(
            @PathVariable Long id,
            @RequestBody Hall hall
    ) {
        return hallService.updateHall(id, hall);
    }

    @DeleteMapping("/{id}")
    public void deleteHall(@PathVariable Long id) {
        hallService.deleteHall(id);
    }
}