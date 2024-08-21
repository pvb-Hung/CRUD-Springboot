import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [role, setRole] = useState(null);
    const [homeLink, setHomeLink] = useState('/');

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.username);
            const userRole = AuthService.getCurrentUserRole();
            setRole(userRole);

            if (userRole === 0) {
                setHomeLink('/employee');
            } else if (userRole === 1) {
                setHomeLink('/user');
            }
        }
    }, []);

    const logout = () => {
        AuthService.logout();
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <header style={styles.header}>
            <nav style={styles.navbar}>
                <div>
                    <Link to={homeLink} style={styles.brand}>React CRUD Web</Link>
                </div>
                <div style={styles.navItems}>
                    {isLoggedIn && role === 0 && (
                        <>
                            
                            <button style={styles.button} onClick={() => navigate('/order-manage')}>Quản lý đơn hàng</button>
                        </>
                    )}
                    {isLoggedIn && role === 1 && (
                        <button style={styles.button} onClick={() => navigate('/cart')}>Giỏ hàng</button>
                    )}
                    {!isLoggedIn ? (
                        <>
                            <button style={styles.button} onClick={() => navigate('/login')}>Đăng nhập</button>
                            <button style={styles.button} onClick={() => navigate('/register')}>Đăng ký </button>
                        </>
                    ) : (
                        <>
                            <span style={styles.welcome}>Welcome, {username}</span>
                            <button style={styles.button} onClick={logout}>Đăng xuất</button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#343a40',
        padding: '10px 20px',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brand: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    navItems: {
        display: 'flex',
        gap: '10px',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '5px 10px',
        textDecoration: 'underline',
    },
    welcome: {
        color: '#fff',
        marginRight: '15px',
        fontSize: '1rem',
    },
};

export default HeaderComponent;
