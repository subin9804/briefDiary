package todo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import todo.collections.Todo;
import todo.payload.request.TodoRequest;
import todo.repository.TodoRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo save(TodoRequest request, String user) {
        LocalDate date = LocalDate.parse(request.getDate(), DateTimeFormatter.ISO_DATE);

        Todo todo = Todo.builder()
                .user(user)
                .date(date)
                .checked(false)
                .content(request.getContent())
                .build();

        return todoRepository.save(todo);
    }

    public Todo update(TodoRequest request, String id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Not exsist todo"));
        LocalDate date = LocalDate.parse(request.getDate(), DateTimeFormatter.ISO_DATE);

        todo.setDate(date);
        todo.setChecked(request.isChecked());
        todo.setContent(request.getContent());

        return todoRepository.save(todo);
    }
}
