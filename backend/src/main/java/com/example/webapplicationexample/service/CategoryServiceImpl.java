package com.example.webapplicationexample.service;

import com.example.webapplicationexample.exception.UserNotFound;
import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.User;
import com.example.webapplicationexample.model.cropped.CroppedCategory;
import com.example.webapplicationexample.model.enum_model.ELock;
import com.example.webapplicationexample.repository.CategoryRepository;
import com.example.webapplicationexample.security.services.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Реализует логику работы с репозиторием Category
 */
@Service
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public long save(Category category) {
        category.setUser(new User(getUserIdSecurityContext()));
        if(category.getCategory().equals("Архив")){
            category.setCategory(category.getCategory()+"1");
        }
        return categoryRepository.save(category).getId();
    }

    @Override
    public boolean update(Category category) {
        if(category.getCategory().equals("Архив")){
            category.setCategory(category.getCategory()+"1");
        }
        if (categoryRepository.existsByIdAndUser_Id(category.getId(), getUserIdSecurityContext())){ // ЗАМЕНИТЬ НА getUserIdSecurityContext()
            category.setUser(new User(getUserIdSecurityContext())); // ЗАМЕНИТЬ НА getUserIdSecurityContext()
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(long idCategory) {
        if (categoryRepository.existsByIdAndUser_Id(idCategory, getUserIdSecurityContext())) { // ЗАМЕНИТЬ НА getUserIdSecurityContext()
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
    log.info("id {}",getUserIdSecurityContext());
        return categoryRepository.findCategoryByUser_Id(getUserIdSecurityContext()) // ЗАМЕНИТЬ НА getUserIdSecurityContext()
                .stream()
                .map(CroppedCategory::new)
                .toList();
    }

    @Override
    public boolean existByCategoryUser(long idCategory) {
        return categoryRepository.existsByIdAndUser_Id(idCategory, getUserIdSecurityContext());// ЗАМЕНИТЬ НА getUserIdSecurityContext()
    }
}
