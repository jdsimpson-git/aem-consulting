import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cream-100 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">
              AEM <span className="text-gold-500">Consulting</span>
            </h3>
            <p className="text-gray-600 max-w-sm mb-6 leading-relaxed">
              Empowering families and entrepreneurs to build financial security and leave a lasting legacy through strategic insurance solutions.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={20} />} href="#" />
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-navy-900 font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><FooterLink href="#">Home</FooterLink></li>
              <li><FooterLink href="#">About Alicia</FooterLink></li>
              <li><FooterLink href="#">Services</FooterLink></li>
              <li><FooterLink href="#">Strategy Session</FooterLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-navy-900 font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-teal-500" />
                <a href="mailto:contact@aemconsulting.com" className="hover:text-gold-500 transition-colors">contact@aemconsulting.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-teal-500" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-teal-500 mt-1" />
                <span>Serving Clients Nationwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AEM Consulting Group, LLC. All rights reserved.</p>
          <p className="mt-2 md:mt-0 italic">
            Disclaimer: Rates are not guaranteed as everyone's case is different.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-navy-900 shadow-sm border border-gray-200 hover:bg-gold-400 hover:text-white hover:border-gold-400 transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="text-gray-600 hover:text-gold-500 transition-colors text-sm"
  >
    {children}
  </a>
);

export default Footer;
