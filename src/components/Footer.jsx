import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">
              AEM <span className="text-gold-400">Consulting</span>
            </h3>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
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
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><FooterLink href="#">Home</FooterLink></li>
              <li><FooterLink href="#">About Alicia</FooterLink></li>
              <li><FooterLink href="#">Services</FooterLink></li>
              <li><FooterLink href="#">Strategy Session</FooterLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gold-400" />
                <a href="mailto:contact@aemconsulting.com" className="hover:text-white transition-colors">contact@aemconsulting.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gold-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold-400 mt-1" />
                <span>Serving Clients Nationwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
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
    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gold-400 hover:text-navy-900 transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
  >
    {children}
  </a>
);

export default Footer;
