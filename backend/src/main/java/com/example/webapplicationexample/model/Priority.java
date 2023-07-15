package com.example.webapplicationexample.model;

import com.example.webapplicationexample.model.enum_model.EPriority;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Приоритет
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "priorities")
public class Priority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @NotBlank
    private EPriority priority;
}
