import React from 'react';
// import '../css/user_reg.css'
import { useNavigate, Link } from 'react-router-dom'; 

const RegistrationPage = () => {
    const navigate = useNavigate(); 

    const setActiveButton = (buttonClass) => {
        if (buttonClass === 'button1') {
            navigate('/reg_user'); 
        } else if (buttonClass === 'button2') {
            navigate('/reg_owner'); 
        }
    };

    const redirectToLoginPage = (e) => {
        e.preventDefault(); 
        navigate('/login'); 
    };

    return (
        <div className="reg_body">
            <header>
                <Link to='/reg_user'> <button className="header_button button1"  onClick={() => setActiveButton('button1')}>As User</button></Link>
              
                <Link to='/reg_owner'><button className="header_button button2" onClick={setActiveButton('button2')}>
                As Gym Owner
                </button></Link>
            </header>
            <main>
                <h2>Create Your Account</h2>
                <form id="registration_form" className="register_user">
                    <input pattern="[A-Za-z\s]+" placeholder="Name" id="name" autoComplete="off" required />
                    <input type="email" placeholder="Email Address" id="email" autoComplete="off" required />
                    
                    <input placeholder="Username" id="username" autoComplete="off" required />
                    <input type="password" placeholder="Password" id="password" required autoComplete="off" />
                    <input type="password" placeholder="Confirm Password" id="confirmPassword" required autoComplete="off" />
                    <input type="number" placeholder="Age" min="10" max="100" id="ageForm" required />
                    <section className="rad">
                        
                        <input type="radio" id="male" value="male" name="gender" required />
                        <label className='la'>Male</label>
                        <input type="radio" id="female" value="female" name="gender" required />
                        <label>Female</label>
                    </section>
                    <button className="user_button" onClick={redirectToLoginPage}>
                        Sign up
                    </button>
                </form>
            </main>
        </div>
    );
};

export default RegistrationPage;