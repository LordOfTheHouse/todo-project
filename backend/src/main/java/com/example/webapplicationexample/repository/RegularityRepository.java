package com.example.webapplicationexample.repository;

import com.example.webapplicationexample.model.Regularity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Обращение к табличке regularities
 */
@Repository
public interface RegularityRepository extends JpaRepository<Regularity, Long> {
}
