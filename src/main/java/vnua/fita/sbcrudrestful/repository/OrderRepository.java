package vnua.fita.sbcrudrestful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vnua.fita.sbcrudrestful.model.Order;

import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	 @Query(value = "SELECT o.order_id, o.order_date, o.total_amount, o.address, o.phone, o.note, o.status, u.username " +
             "FROM Orders o INNER JOIN User u ON o.user_id = u.user_id " +
             "WHERE o.order_date BETWEEN :startDate AND :endDate", nativeQuery = true)
List<Object[]> findOrdersWithUsernameByDateRange(String startDate, String endDate);

	@Query(value = "SELECT o.order_id, o.order_date, o.total_amount, o.address, o.phone, o.note, o.status, u.username " +
            "FROM Orders o INNER JOIN User u ON o.user_id = u.user_id", nativeQuery = true)
List<Object[]> findAllOrdersWithUsername();
	List<Order> findByStatus(int status);
	
}
