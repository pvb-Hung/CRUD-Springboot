package vnua.fita.sbcrudrestful.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Order_Detail")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_detail_id")  // Ánh xạ đúng với cột `order_det_id`
    private Long orderDetailId;

    @Column(name = "order_id")  // Ánh xạ đúng với cột `order_id`
    private Long orderId;

    @Column(name = "empNo")  // Ánh xạ đúng với cột `empNo`
    private String empNo;

    @Column(name = "quantity")  // Ánh xạ đúng với cột `quantity`
    private Integer quantity;

    @Column(name = "price")  // Ánh xạ đúng với cột `price`
    private Double price;
    
    // Getters and Setters
    
    public Long getOrderDetailId() {
        return orderDetailId;
    }

    public void setOrderDetailId(Long orderDetailId) {
        this.orderDetailId = orderDetailId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getEmpNo() {
        return empNo;
    }

    public void setEmpNo(String empNo) {
        this.empNo = empNo;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
