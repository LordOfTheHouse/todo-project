package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Task;
import com.example.webapplicationexample.model.cropped.CroppedTask;

import java.util.List;
import java.util.Optional;

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
     * @return Список сокращенной информации о задачах пользователя.
     */
    List<CroppedTask> findAll();

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
     * @return Список задач, требующих уведомления.
     */
    List<CroppedTask> isNotifyTasks();

    /**
     * Получение задачи по id
     */
    Task findById(long idTask);

    /**
     * Возвращает список заметок пользователя из архива
     */
    List<CroppedTask> findTaskInArhive();

    /**
     * Возвращает список заметок пользователя которые требуется выполнить сегодня
     */
    List<CroppedTask> findTaskInNowDay();
}

