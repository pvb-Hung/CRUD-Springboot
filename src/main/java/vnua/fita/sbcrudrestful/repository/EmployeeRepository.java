package vnua.fita.sbcrudrestful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import vnua.fita.sbcrudrestful.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {
}
