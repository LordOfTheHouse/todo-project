package com.example.webapplicationexample.repository;

import com.example.webapplicationexample.model.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Обращение к табличке priorities
 */
@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {
}
