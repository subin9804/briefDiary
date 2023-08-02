package todo.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import todo.collections.Todo;

import java.time.LocalDate;

@Data @AllArgsConstructor @NoArgsConstructor
public class TodoResponse {

    private String id;
    private LocalDate date;
    private String user;
    private boolean checked;
    private String content;

    public TodoResponse(Todo todo) {
        this.id = todo.getId();
        this.date = todo.getDate();
        this.user = todo.getUser();
        this.checked = todo.isChecked();
        this.content = todo.getContent();
    }
}
