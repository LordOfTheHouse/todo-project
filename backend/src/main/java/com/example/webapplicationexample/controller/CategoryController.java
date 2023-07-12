package com.example.webapplicationexample.controller;

import com.example.webapplicationexample.exception.UserNotFound;
import com.example.webapplicationexample.model.Category;
import com.example.webapplicationexample.model.Task;
import com.example.webapplicationexample.model.cropped.CroppedCategory;
import com.example.webapplicationexample.security.services.UserDetailsImpl;
import com.example.webapplicationexample.service.CategoryService;
import com.example.webapplicationexample.service.TaskService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Работа с rest запросами по категориям созданным пользователями
 */
@Slf4j

@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;
    private final TaskService taskService;

    @Autowired
    public CategoryController(CategoryService categoryService, TaskService taskService) {
        this.categoryService = categoryService;
        this.taskService = taskService;
    }

    /**
     * Создает новую категорию
     * @param category - информация о категории
     */
    @Transactional
    @PostMapping
    public ResponseEntity<?> addCategory(@Valid @RequestBody Category category){
        log.info("Добавление новой категории {}", category);
        long idCategory = categoryService.save(category);
        Task randomHistory = generateSecretTask();
        Category newCategory = new Category();
        newCategory.setId(idCategory);
        randomHistory.setCategory(newCategory);
        log.info("{}", randomHistory);
        taskService.save(randomHistory);
        return ResponseEntity.created(URI.create("/category/"+idCategory)).build();
    }

    private Task generateSecretTask(){
        ArrayList<Task> randomTask = new ArrayList<>();
        Task task = new Task();
        task.setTitle("Секретная миссия");
        task.setDescription("Тайна открыта! У вас есть новая секретная миссия, агент! Ваше задание, если вы решите его принять, состоит в том, чтобы выполнить все задачи на этом списке с максимальной эффективностью и безошибочности. Ваш успех зависит от вас, а также от секретных функций, которые доступны только вам и вашему Todo List. Удачи, агент!");
        randomTask.add(task);
        Task task2 = new Task();
        task2.setTitle("Тур по воображаемому миру");
        task2.setDescription("Добро пожаловать в удивительный воображаемый мир! Ваше задание - отправиться в эпическое путешествие по различным воображаемым местам и испытать удивительные приключения. Каждая задача представляет собой новую локацию, которую вам предстоит посетить. Ваша фантазия и творческий подход здесь неограничен! Готовы отправиться в этот воображаемый тур? Приятного путешествия!");
        randomTask.add(task2);
        Task task3 = new Task();
        task3.setTitle("Тайна пропавшего клада");
        task3.setDescription("Древний затерянный клад был обнаружен! Отправляйтесь в захватывающее приключение, чтобы раскрыть тайну и найти этот драгоценный клад. Ваша задача - разгадать загадки, расшифровать карту и пройти испытания, чтобы прийти к сокровищу. Вас ждет увлекательное путешествие, полное загадок, головоломок и неожиданных поворотов событий. Готовы стать частью этого уникального приключения?");
        randomTask.add(task3);
        Random random = new Random();
        int randomIndex = random.nextInt(randomTask.size());
        return randomTask.get(randomIndex);
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
    @DeleteMapping("/{idCategory}")
    public ResponseEntity<?> deleteCategory(@PathVariable long idCategory){
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
     */
    @GetMapping("/all")
    public ResponseEntity<List<CroppedCategory>> getCategories(){
        log.info("Получение категорий по user id{}", SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return ResponseEntity.ok().body(categoryService.findAll());
    }

}
