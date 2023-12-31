package todo.collections;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "diary") @Builder
@Data @NoArgsConstructor @AllArgsConstructor
public class Diary {
    @Id
    private String id;

    @NotBlank
    private LocalDate date;

    @CreatedBy
    @NotBlank
    private String user;

    @NotBlank
    private String content;
}
