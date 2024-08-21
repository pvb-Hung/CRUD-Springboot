package vnua.fita.sbcrudrestful.dto;

import vnua.fita.sbcrudrestful.model.Order;
import vnua.fita.sbcrudrestful.model.OrderDetail;
import java.util.List;

public class OrderRequest {
    private Order order;
    private List<OrderDetail> orderDetails;

    // Getters and setters
    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
