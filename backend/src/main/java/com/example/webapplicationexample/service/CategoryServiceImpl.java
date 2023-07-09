package com.example.webapplicationexample.service;

import com.example.webapplicationexample.exception.UserNotFound;
import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.User;
import com.example.webapplicationexample.model.cropped.CroppedCategory;
import com.example.webapplicationexample.repository.CategoryRepository;
import com.example.webapplicationexample.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
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
        category.setUser(new User(getUserIdSecurityContext()));
        return categoryRepository.save(category).getId();
    }

    @Override
    public boolean update(Category category) {
        if (categoryRepository.existsByIdAndUser_Id(category.getId(),
                getUserIdSecurityContext())){
            category.setUser(new User(getUserIdSecurityContext()));
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(long idCategory) {
        if (categoryRepository.existsByIdAndUser_Id(idCategory, getUserIdSecurityContext())) {
            categoryRepository.deleteById(idCategory);
            return true;
        }
        return false;
    }

    /**
     * Возвращает id user из security context
     * @return индификатор пользователя
     */
    private long getUserIdSecurityContext() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return ((UserDetailsImpl)principal).getId();
        } else {
            throw new UserNotFound("Пользователь не найден");
        }
    }
    @Override
    public List<CroppedCategory> findAll() {
        return categoryRepository.findCategoryByUser_Id(getUserIdSecurityContext())
                .stream()
                .map(CroppedCategory::new)
                .toList();
    }

    @Override
    public boolean existByCategoryUser(long idCategory) {
        return categoryRepository.existsByIdAndUser_Id(idCategory, getUserIdSecurityContext());
    }
}
