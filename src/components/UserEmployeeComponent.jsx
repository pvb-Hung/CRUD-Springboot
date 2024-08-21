import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';

class UserEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
        this.viewEmployee = this.viewEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    viewEmployee(id) {
        this.props.navigation(`/view-employee/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Danh sách sản phẩm</h2>
                <div className="row">
                    {this.state.employees.map(employee =>
                        <div key={employee.empNo} className="col-md-3">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-img-container" style={{ height: '200px', overflow: 'hidden' }}>
                                    {employee.photoUrl ? (
                                        <img 
                                            src={`http://localhost:8080${employee.photoUrl}`} 
                                            alt={`${employee.empName}`} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                    ) : (
                                        <div className="no-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#f0f0f0' }}>
                                            No photo available
                                        </div>
                                    )}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{employee.empName}</h5>
                                    <p className="card-text">Mã sản phẩm: {employee.empNo}</p>
                                    <p className="card-text">Giá: ${employee.price}</p>
                                    <button onClick={() => this.viewEmployee(employee.empNo)} className="btn btn-info">Chi tiết</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withHook(UserEmployeeComponent);
