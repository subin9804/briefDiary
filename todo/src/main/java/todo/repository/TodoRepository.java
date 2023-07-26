package todo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import todo.collections.Diary;
import todo.collections.Todo;

import java.util.List;

public interface TodoRepository extends MongoRepository<Todo, String> {

    List<Todo> findAllByUser (String user);

    List<Todo> findAllByUserAndDate(String user, String date);

}
