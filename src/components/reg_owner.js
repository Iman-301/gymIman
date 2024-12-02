import React from 'react';
import '../css/user_reg.css'; 
import { useNavigate, Link } from 'react-router-dom'; 

const OwnerRegistrationPage = () => {
   
    const redirectToLoginPage = (e) => {
        e.preventDefault(); 
        navigate('/login'); 
    };

    const navigate = useNavigate(); 

    const setActiveButton = (buttonClass) => {
        if (buttonClass === 'button1') {
            navigate('/reg_user'); 
        } else if (buttonClass === 'button2') {
            navigate('/reg_owner'); 
        }
    };


    const maskPassword = (input) => {
        // Implement maskPassword functionality here
    };

    return (
        <div className="reg_body">
             <header>
                <Link to='/reg_user'> <button className="header_button button1"  onClick={() => setActiveButton('button1')}>As User</button></Link>
              
                <Link to='/reg_owner'><button className="header_button button2" onClick={setActiveButton(this)}>
                As Gym Owner
                </button></Link>
            </header>
            <main>
                <h2>Create Your Account</h2>
                <form id="registration_form" className="register_user">
                    <input  placeholder="Gym Name" id="name" autoComplete="off" required />
                    <input type="email" placeholder="Email Address" id="email" autoComplete="off" required />
                    <input placeholder="Username" id="username" autoComplete="off" required />
                    <input type="password" placeholder="Password" id="password" required autoComplete="off" onInput={(e) => maskPassword(e.target)} />
                    <input type="password" placeholder="Confirm Password" id="confirmPassword" required autoComplete="off" onInput={(e) => maskPassword(e.target)} />
                    <button className="user_button" onClick={redirectToLoginPage}>
                        Sign up
                    </button>
                </form>
            </main>
        </div>
    );
};

export default OwnerRegistrationPage;