import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleLogin(event) {
        event.preventDefault();

        this.setState({
            message: '',
            loading: true
        });

        AuthService.login(this.state.username, this.state.password).then(
            () => {
                const role = AuthService.getCurrentUserRole();
                if (role === 0) {
                    this.props.navigate('/employee');
                } else if (role === 1) {
                    this.props.navigate('/user');
                }
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <form onSubmit={this.handleLogin}>
                        <div style={styles.formGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <button
                                style={styles.button}
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span style={styles.spinner}></span>
                                )}
                                <span>Đăng nhập </span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div style={styles.formGroup}>
                                <div style={styles.alert}>
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </form>
                    <div style={styles.formGroup}>
                        <a href="/register">Bạn chưa có tài khoản ? Đăng ký ngay</a>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    },
    card: {
        width: '300px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    },
    spinner: {
        marginRight: '5px',
        width: '16px',
        height: '16px',
        border: '2px solid #f3f3f3',
        borderTop: '2px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    alert: {
        color: 'red',
        fontSize: '14px',
    },
};

export default function(props) {
    const navigate = useNavigate();
    return <LoginPage {...props} navigate={navigate} />;
}
