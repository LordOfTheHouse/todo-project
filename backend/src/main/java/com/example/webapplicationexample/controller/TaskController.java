package com.example.webapplicationexample.controller;

import com.example.webapplicationexample.model.Priority;
import com.example.webapplicationexample.model.Regularity;
import com.example.webapplicationexample.model.Status;
import com.example.webapplicationexample.model.Task;
import com.example.webapplicationexample.model.cropped.CroppedTask;
import com.example.webapplicationexample.service.PriorityService;
import com.example.webapplicationexample.service.RegularityService;
import com.example.webapplicationexample.service.StatusService;
import com.example.webapplicationexample.service.TaskService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * Работа с rest запросами по заметкам созданными пользователями
 */
@Slf4j
@RestController
@RequestMapping("tasks")
public class TaskController {

    private final TaskService taskService;
    private final StatusService statusService;
    private final PriorityService priorityService;
    private final RegularityService regularityService;

    @Autowired
    public TaskController(TaskService taskService, StatusService statusService, PriorityService priorityService, RegularityService regularityService) {
        this.taskService = taskService;
        this.statusService = statusService;
        this.priorityService = priorityService;
        this.regularityService = regularityService;
    }

    /**
     * Создает задачу
     *
     * @param task - задача
     */
    @PostMapping
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task) {
        long taskId = taskService.save(task);
        log.info("Добавление задачи {}", task);
        if(taskId != -1) {
            return ResponseEntity.created(URI.create("tasks/" + taskId)).build();
        }
        return ResponseEntity.badRequest().build();
    }

    /**
     * Обновляет информации о задаче.
     *
     * @param task - задача с новыми данными
     */
    @PutMapping
    public ResponseEntity<?> updateTask(@RequestBody Task task) {
        log.info("Обновление информации о задаче");
        boolean isUpdated = taskService.update(task); //Нужна какая-то проверка на false

        if (isUpdated) {
            log.info("Обновление информации о задаче успешно");
            return ResponseEntity.ok().build();
        } else {
            log.warn("Обновление информации о задаче провалено");
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Удаляет задачи по ее идентификатору
     *
     * @param taskId - id задачи
     */
    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable long taskId) {
        log.info("Удаление задачи по id: {}", taskId);
        boolean isDeleted = taskService.delete(taskId);
        if (isDeleted) {
            log.info("Удаление задачи успешно");
            return ResponseEntity.noContent().build();
        } else {
            log.warn("Удаление задачи провалено");
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * возвращает задачу по ее индиификатору.
     *
     * @return задача
     */
    @GetMapping("/{idTask}")
    public CroppedTask getTask(@PathVariable long idTask){
        log.info("Возвращает задачу по id");
        return new CroppedTask(taskService.findById(idTask));
    }

    /**
     * Возвращает список всех задач пользователя по его идентификатору.
     *
     * @return список задач
     */

    @GetMapping
    public List<CroppedTask> getTasks(){
        log.info("Возвращает всек задач пользователя с id");
        return taskService.findAll();
    }

    /**
     * Возвращает список всех задач в категории.
     *
     * @param categoryId идентификатор
     * @return список задач
     */
    @GetMapping("/categories")
    public List<CroppedTask> getTasksByCategory(@RequestParam long categoryId) {
        log.info("Получение задач по категории");
        return taskService.findTaskByCategory(categoryId);
    }

    /**
     * Возвращает список всех задач о которых требуется выслать уведомления пользователю
     *
     * @return список задач
     */

    @GetMapping("/notify")
    public List<CroppedTask> getNotifyTasks() {
        log.info("Получение задач требующих уведомления");
        return taskService.isNotifyTasks();
    }

    /**
     * Возвращает список всех задач требующих сегодняшнего выполнения
     *
     * @return список задач
     */
    @GetMapping("/now")
    public List<CroppedTask> getNowTasks() {
        log.info("Получение задач требующих выполнить сегодня");
        return taskService.findTaskInNowDay();
    }

    /**
     * Возвращает список всех задач требующих сегодняшнего выполнения
     *
     * @return список задач
     */
    @GetMapping("/archive")
    public List<CroppedTask> getArchive() {

        List<CroppedTask> croppedTasks = taskService.findTaskInArhive();
        log.info("Архив {}", croppedTasks);
        return croppedTasks;
    }

    /**
     * Возвращает все статусы для задачи
     *
     * @return список статусов
     */
    @GetMapping("/statuses")
    public List<Status> getStatuses() {
        log.info("Получение статусов задачи");
        return statusService.findAll();
    }

    /**
     * Возвращает все приоритеты для задачи
     *
     * @return список приоритетов
     */
    @GetMapping("/priorities")
    public List<Priority> getPriorities() {
        log.info("Получение списка приоритета");
        return priorityService.findAll();
    }

    /**
     * Возвращает регулярность повторения запроса
     *
     * @return список регулярностей
     */
    @GetMapping("/regularities")
    public List<Regularity> getRegularity() {
        log.info("Получение списка регулярностей");
        return regularityService.findAll();
    }

}

