package com.SoulSpace.backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class HallLayoutDTO {

    private Long id;

    private String name;

    private Integer floor;

    private String zone;

    private String purpose;

    private List<RowDTO> rows;

}