package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.Task;
import com.example.webapplicationexample.model.cropped.CroppedTask;

import java.util.List;

/**
 * Реализует логику работы с репозиторием Task
 */
public interface TaskService {

    /**
     * Сохраняет задачу в базу данных.
     *
     * @param task Задача для сохранения.
     * @return Идентификатор сохраненной задачи.
     */
    long save(Task task);

    /**
     * Обновляет информацию о задаче в базе данных.
     *
     * @param task Обновленная информация о задаче.
     * @return Флаг успешного или неуспешного обновления.
     */
    boolean update(Task task);

    /**
     * Удаляет задачу из базы данных.
     *
     * @param taskId Идентификатор задачи для удаления.
     * @return Флаг успешного или неуспешного удаления.
     */
    boolean delete(long taskId);

    /**
     * Возвращает список всех задач пользователя.
     *
     * @param userId Идентификатор пользователя.
     * @return Список сокращенной информации о задачах пользователя.
     */
    List<CroppedTask> findAll(long userId);

    /**
     * Возвращает список задач из указанной категории.
     *
     * @param categoryId Идентификатор категории.
     * @return Список сокращенной информации о задачах из указанной категории.
     */
    List<CroppedTask> findTaskByCategory(long categoryId);

    /**
     * Возвращает список задач, требующих уведомления, для указанного пользователя.
     *
     * @param userId Идентификатор пользователя.
     * @return Список задач, требующих уведомления.
     */
    List<CroppedTask> isNotifyTasks(long userId);
}

