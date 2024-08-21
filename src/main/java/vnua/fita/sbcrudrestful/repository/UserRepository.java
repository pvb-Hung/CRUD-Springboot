package vnua.fita.sbcrudrestful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vnua.fita.sbcrudrestful.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
}
