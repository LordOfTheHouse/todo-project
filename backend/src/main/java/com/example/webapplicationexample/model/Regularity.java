package com.example.webapplicationexample.model;

import com.example.webapplicationexample.model.enum_model.ERegularity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Регулярность
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "regularities")
public class Regularity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @NotBlank
    private ERegularity regularity;

}
