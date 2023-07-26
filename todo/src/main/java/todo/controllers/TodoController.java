package todo.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import todo.collections.Todo;
import todo.payload.request.TodoRequest;
import todo.repository.TodoRepository;
import todo.service.TodoService;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService service;
    private final TodoRepository todoRepository;

    // todo 추가하기
    @PostMapping
    public ResponseEntity<Todo> todoPS(@RequestBody TodoRequest todoRequest, Principal principal) {
        String user = principal.getName();
        Todo savedTodo = service.save(todoRequest, user);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTodo);
    }

    // todo 조회하기
    @GetMapping("/{date}")
    public ResponseEntity<List<Todo>> todo(@PathVariable("date") String date, Principal principal) {
        String user = principal.getName();
        List<Todo> todos = todoRepository.findAllByUserAndDate(user, date);

        return ResponseEntity.ok().body(todos);
    }
}
