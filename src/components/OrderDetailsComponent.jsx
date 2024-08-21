import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService';
import withHook from '../components/withHook';

class OrderDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            orderDetails: []
        };
    }

    componentDidMount() {
        const { orderId } = this.props.params;
        axios.get(`http://localhost:8080/orders/${orderId}`, {
            headers: AuthService.authHeader()
        })
        .then(response => {
            this.setState({ order: response.data });
        })
        .catch(error => {
            console.error('There was an error fetching the order!', error);
        });

        axios.get(`http://localhost:8080/orders/details/${orderId}`, {
            headers: AuthService.authHeader()
        })
        .then(response => {
            this.setState({ orderDetails: response.data });
        })
        .catch(error => {
            console.error('There was an error fetching the order details!', error);
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">CHI TIẾT ĐƠN HÀNG</h2>
                <div className="row">
                    <div className="col-md-8">
                        <h3>Tổng hợp đơn hàng</h3>
                        <ul className="list-group">
    {this.state.orderDetails.map(detail => {
        console.log(detail); // Log từng phần tử để kiểm tra chi tiết
        return (
            <li className="list-group-item" key={detail.orderDetailId}>
                {detail.empNo} x {detail.quantity} = ${detail.price * detail.quantity}
            </li>
        );
    })}
</ul>

                        <h4>Tổng cộng: ${this.state.order.totalAmount}</h4>
                    </div>
                    <div className="col-md-4">
                        <h3>Thông tin chi tiết </h3>
                        <p>Địa chỉ: {this.state.order.address}</p>
                        <p>Số điện thoại: {this.state.order.phone}</p>
                        <p>Ghi chú: {this.state.order.note}</p>
                        <p>Ngày đặt hàng: {new Date(this.state.order.orderDate).toLocaleString()}</p>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default withHook(OrderDetailsComponent);
