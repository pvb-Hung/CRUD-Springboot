package vnua.fita.sbcrudrestful.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import vnua.fita.sbcrudrestful.model.Order;
import vnua.fita.sbcrudrestful.model.OrderDetail;
import vnua.fita.sbcrudrestful.repository.OrderDetailRepository;
import vnua.fita.sbcrudrestful.repository.OrderRepository;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public Order createOrder(Order order, List<OrderDetail> orderDetails) {
        Order savedOrder = orderRepository.save(order);
        for (OrderDetail detail : orderDetails) {
            detail.setOrderId(savedOrder.getOrderId());
            orderDetailRepository.save(detail);
        }
        return savedOrder;
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<OrderDetail> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }

    public Order updateOrderStatus(Long orderId, int status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByStatus(int status) {
        return orderRepository.findByStatus(status);
    }
    
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
    

    public List<Object[]> getAllOrdersWithUsername() {
        return orderRepository.findAllOrdersWithUsername();
    }
    
    public List<Object[]> getOrdersWithUsernameByDateRange(String startDate, String endDate) {
        return orderRepository.findOrdersWithUsernameByDateRange(startDate, endDate);
    }
}
