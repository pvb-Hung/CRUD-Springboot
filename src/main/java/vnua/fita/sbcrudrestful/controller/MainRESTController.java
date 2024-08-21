package vnua.fita.sbcrudrestful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import vnua.fita.sbcrudrestful.dao.EmployeeDAO;
import vnua.fita.sbcrudrestful.model.Employee;
import vnua.fita.sbcrudrestful.dto.EmployeeRequest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/employees")
@CrossOrigin
public class MainRESTController {

    @Autowired
    private EmployeeDAO employeeDAO;

    @GetMapping("")
    public List<Employee> getEmployees() {
        return employeeDAO.getAllEmployees();
    }

    @GetMapping("/{empNo}")
    public ResponseEntity<?> getEmployee(@PathVariable("empNo") String empNo) {
        Employee employee = employeeDAO.getEmployee(empNo);
        if (employee == null) {
            return ResponseEntity.badRequest().body("Employee not found");
        }
        System.out.println("Employee photoUrl: " + employee.getPhotoUrl());
        return ResponseEntity.ok(employee);
    }

    @PostMapping("")
    public ResponseEntity<?> addEmployee(@Valid @RequestBody EmployeeRequest emp) {
        return ResponseEntity.ok(employeeDAO.addEmployee(emp));
    }

    @PutMapping("/{empNo}")
    public ResponseEntity<?> updateEmployee(@PathVariable("empNo") String empNo, @Valid @RequestBody Employee emp, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(result.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage()).collect(Collectors.joining(", ")));
        }

        Employee existingEmp = employeeDAO.getEmployee(empNo);
        if (existingEmp == null) {
            return ResponseEntity.badRequest().body("Employee not found");
        }

        existingEmp.setEmpName(emp.getEmpName());
        existingEmp.setPosition(emp.getPosition());
        existingEmp.setPhotoUrl(emp.getPhotoUrl()); // Update the photoUrl

        Employee updatedEmployee = employeeDAO.updateEmployee(existingEmp);
        return ResponseEntity.ok(updatedEmployee);
    }


    @DeleteMapping("/{empNo}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("empNo") String empNo) {
        Employee employee = employeeDAO.getEmployee(empNo);
        if (employee == null) {
            return ResponseEntity.badRequest().body("Employee not found");
        }

        System.out.println("(Service Side) Deleting employee: " + empNo);

        employeeDAO.deleteEmployee(empNo);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String fileUrl = saveFileAndGetUrl(file);
        return ResponseEntity.ok(fileUrl);
    }

    private String saveFileAndGetUrl(MultipartFile file) {
        String fileName = System.currentTimeMillis() + "-" + file.getOriginalFilename();
        Path filePath = Paths.get("uploads/" + fileName);
        try {
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
        return "/uploads/" + fileName;
    }
}
