import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

class CartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: AuthService.loadCart()
        };
    }

    incrementQuantity(empNo) {
        let cart = this.state.cart.map(item =>
            item.empNo === empNo
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        this.setState({ cart });
        AuthService.saveCart(cart);
    }

    decrementQuantity(empNo) {
        let cart = this.state.cart.map(item =>
            item.empNo === empNo
                ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                : item
        );
        this.setState({ cart });
        AuthService.saveCart(cart);
    }

    removeItem(empNo) {
        let cart = this.state.cart.filter(item => item.empNo !== empNo);
        this.setState({ cart });
        AuthService.saveCart(cart);
    }

    calculateTotal() {
        return this.state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Giở hàng</h2>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Mã sản phẩm </th>
                                <th>Sản phẩm
                                </th>
                                
                                <th>Số lượng
                                </th>
                                <th>Giá</th>
                                <th>Tổng cộng</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cart.map(employee =>
                                <tr key={employee.empNo}>
                                    <td>{employee.empNo}</td>
                                    <td>{employee.empName}</td>
                                    
                                    <td>
                                        <div className="input-group">
                                            <button onClick={() => this.decrementQuantity(employee.empNo)} className="btn btn-danger">-</button>
                                            <input type="text" className="form-control text-center" value={employee.quantity} readOnly />
                                            <button onClick={() => this.incrementQuantity(employee.empNo)} className="btn btn-success">+</button>
                                        </div>
                                    </td>
                                    <td>{employee.price}</td>
                                    <td>{(employee.price * employee.quantity).toFixed(2)}</td>
                                    <td>
                                        <button onClick={() => this.removeItem(employee.empNo)} className="btn btn-warning">Xóa đơn hàng</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <h3>Tổng tiền: ${this.calculateTotal()}</h3>
                    <button className="btn btn-primary" onClick={() => this.props.navigate('/checkout')}>Thanh toán</button>
                </div>
            </div>
        );
    }
}

export default function(props) {
    const navigate = useNavigate();
    return <CartComponent {...props} navigate={navigate} />;
}
