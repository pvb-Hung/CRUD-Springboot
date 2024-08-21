import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            empNo: '',
            empName: '',
            position: '',
            photoUrl: '',
            quantity: 0,
            price: 0.0
        };

        this.changeEmployeeNoHandler = this.changeEmployeeNoHandler.bind(this);
        this.changeEmployeeNameHandler = this.changeEmployeeNameHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.changeQuantityHandler = this.changeQuantityHandler.bind(this); // Add this line
        this.changePriceHandler = this.changePriceHandler.bind(this); // Add this line
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
        this.changePhotoHandler = this.changePhotoHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== '_add') {
            EmployeeService.getEmployeeById(this.state.id).then(res => {
                let employee = res.data;
                this.setState({
                    empNo: employee.empNo,
                    empName: employee.empName,
                    position: employee.position,
                    photoUrl: employee.photoUrl,
                    quantity: employee.quantity,
                    price: employee.price
                });
            });
        }
    }

    saveOrUpdateEmployee(e) {
        e.preventDefault();
        let employee = {
            empNo: this.state.empNo,
            empName: this.state.empName,
            position: this.state.position,
            photoUrl: this.state.photoUrl,
            quantity: this.state.quantity, // Include quantity
            price: this.state.price // Include price
        };

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(() => {
                this.props.navigation('/employee');
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(() => {
                this.props.navigation('/employee');
            });
        }
    }

    changeEmployeeNoHandler(event) {
        this.setState({ empNo: event.target.value });
    }

    changeEmployeeNameHandler(event) {
        this.setState({ empName: event.target.value });
    }

    changePositionHandler(event) {
        this.setState({ position: event.target.value });
    }

    changeQuantityHandler(event) {
        this.setState({ quantity: event.target.value });
    }

    changePriceHandler(event) {
        this.setState({ price: event.target.value });
    }

    changePhotoHandler(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        EmployeeService.uploadPhoto(formData).then(response => {
            this.setState({ photoUrl: response.data });
        }).catch(error => {
            console.error('Error uploading photo:', error);
            alert('An error occurred while uploading the photo. Please try again.');
        });
    }

    cancel() {
        this.props.navigation('/employee');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">THÊM SẢN PHẨM</h3>;
        } else {
            return <h3 className="text-center">SỬA SẢN PHẨM</h3>;
        }
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            {this.getTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Mã sản phẩm</label>
                                        <input
                                            placeholder="Employee No"
                                            name="empNo"
                                            className="form-control"
                                            value={this.state.empNo}
                                            onChange={this.changeEmployeeNoHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Sản phẩm
                                        </label>
                                        <input
                                            placeholder="Employee Name"
                                            name="empName"
                                            className="form-control"
                                            value={this.state.empName}
                                            onChange={this.changeEmployeeNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Loại sản phẩm</label>
                                        <input
                                            placeholder="Position"
                                            name="position"
                                            className="form-control"
                                            value={this.state.position}
                                            onChange={this.changePositionHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Số lượng còn lại</label>
                                        <input
                                            placeholder="Quantity"
                                            name="quantity"
                                            type="number"
                                            className="form-control"
                                            value={this.state.quantity}
                                            onChange={this.changeQuantityHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá</label>
                                        <input
                                            placeholder="Price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            value={this.state.price}
                                            onChange={this.changePriceHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Ảnh minh họa</label>
                                        <input type="file" name="photo" className="form-control" onChange={this.changePhotoHandler} />
                                    </div>
                                    {this.state.photoUrl && (
                                        <div className="form-group">
                                            <img src={this.state.photoUrl} alt="Employee Photo" style={{ width: '100px', height: '100px' }} />
                                        </div>
                                    )}
                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Lưu</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Hủy</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withHook(CreateEmployeeComponent);
