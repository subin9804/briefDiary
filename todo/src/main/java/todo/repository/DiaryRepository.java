package todo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import todo.collections.Diary;

import java.util.Date;
import java.util.List;

public interface DiaryRepository extends MongoRepository<Diary, String> {

    List<Diary> findAllByUser (String user);

    List<Diary> findAllByUserAndDate(String user, Date date);
}
