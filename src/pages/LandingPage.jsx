import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ChildWealth from '../components/ChildWealth';
import HealthProtection from '../components/HealthProtection';
import About from '../components/About';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <ChildWealth />
      <HealthProtection />
      <About />
      <Footer />
    </>
  );
}

export default LandingPage;
