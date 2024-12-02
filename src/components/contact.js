import React from 'react';
import { Link } from 'react-router-dom';
import '../css/contact.css';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTelegram } from '@fortawesome/free-brands-svg-icons';  // Brand icons
import { faMobileAlt, faEnvelope, faHouse, faCircleInfo, faMapMarker, faAddressBook, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';  // Solid icons

const GymWebsite = () => {
  return (
    <div class="main_div">
     
        <section className="iconspace">
          <a href="https://www.facebook.com">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="mailto:imanibrahim301@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a href="tel:555-555-5555">
            <FontAwesomeIcon icon={faMobileAlt} />
          </a>
          <a href="@firdi188">
            <FontAwesomeIcon icon={faTelegram} />
          </a>
        </section>
   

      <main>
        <h1>FAQ's</h1>
        <div className="faq-item">
          <h6>What are your membership options?</h6>
          <p>We offer various membership plans including monthly, quarterly, and annual options. Visit our gym for more details.</p>
        </div>

        <div className="faq-item">
          <h6>Do you offer personal training sessions?</h6>
          <p>Yes, we provide personalized training sessions with certified trainers. Contact us to schedule a session.</p>
        </div>

        <div className="faq-item">
          <h6>Can I bring a guest with me to the gym?</h6>
          <p>Guest policies vary based on membership plans. Please check with our staff for more information on guest passes.</p>
        </div>

        <div className="faq-item">
          <h6>What fitness classes do you offer?</h6>
          <p>We offer a variety of fitness classes including yoga, HIIT, spinning, and more. Check our schedule for class timings.</p>
        </div>

        <div className="container">
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="subject">Subject:</label>
            <input type="text" id="subject" name="subject" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <input type="submit" value="Submit" />
          </form>
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
};

export default GymWebsite;
