import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employeeToDelete: null, // Trạng thái để giữ id của sản phẩm cần xóa
            showModal: false // Trạng thái để kiểm soát hiển thị của modal
        };
        this.viewEmployee = this.viewEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.confirmDeleteEmployee = this.confirmDeleteEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    viewEmployee(id) {
        this.props.navigation(`/view-employee/${id}`);
    }

    updateEmployee(id) {
        this.props.navigation(`/update-employee/${id}`);
    }

    confirmDeleteEmployee(id) {
        // Hiển thị hộp thoại xác nhận
        this.setState({ employeeToDelete: id, showModal: true });
    }

    deleteEmployee() {
        // Thực hiện xóa sản phẩm sau khi xác nhận
        EmployeeService.deleteEmployee(this.state.employeeToDelete).then(() => {
            this.setState({
                employees: this.state.employees.filter(employee => employee.empNo !== this.state.employeeToDelete),
                employeeToDelete: null,
                showModal: false // Ẩn modal sau khi xóa
            });
        });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    addEmployee() {
        this.props.navigation('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">QUẢN LÝ SẢN PHẨM</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Thêm sản phẩm</button>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Mã sản phẩm</th>
                                <th>Sản phẩm</th>
                                <th>Số lượng còn lại</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(employee =>
                                <tr key={employee.empNo}>
                                    <td>{employee.empNo}</td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.quantity}</td>
                                    <td>{employee.price}</td>
                                    <td>
                                        <button onClick={() => this.updateEmployee(employee.empNo)} className="btn btn-info">Sửa</button>
                                        <button onClick={() => this.confirmDeleteEmployee(employee.empNo)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Xóa</button>
                                        <button onClick={() => this.viewEmployee(employee.empNo)} className="btn btn-info" style={{ marginLeft: "10px" }}>Chi tiết</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modal xác nhận */}
                {this.state.showModal && (
                    <div style={modalOverlayStyle}>
                        <div style={modalContentStyle}>
                            <h4>Bạn có chắc chắn muốn xóa sản phẩm này không?</h4>
                            <div>
                                <button onClick={this.deleteEmployee} className="btn btn-danger">Đồng ý</button>
                                <button onClick={this.closeModal} className="btn btn-secondary" style={{ marginLeft: "10px" }}>Hủy</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

// Style cho modal overlay
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

// Style cho modal content
const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.25)'
};

export default withHook(ListEmployeeComponent);
