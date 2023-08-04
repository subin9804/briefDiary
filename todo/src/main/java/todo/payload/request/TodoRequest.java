package todo.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TodoRequest {

    private String id;

    @NotBlank
    private String date;

    private String user;

    private boolean checked;

    @NotBlank
    private String content;

}
