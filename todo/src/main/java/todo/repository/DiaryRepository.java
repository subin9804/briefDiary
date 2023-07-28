package todo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import todo.collections.Diary;

import java.util.Date;
import java.util.List;

public interface DiaryRepository extends MongoRepository<Diary, String> {

    List<Diary> findByUser (String user);

    Diary findByUserAndDate(String user, Date date);
}
