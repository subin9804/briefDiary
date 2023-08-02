package todo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import todo.collections.Todo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TodoRepository extends MongoRepository<Todo, String> {

    Optional<Todo> findById(String id);

    List<Todo> findByUser(String user);

    List<Todo> findByUserAndDate(String user, LocalDate date);

}
