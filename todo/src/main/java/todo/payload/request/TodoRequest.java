package todo.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoRequest {

    private String id;

    @NotBlank
    private LocalDate date;

    private String user;

    @NotBlank
    private boolean checked;

    @NotBlank
    private String content;

}
