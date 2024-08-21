// ViewEmployeeComponent.jsx
import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';
import AuthService from '../services/AuthService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id,
            employee: {}
        };
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        }).catch(error => {
            console.error("Error fetching employee:", error);
        });
    }

    addToCart() {
        let cart = AuthService.loadCart();
        const existingEmployee = cart.find(item => item.empNo === this.state.employee.empNo);
        if (existingEmployee) {
            cart = cart.map(item =>
                item.empNo === this.state.employee.empNo
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            cart.push({ ...this.state.employee, quantity: 1 });
        }
        AuthService.saveCart(cart);
        alert('Sản phẩm đã đường thêm vào giỏ hàng');
    }

    render() {
        return (
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">CHI TIẾT SẢN PHẨM
                    </h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Mã sản phẩm
                            </label>
                            <div>{this.state.employee.empNo}</div>
                        </div>
                        <div className="row">
                            <label>Sản phẩm</label>
                            <div>{this.state.employee.empName}</div>
                        </div>
                        
                        <div className="row">
                            <label>Ảnh minh họa</label>
                            <div>
                                {this.state.employee.photoUrl ? (
                                    <img src={`http://localhost:8080${this.state.employee.photoUrl}`} alt={`${this.state.employee.empName}`} style={{ width: '100px', height: '100px' }} />
                                ) : (
                                    <div>No photo available</div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <label>Số lượng còn lại</label>
                            <div>{this.state.employee.quantity}</div>
                        </div>
                        <div className="row">
                            <label>Giá</label>
                            <div>{this.state.employee.price}</div>
                        </div>
                        <button className="btn btn-primary" onClick={this.addToCart}>Thêm vào Giỏ hàng</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withHook(ViewEmployeeComponent);
