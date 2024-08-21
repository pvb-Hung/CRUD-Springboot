package vnua.fita.sbcrudrestful.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EmployeeRequest {
	@NotBlank(message = "Employee number is mandatory")
    private String empNo;

    @NotBlank(message = "Employee name is mandatory")
    @Size(min = 2, max = 100, message = "Employee name must be between 2 and 100 characters")
    private String empName;

    @NotBlank(message = "Position is mandatory")
    @Size(min = 2, max = 50, message = "Position must be between 2 and 50 characters")
    private String position;
    
    private String photoUrl; // Add this line
    
    private int quantity; // Add this line
    private double price; // Add this line


	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
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
