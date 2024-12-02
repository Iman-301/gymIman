import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing';
import RegistrationPage from './components/reg_user';
import OwnerRegistrationPage from './components/reg_owner';
import GymList from './components/gym_list';
import AboutUser from './components/about-gym';
import VisitGyms from './components/go_checkout';
import GymWebsite from './components/contact';
import LogOut from './components/log_out';
import AddGym from './components/add_gym';
import LoginPage from './components/login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<LandingPage />} />

        {/* User Registration Page */}
        <Route path="/reg_user" element={<RegistrationPage />} />

        {/* Gym Owner Registration Page */}
        <Route path="/reg_owner" element={<OwnerRegistrationPage />} />

        {/* Gym List Page */}
        <Route path="/gym_list" element={<GymList />} />

        {/* About Gym Page */}
        <Route path="/about-gym" element={<AboutUser />} />

        {/* Visit Gyms Page */}
        <Route path="/go_checkout" element={<VisitGyms />} />

        {/* Contact Page */}
        <Route path="/contact" element={<GymWebsite />} />

        {/* Log Out Page */}
        <Route path="/log_out" element={<LogOut />} />

        {/* Add Gym (Gym Owner Dashboard) */}
        <Route path="/add_gym" element={<AddGym />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
