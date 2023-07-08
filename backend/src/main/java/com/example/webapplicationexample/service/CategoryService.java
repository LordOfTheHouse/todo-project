package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.cropped.CroppedCategory;

import java.util.List;

/**
 * Реализует логику работы с репозиторием Category
 */
public interface CategoryService {
    /**
     * Добавляет новую категорию
     * @param category - информация о новой категории
     * @return id созданной категории
     */
    long save(Category category);

    /**
     * Обновляет информаци о категории
     * @param category - информация о катеогрии для обновления
     * @return истину если обновленике успешно
     */
    boolean update(Category category);
    /**
     * Удаляет категорию
     * @param idCategory - информация о катеогрии для обновления
     * @return истину если удаление успешно
     */
    boolean delete(long idCategory);

    /**
     * Возвращает все категории пользователя
     * @param userId - индификатор пользователя
     * @return список категорий
     */
    List<CroppedCategory> findAll(long userId);
}
