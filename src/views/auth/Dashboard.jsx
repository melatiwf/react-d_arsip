import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Dashboard() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.get('http://localhost:8000/api/user')
            .then((response) => {
                setUser(response.data);
            });
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
        fetchData();
    }, []);

    const logoutHandler = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post('http://localhost:8000/api/logout')
            .then(() => {
                localStorage.removeItem("token");
                navigate('/login');
            });
    };

    return (
        <div 
            className="container"
            style={{
                marginTop: "50px",
                background: "linear-gradient(135deg, #007bff, #6c757d)", // Gradien biru ke abu-abu
                borderRadius: "15px",
                padding: "30px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" // Shadow untuk kedalaman
            }}
        >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div 
                        className="card border-0 rounded shadow-sm"
                        style={{ backgroundColor: "#ffffff" }}
                    >
                        <div className="card-body text-center">
                            <img
                                src="https://pbs.twimg.com/profile_images/1009053525073014784/JUMDMQ9B_400x400.jpg"
                                alt="logo_dispusipda"
                                className="rounded-circle mb-4"
                                style={{
                                    width: "120px",
                                    height: "120px",
                                    objectFit: "cover",
                                    border: "3px solid #007bff", // Border biru
                                }}
                            />
                            <h3 className="text-uppercase" style={{ fontFamily: "'Lora', serif", fontWeight: "600", color: "#333" }}>
                                Selamat Datang, <strong>{user.name}</strong>
                            </h3>
                            {user.is_administrator === 0 ? (
                                <p className="text-muted" style={{ fontSize: "18px" }}>Sebagai Petugas</p>
                            ) : (
                                <p className="text-muted" style={{ fontSize: "18px" }}>Sebagai Administrator</p>
                            )}
                            <hr />
                            <button
                                onClick={logoutHandler}
                                className="btn btn-lg btn-danger mt-4"
                                style={{
                                    padding: "10px 25px", 
                                    borderRadius: "30px", 
                                    transition: "all 0.3s ease",
                                    fontWeight: "500"
                                }}
                            >
                                LOGOUT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
