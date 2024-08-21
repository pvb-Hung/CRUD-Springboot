import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService';
import withHook from '../components/withHook';

const OrderManageComponent = () => {
    const [orders, setOrders] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchAllOrdersWithUsername();
    }, []);

    const fetchAllOrdersWithUsername = () => {
        axios.get('http://localhost:8080/orders/all-with-username', {
            headers: AuthService.authHeader()
        })
        .then(response => {
            setOrders(response.data);
            calculateTotalAmount(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching orders with username!', error);
        });
    };

    const fetchOrdersWithUsernameByDateRange = (start, end) => {
        axios.get('http://localhost:8080/orders/filter-by-date-range', {
            headers: AuthService.authHeader(),
            params: { startDate: start, endDate: end }
        })
        .then(response => {
            setOrders(response.data);
            calculateTotalAmount(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching orders by date range!', error);
        });
    };

    const handleDateChange = () => {
        if (startDate && endDate) {
            fetchOrdersWithUsernameByDateRange(startDate, endDate);
        } else {
            fetchAllOrdersWithUsername();
        }
    };

    const calculateTotalAmount = (orders) => {
        const total = orders.reduce((sum, order) => sum + parseFloat(order[2]), 0);
        setTotalAmount(total.toFixed(2));
    };

    return (
        <div>
            <h2 className="text-center">Quản lý đơn hàng</h2>
            <div className="row">
                <div className="col-md-4">
                    <label>Từ ngày:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4">
                    <label>Đến ngày:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4 text-right">
                    <button className="btn btn-primary mt-4" onClick={handleDateChange}>Lọc đơn hàng</button>
                </div>
                <div className="col-md-12 text-right">
                    <h4>Tổng tiền: ${totalAmount}</h4>
                </div>
            </div>
            <div className="row mt-3">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Tên người dùng</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tổng tiền</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Ghi chú</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order[0]}>
                                <td>{order[0]}</td>
                                <td>{order[7]}</td>
                                <td>{new Date(order[1]).toLocaleString()}</td>
                                <td>{order[2]}</td>
                                <td>{order[3]}</td>
                                <td>{order[4]}</td>
                                <td>{order[5]}</td>
                                <td>{order[6] === 0 ? "Chờ xử lý" : "Đã bán"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default withHook(OrderManageComponent);
