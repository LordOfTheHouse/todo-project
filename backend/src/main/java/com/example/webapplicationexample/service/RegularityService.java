package com.example.webapplicationexample.service;

import com.example.webapplicationexample.model.Regularity;

import java.util.List;

/**
 * Логика взаимодействия с репозиторием Regularity
 */
public interface RegularityService {
    /**
     * Возвращает регулярность задачи
     */
    List<Regularity> findAll();
}
