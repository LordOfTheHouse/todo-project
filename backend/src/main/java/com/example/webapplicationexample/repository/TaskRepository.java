package com.example.webapplicationexample.repository;

import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Обращение к табличке tasks
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCategory_Id(long id);

}
