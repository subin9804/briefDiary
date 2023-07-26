package todo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import todo.collections.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

}
