package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Dtos.*;
import com.SoulSpace.backend.Models.Hall;
import com.SoulSpace.backend.Models.Seat;
import com.SoulSpace.backend.Repositories.HallRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class HallLayoutService {


    private final HallRepository hallRepository;


    public HallLayoutService(HallRepository hallRepository) {
        this.hallRepository = hallRepository;
    }



    public List<HallLayoutDTO> getHallLayout() {

        List<Hall> halls = hallRepository.findByActiveTrue();

        return halls.stream()
                .map(this::convertHall)
                .collect(Collectors.toList());

    }




    private HallLayoutDTO convertHall(Hall hall) {


        Map<Integer, Map<Integer, List<Seat>>> rows = new TreeMap<>();


        for (Seat seat : hall.getSeats()) {

            Integer rowNo = seat.getRowNo();
            Integer tableNo = seat.getTableNo();


            rows
                .computeIfAbsent(rowNo, k -> new TreeMap<>())
                .computeIfAbsent(tableNo, k -> new ArrayList<>())
                .add(seat);

        }



        List<RowDTO> rowDTOs = new ArrayList<>();


        for (Map.Entry<Integer, Map<Integer, List<Seat>>> rowEntry : rows.entrySet()) {


            List<TableDTO> tables = new ArrayList<>();


            for (Map.Entry<Integer, List<Seat>> tableEntry : rowEntry.getValue().entrySet()) {


                List<SeatDTO> seats = tableEntry.getValue()
                        .stream()
                        .sorted(
                                Comparator.comparing(Seat::getSeatNumber)
                        )
                        .map(seat -> new SeatDTO(
                                seat.getId(),
                                seat.getSeatNumber(),
                                seat.getActive(),
                                seat.getHasChargingPort(),
                                seat.getNearWindow()
                        ))
                        .collect(Collectors.toList());



                TableDTO tableDTO = new TableDTO(
                        tableEntry.getKey(),
                        seats
                );


                tables.add(tableDTO);

            }



            rowDTOs.add(
                    new RowDTO(
                            rowEntry.getKey(),
                            tables
                    )
            );

        }



        return new HallLayoutDTO(
                hall.getId(),
                hall.getName(),
                hall.getFloor(),
                hall.getZone(),
                hall.getPurpose(),
                rowDTOs
        );

    }

}