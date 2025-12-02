import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ChildWealth from './components/ChildWealth';
import HealthProtection from './components/HealthProtection';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-cream-50 text-navy-900 font-sans selection:bg-gold-400 selection:text-navy-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <ChildWealth />
      <HealthProtection />
      <About />
      <Footer />
    </div>
  );
}

export default App;
