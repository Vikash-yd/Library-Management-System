package com.SoulSpace.backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SeatDTO {

    private Long id;

    private String seatNumber;

    private Boolean active;

    private Boolean hasChargingPort;

    private Boolean nearWindow;

}