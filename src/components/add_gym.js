import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/add.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AddGym = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [services, setServices] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const loadImage = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const addServiceField = (event) => {
    event.preventDefault();
    setServices([...services, { title: '', description: '' }]);
  };

  const removeServiceField = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const addPricingField = (event) => {
    event.preventDefault();
    setPricing([...pricing, { name: '', price: '', details: '' }]);
  };

  const removePricingField = (index) => {
    setPricing(pricing.filter((_, i) => i !== index));
  };

  const addFAQField = (event) => {
    event.preventDefault();
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const removeFAQField = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="reg_body">
      <h1>PeakPowerForge</h1>
      <main>
        <h4>Add and Edit your Gym Information</h4>
        <section>
          <div className="upload-container">
            {images.map((image, index) => (
              <div
                key={index}
                className="upload_box"
                onClick={() => document.getElementById(`fileInput${index}`).click()}
              >
                <input
                  type="file"
                  id={`fileInput${index}`}
                  accept="image/*"
                  onChange={(e) => loadImage(e, index)}
                  style={{ display: 'none' }}
                />
                {image && <img src={image} alt={`Upload ${index}`} className="main_image" />}
              </div>
            ))}
          </div>
          <form>
            <h1>Facilities</h1>
            <input type="text" placeholder="Gym Name" id="name" autoComplete="off" required />
            <textarea id="description" name="description" rows="5" placeholder="Description of facilities"></textarea>

            <h1>Service</h1>
            <div className="service" id="service-container">
              {services.map((service, index) => (
                <div key={index}>
                  <input type="text" placeholder="Enter service title" value={service.title} />
                  <textarea rows="3" placeholder="Enter service description" value={service.description}></textarea>
                  <button type="button" onClick={() => removeServiceField(index)}>Remove Service</button>
                </div>
              ))}
            </div>
            <button onClick={addServiceField}>Add Service</button>

            <h1>Pricing</h1>
            <div className="pricing" id="pricing-container">
              {pricing.map((plan, index) => (
                <div key={index}>
                  <input type="text" placeholder="Enter plan name" value={plan.name} />
                  <input type="text" placeholder="Enter plan price" value={plan.price} />
                  <textarea rows="3" placeholder="Enter plan details" value={plan.details}></textarea>
                  <button type="button" onClick={() => removePricingField(index)}>Remove Pricing Plan</button>
                </div>
              ))}
            </div>
            <button onClick={addPricingField} className='blue_btn'>Add pricing plan</button>

            <h1>FAQ</h1>
            <div className="fq" id="faq-container">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <input type="text" placeholder="Enter the question" value={faq.question} />
                  <textarea rows="3" placeholder="Enter the answer" value={faq.answer}></textarea>
                  <button type="button" onClick={() => removeFAQField(index)}>Remove FAQ</button>
                </div>
              ))}
            </div>
            <button onClick={addFAQField}>Add FAQ</button>
          </form>
        </section>
      </main>
    
      <footer>
        <Link to='/add_gym'><FontAwesomeIcon icon={faPlusCircle} /></Link>

    <Link to="/log_out"><FontAwesomeIcon icon={faRightFromBracket} /></Link>
    </footer>
       
    </div>
  );
};

export default AddGym;