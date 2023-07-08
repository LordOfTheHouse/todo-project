package com.example.webapplicationexample.controller;

import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.cropped.CroppedCategory;
import com.example.webapplicationexample.service.CategoryService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * Работа с rest запросами по категориям созданным пользователями
 */
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Создает новую категорию
     * @param category - информация о категории
     */
    @PostMapping
    public ResponseEntity<?> addCategory(@Valid @RequestBody Category category){
        log.info("Добавление новой категории {}", category);
        long idCategory = categoryService.save(category);
        return ResponseEntity.created(URI.create("/category/"+idCategory)).build();
    }

    /**
     * Обновляет информацию о категории
     * @param category - информация о категории
     */
    @PutMapping
    public ResponseEntity<?> updateCategory(@Valid @RequestBody Category category){
        log.info("Обновление информации о категории {}", category);
        boolean isUpdate = categoryService.update(category);
        if(isUpdate){
            log.info("Обновление информации о категории успешно");
            return ResponseEntity.ok().build();
        } else {
            log.error("Обновление информации о категории провалено");
            return ResponseEntity.notFound().build();
        }
    }
    /**
     *
     * Удаляет категорию
     * @param idCategory - индификатор
     */
    @DeleteMapping
    public ResponseEntity<?> deleteCategory(@RequestParam long idCategory){
        log.info("Удаление категории по id{}", idCategory);
        boolean isDelete = categoryService.delete(idCategory);
        if(isDelete){
            log.info("Удаление категории успешно");
            return ResponseEntity.noContent().build();
        } else {
            log.error("Удаление категории провалено");
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Возвращает все категори пользователя
     * @param userId
     */
    @GetMapping("/{userId}")
    public ResponseEntity<List<CroppedCategory>> getCategories(@PathVariable long userId){
        log.info("Получение категорий по user id {}", userId);
        return ResponseEntity.ok().body(categoryService.findAll(userId));
    }

}
