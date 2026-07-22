package com.SoulSpace.backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RowDTO {

    private Integer rowNo;

    private List<TableDTO> tables;

}