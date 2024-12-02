import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'; // Correct import for Facebook icon

import '../css/landingPage.css';

const LandingPage = () => {
    const navigate = useNavigate(); 

    const redirectToRegistration = () => {
        navigate('/reg_user'); 
    };

    return (
        <div>
            <header>
                <h4 className="head">PeakPowerForge</h4>
                <section className="iconspace">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="mailto:imanibrahim301@gmail.com">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                    <a href="tel:555-555-5555">
                        <FontAwesomeIcon icon={faMobileAlt} />
                    </a>
                </section>
            </header>
            <section className="land">
                <main>
                    <p className="quo">"Strength is not about never<br/> feeling weak, but about what<br/> happens when you push<br/> past that weakness."</p>
                    <button className="button-1" onClick={redirectToRegistration}>
                        Get Started
                    </button>


                    <p className="log">
                        I have an account already{' '}
                        <Link to="/login">log in</Link> {}
                    </p>
                </main>
            </section>
        </div>
    );
};
export default LandingPage;