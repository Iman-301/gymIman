import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo, faAddressBook, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import '../css/about_gym.css';
import e1 from '../images/e1.jpg';
import e2 from '../images/e2.jpg';
import e3 from '../images/e3.jpg';

function AboutUser() {
  return (
    <div className='main_div'>
    
      
      <main>
      <h2>Gym Facilities and Services</h2>
        <p>
          "Welcome to Peak Fitness Center, where your fitness journey begins! Nestled in the heart of the bustling city, our gym is a haven for fitness enthusiasts of all levels. Step into our modern facility equipped with top-of-the-line cardio machines, weight training equipment, and dedicated areas for functional training. Our certified trainers are here to guide you through personalized workout plans tailored to your goals, whether you're aiming to build strength, shed pounds, or enhance your overall well-being.
        </p>
        <p>
          In addition to our fitness services, we provide nutritional guidance to help you fuel your body for success. Our wellness programs focus on holistic health, offering workshops and seminars on topics ranging from stress management to sleep optimization. Join our vibrant community of like-minded individuals committed to achieving their fitness goals in a supportive and welcoming environment. Experience the difference at Peak Fitness Center, where every workout brings you closer to your peak potential."
        </p>
        <div className="pics">
          <img src={e1} alt="Equipment 1" />
          <img src={e2} alt="Equipment 2" />
          <img src={e3} alt="Equipment 3" />
        </div>
        <ul className="lst">
          <li><strong>Personal Training: </strong>Tailored workout plans and individual coaching sessions with certified trainers to help you reach your fitness goals.</li>
        </ul>
        <ul className="lst">
          <li><strong>Group Fitness Classes:</strong> Diverse classes such as yoga, HIIT, spinning, Zumba, and more led by experienced instructors for a fun and motivating workout experience.</li>
        </ul>
        <ul className="lst">
          <li><strong>Cardio Equipment:</strong> Access to a variety of cardio machines like treadmills, ellipticals, and stationary bikes for cardiovascular workouts.</li>
        </ul>
        
          <h2>Gym Membership Pricing</h2>
          <div className="pricing">
            <div className="plan">
              <h4>Basic Plan</h4>
              <ul>
                <li>1000 birr per month</li>
                <li>Access to gym equipment</li>
              </ul>
            </div>
            <div className="plan">
              <h4>Premium Plan</h4>
              <ul>
                <li>2000 birr per month</li>
                <li>Access to gym equipment + classes</li>
              </ul>
            </div>
            <div className="plan">
              <h4>Platinum Plan</h4>
              <ul>
                <li>3000 birr per month</li>
                <li>Access to gym equipment, classes, and personal trainer</li>
              </ul>
            </div>
          </div>
        
        <div className="bt">
          <button>
            <Link to='/go_checkout'>
            Add to visit
            </Link>
         
          </button>
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

export default AboutUser;