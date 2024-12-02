import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/user_reg.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Example imports for icons, modify as needed

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const redirect = (buttonClass) => {
        if (buttonClass === 'but1') {
            navigate('/gym_list'); // Redirect to Gym User page
        } else if (buttonClass === 'but2') {
            navigate('/add_gym'); // Redirect to Gym Owner page
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <main>
            <h2>Login Page</h2>
            <section className="login_info">
                <div className="input-container">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                        
                        placeholder="Username"
                        id="username"
                        autoComplete="off"
                        required
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="input-container">
                    <FontAwesomeIcon icon={faLock} />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        required
                        autoComplete="off"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
            </section>
            <section className="login_button">
                <button className="but1" onClick={() => redirect('but1')}>
                    Gym User
                </button>
                <button className="but2" onClick={() => redirect('but2')}>
                    Gym Owner
                </button>
            </section>
        </main>
    );
};

export default LoginPage;
