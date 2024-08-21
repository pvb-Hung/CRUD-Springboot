package vnua.fita.sbcrudrestful.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import vnua.fita.sbcrudrestful.dto.OrderRequest;
import vnua.fita.sbcrudrestful.model.Order;
import vnua.fita.sbcrudrestful.model.OrderDetail;
import vnua.fita.sbcrudrestful.service.OrderService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Tạo mới một đơn hàng
    @PostMapping("/create")
    public Order createOrder(@RequestBody OrderRequest orderRequest) {
        Order order = orderRequest.getOrder();
        List<OrderDetail> orderDetails = orderRequest.getOrderDetails();
        return orderService.createOrder(order, orderDetails);
    }

    // Lấy thông tin đơn hàng theo ID
    @GetMapping("/{orderId}")
    public Order getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId);
    }

    // Lấy danh sách chi tiết đơn hàng theo ID đơn hàng
    @GetMapping("/details/{orderId}")
    public List<OrderDetail> getOrderDetailsByOrderId(@PathVariable Long orderId) {
        return orderService.getOrderDetailsByOrderId(orderId);
    }

    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(@PathVariable Long orderId, @RequestParam int status) {
        return orderService.updateOrderStatus(orderId, status);
    }

    @GetMapping("/status/{status}")
    public List<Order> getOrdersByStatus(@PathVariable int status) {
        return orderService.getOrdersByStatus(status);
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/all-with-username")
    public List<Object[]> getAllOrdersWithUsername() {
        return orderService.getAllOrdersWithUsername();
    }
    
 // Lấy đơn hàng theo khoảng thời gian hoặc lấy tất cả đơn hàng nếu không có khoảng thời gian
    @GetMapping("/filter-by-date-range")
    public List<Object[]> getOrdersWithUsernameByDateRange(@RequestParam String startDate, @RequestParam String endDate) {
        return orderService.getOrdersWithUsernameByDateRange(startDate, endDate);
    }
}
