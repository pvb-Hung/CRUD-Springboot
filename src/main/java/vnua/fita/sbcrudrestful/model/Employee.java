package vnua.fita.sbcrudrestful.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
public class Employee {

    @Id
    private String empNo;

    private String empName;

    private String position;

    private String photoUrl; // New field to store the image URL
    
    private int quantity; // Add this line
    private double price; // Add this line

    public Employee() {
    }

    public Employee(String empNo, String empName, String position, String photoUrl) {
        this.empNo = empNo;
        this.empName = empName;
        this.position = position;
        this.photoUrl = photoUrl; // Initialize the new field
    }

    public String getEmpNo() {
        return empNo;
    }

    public void setEmpNo(String empNo) {
        this.empNo = empNo;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
    
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
