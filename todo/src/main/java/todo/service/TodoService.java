package todo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import todo.collections.Todo;
import todo.payload.request.TodoRequest;
import todo.repository.TodoRepository;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public Todo save(TodoRequest request, String user) {

        Todo todo = Todo.builder()
                .user(user)
                .date(request.getDate())
                .checked(false)
                .content(request.getContent())
                .build();

        return todoRepository.save(todo);
    }

    public Todo update(TodoRequest request, String id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Not exsist todo"));

        todo.setId(request.getId());
        todo.setDate(request.getDate());
        todo.setChecked(request.isChecked());
        todo.setContent(request.getContent());

        return todoRepository.save(todo);
    }
}
