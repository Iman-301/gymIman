import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo, faAddressBook, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import '../css/gym_list.css'
import g1 from '../images/g1.jpg';
import g2 from '../images/g2.jpg';
import g3 from '../images/g3.jpg';
import g4 from '../images/g4.jpg';
import g5 from '../images/g5.jpg';

function GymList() {
  return (
    <div className='main_div'>
      
        <h2 className="head">PeakPowerForge</h2>
      
      <main className="lst">
        <div className="container">
        <Link to="/about-gym"> {}
            <img src={g1} alt="Gym1" />
            <h3>Gym Name 1</h3>
          </Link>
        </div>
        <div className="container">
        <Link to="/about-gym"> {}
            <img src={g2} alt="Gym2" />
            <h3>Gym Name 2</h3>
          </Link>
        </div>
        <div className="container">
        <Link to="/about-gym"> {}
            <img src={g3} alt="Gym2" />
            <h3>Gym Name 3</h3>
          </Link>
        </div>
        <div className="container">
        <Link to="/about-gym"> {}
            <img src={g4} alt="Gym2" />
            <h3>Gym Name 4</h3>
          </Link>
        </div>
        <div className="container">
        <Link to="/about-gym"> {}
            <img src={g5} alt="Gym2" />
            <h3>Gym Name 5</h3>
          </Link>
        </div>
        <div className="container">
        <Link to="/about-gym"> {}
            <img src={g2} alt="Gym2" />
            <h3>Gym Name 2</h3>
          </Link>
        </div>
        <div className="container">
        <Link to="/about-gym"> {}
            <img src={g2} alt="Gym2" />
            <h3>Gym Name 2</h3>
          </Link>
        </div>
        <div className="container">
        <Link to="/about-gym"> {}
            <img src={g2} alt="Gym2" />
            <h3>Gym Name 2</h3>
          </Link>
        </div>
        
      </main>
      <footer>
  <Link to="/gym_list"><FontAwesomeIcon icon={faHouse} /></Link>
  <Link to="/about-gym"><FontAwesomeIcon icon={faCircleInfo} /></Link>
  <Link to="/go_checkout"><FontAwesomeIcon icon={faMapMarker} /></Link>
  <Link to="/contact"><FontAwesomeIcon icon={faAddressBook} /></Link>
  <Link to="/log_out"><FontAwesomeIcon icon={faRightFromBracket} /></Link>
</footer>
    </div>
  );
}

export default GymList;