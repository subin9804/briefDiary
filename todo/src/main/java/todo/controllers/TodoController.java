package todo.controllers;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import todo.collections.Todo;
import todo.payload.request.TodoRequest;
import todo.payload.response.MessageResponse;
import todo.payload.response.TodoResponse;
import todo.repository.TodoRepository;
import todo.service.TodoService;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService service;
    private final TodoRepository todoRepository;

    public Logger logger = LoggerFactory.getLogger(TodoController.class);

    // todo 추가하기
    @PostMapping
    public ResponseEntity<Todo> todoPS(@RequestBody TodoRequest todoRequest, Principal principal) {
        String user = principal.getName();
        Todo savedTodo = service.save(todoRequest, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTodo);
    }

    // todo 날짜별 조회하기
    @GetMapping("/{date}")
    public ResponseEntity<List<TodoResponse>> todo(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date, Principal principal) {
        String user = principal.getName();

        List<TodoResponse> todos = todoRepository.findByUserAndDate(user, date)
                .stream()
                .map(TodoResponse::new)
                .toList();

        return ResponseEntity.ok().body(todos);
    }

    // Todo 수정하기
    @PutMapping("/{id}/update")
    public ResponseEntity<Todo> updateTodo(@RequestBody TodoRequest request, @PathVariable("id") String id) {

        Todo updatedTodo = service.update(request, id);

        return ResponseEntity.ok().body(updatedTodo);

    }

    // Todo 삭제하기
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        Todo todo = todoRepository.findById(id).orElse(null);

        if(todo != null) {
            todoRepository.delete(todo);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted!!"));

        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Already not exists"));
        }
    }
}
