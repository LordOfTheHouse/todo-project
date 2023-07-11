package com.example.webapplicationexample.repository;

import com.example.webapplicationexample.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Обращение к табличке categories
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findCategoryByUser_Id(long userId);
    boolean existsByIdAndUser_Id(long id, long userId);

}
