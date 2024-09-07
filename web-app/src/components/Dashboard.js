import React, { useState, useEffect } from 'react';

const Dashboard = ({ setAuth }) => {
    const [name, setName] = React.useState("");
    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const parseRes = await response.json();
            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }
    React.useEffect(() => {
        getName();
    }, []);
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    };
        return (
            <div>
                <h1>Dashboard {name}</h1>
                <button className='btn btn-primary' onClick={(e) => logout(e)}>Logout</button>
            </div>
        )
};

export default Dashboard;