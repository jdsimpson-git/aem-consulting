import React from 'react';
import { useWizardStore } from '../../../stores/useWizardStore';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lock, Phone } from 'lucide-react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

const ContactScreen = () => {
  const { 
    contact, 
    setComplexField,
    nextStep,
    prevStep,
    setIsSubmitted
  } = useWizardStore();

  const handleNext = () => {
    // Basic validation
    if (contact.firstName && contact.lastName && (contact.phone || contact.email)) {
      setIsSubmitted(true);
      nextStep();
    }
  };

  const updateContact = (field, value) => {
    setComplexField('contact', field, value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-navy-900">
          Last step! Where should we send your quotes?
        </h2>
        <p className="text-gray-600">We'll show you your options immediately.</p>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-base font-semibold text-navy-900">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              value={contact.firstName}
              onChange={(e) => updateContact('firstName', e.target.value)}
              className="py-6 text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-base font-semibold text-navy-900">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={contact.lastName}
              onChange={(e) => updateContact('lastName', e.target.value)}
              className="py-6 text-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base font-semibold text-navy-900">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 555-5555"
            value={contact.phone}
            onChange={(e) => updateContact('phone', e.target.value)}
            className="py-6 text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-semibold text-navy-900">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={contact.email}
            onChange={(e) => updateContact('email', e.target.value)}
            className="py-6 text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bestTime" className="text-base font-semibold text-navy-900">Best time to contact?</Label>
          <Select 
            value={contact.bestTime} 
            onValueChange={(val) => updateContact('bestTime', val)}
          >
            <SelectTrigger className="w-full py-6">
              <SelectValue placeholder="Select best time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
              <SelectItem value="anytime">Anytime</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 p-4 bg-teal-50 rounded-lg text-teal-800 text-sm">
          <Lock size={16} />
          <span>Your information is secure. We don't sell your data.</span>
        </div>

      </div>

      <div className="flex gap-4 pt-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 py-6 text-lg border-gray-300 hover:bg-gray-50">
          <ArrowLeft className="mr-2" size={20} /> Back
        </Button>
        <Button 
          onClick={handleNext} 
          className="flex-[2] py-6 text-lg bg-teal-600 hover:bg-teal-700"
          disabled={!contact.firstName || !contact.lastName || (!contact.phone && !contact.email)}
        >
          See My Options <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </motion.div>
  );
};

export default ContactScreen;
