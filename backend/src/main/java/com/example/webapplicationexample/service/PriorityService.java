package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Priority;

import java.util.List;

/**
 * Логика взаимодействия с репозиторием Priority
 */
public interface PriorityService {
    /**
     * Возвращает все возможные приоритеты задач
     */
    List<Priority> findAll();
}
