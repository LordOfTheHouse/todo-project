package com.example.webapplicationexample.model;

import com.example.webapplicationexample.model.enum_model.ELock;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import static com.example.webapplicationexample.model.enum_model.ELock.LOCK;

/**
 * Категория
 */
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String category;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
