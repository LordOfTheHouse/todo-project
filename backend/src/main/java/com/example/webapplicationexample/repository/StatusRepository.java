package com.example.webapplicationexample.repository;

import com.example.webapplicationexample.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Обращение к табличке statuses
 */
@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
}
