import React, { useEffect } from 'react';
import '../css/go_checkout.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo, faMapMarker, faAddressBook, faTrash, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import e1 from '../images/e1.jpg';
import e2 from '../images/e2.jpg';
import e3 from '../images/e3.jpg';

const VisitGyms = () => {
  useEffect(() => {
    document.querySelectorAll('.delete-icon').forEach(icon => {
      icon.addEventListener('click', () => {
        icon.parentElement.remove();
      });
    });
  }, []);

  return (
    <div>
      <main>
      <h2>I will visit</h2>
        <div className="list-item">
          <div>
            
          </div>
          <img src={e1} alt="gym poster" className='image1'/>
          <div className="info">
            <h4>Gym Name</h4>
            <p>Address</p>
          </div>
          <div className="delete-icon">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <div className="list-item">
          <img src={e2} alt="gym poster" />
          <div className="info">
            <h4>Gym Name</h4>
            <p>Address</p>
          </div>
          <div className="delete-icon">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <div className="list-item">
          <img src={e3} alt="gym poster" />
          <div className="info">
            <h4>Gym Name</h4>
            <p>Address</p>
          </div>
          <div className="delete-icon">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <div className="list-item">
          <img src={e1} alt="gym poster"/>
          <div className="info">
            <h4>Gym Name</h4>
            <p>Address</p>
          </div>
          <div className="delete-icon">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </main>
      <footer>
  <Link to="/gym_list"><FontAwesomeIcon icon={faHouse} /></Link>
  <Link to="/about-gym"><FontAwesomeIcon icon={faCircleInfo} /></Link>
  <Link to="/go_checkout"><FontAwesomeIcon icon={faMapMarker} /></Link>
  <Link to="/contact"><FontAwesomeIcon icon={faAddressBook} /></Link>
  <Link to="/logout"><FontAwesomeIcon icon={faRightFromBracket} /></Link>
</footer>
 
    </div>
  );
};

export default VisitGyms;