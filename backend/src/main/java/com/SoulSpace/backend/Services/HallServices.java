package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Models.Hall;
import com.SoulSpace.backend.Repositories.HallRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallServices {

    private final HallRepository hallRepository;

    public HallServices(HallRepository hallRepository) {
        this.hallRepository = hallRepository;
    }

    public List<Hall> getAllHalls() {
        return hallRepository.findAll();
    }

    public List<Hall> getActiveHalls() {
    return hallRepository.findAll();
}

    public Hall getHallById(Long id) {
        return hallRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Hall not found"));
    }

    public List<Hall> getRecommendedHalls(String lounge) {
        return hallRepository.findByRecommendedLounges_Title(lounge);
    }

    public Hall createHall(Hall hall) {
        return hallRepository.save(hall);
    }

    public Hall updateHall(Long id, Hall updatedHall) {

        Hall hall = getHallById(id);

        hall.setName(updatedHall.getName());
        hall.setFloor(updatedHall.getFloor());
        hall.setZone(updatedHall.getZone());
        hall.setPurpose(updatedHall.getPurpose());
        hall.setDescription(updatedHall.getDescription());
        hall.setActive(updatedHall.getActive());

        // Update recommended lounges
        hall.setRecommendedLounges(updatedHall.getRecommendedLounges());

        return hallRepository.save(hall);
    }

    public void deleteHall(Long id) {
        hallRepository.deleteById(id);
    }
}