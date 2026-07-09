package com.SoulSpace.backend.Dtos;

import com.SoulSpace.backend.enums.searchField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class searchrequestDTO {
    private searchField field;
    private String value;
}
