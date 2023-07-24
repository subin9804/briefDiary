package todo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import todo.collections.ERole;
import todo.collections.Role;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);

}