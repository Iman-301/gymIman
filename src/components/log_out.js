import React from 'react';
import '../css/log_out.css';  
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';  

const LogOut = () => {
    return (
       <div>
            
            <h2 className="head">PeakPowerForge</h2>
            
            <main>
                <h5>Username</h5>
                <h5>Email</h5>
                <div className="buttons">
                    <button>Change Email</button>
                    <button>Change Password</button>
                    <button>Change Username</button>
                </div>
                <div className="but">
                    <div className="button-2">
                    <Link to="/login"><FontAwesomeIcon icon={faRightFromBracket} /></Link>
                        <h6>Log out</h6>
                    </div>
                    <div className="button-3">
                    <Link to="/login"><FontAwesomeIcon icon={faTrash} /></Link>
                        <h6>Delete account</h6>
                    </div>
                </div>
            </main>
            <footer>
        <Link to='/add_gym'><FontAwesomeIcon icon={faPlusCircle} /></Link>

    <Link to="/log_out"><FontAwesomeIcon icon={faRightFromBracket} /></Link>
    </footer>
       </div>
    );
}

export default LogOut;