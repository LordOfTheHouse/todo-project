package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.cropped.CroppedCategory;
import com.example.webapplicationexample.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Реализует логику работы с репозиторием Category
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public long save(Category category) {
        return categoryRepository.save(category).getId();
    }

    @Override
    public boolean update(Category category) {
        if (!categoryRepository.existsById(category.getId())) {
            return false;
        }
        categoryRepository.save(category);
        return true;
    }

    @Override
    public boolean delete(long idCategory) {
        if (!categoryRepository.existsById(idCategory)) {
            return false;
        }
        categoryRepository.deleteById(idCategory);
        return true;
    }

    @Override
    public List<CroppedCategory> findAll(long userId) {
        return categoryRepository.findCategoryByUser_Id(userId).stream().map(CroppedCategory::new).toList();
    }
}
