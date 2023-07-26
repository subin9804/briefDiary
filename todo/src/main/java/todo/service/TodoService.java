package todo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import todo.collections.Todo;
import todo.payload.request.TodoRequest;
import todo.repository.TodoRepository;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo save(TodoRequest request, String user) {

        Todo todo = Todo.builder()
                .user(user)
                .date(LocalDate.now())
                .checked(false)
                .content(request.getContent())
                .build();

        return todoRepository.save(todo);
    }
}
