import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Consultation = ({ type, onClose, selectedPackage }) => {
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        state: '',
        phoneNumber: '',
        email: '',
        occupation: '',
        requirements: '',
        agreeToTerms: false
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\+?[0-9]{8,15}$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }
        
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        
        if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required";
        if (!formData.requirements.trim()) newErrors.requirements = "Please specify your requirements";
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
        
        return newErrors;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/registrations`, {
                type: 'tourism',
                packageId: selectedPackage?._id,
                packageTitle: selectedPackage?.title,
                name: formData.name,
                email: formData.email,
                phone: formData.phoneNumber,
                country: formData.country,
                state: formData.state,
                occupation: formData.occupation,
                requirements: formData.requirements,
                message: `Package: ${selectedPackage?.title}\nCountry: ${formData.country}\nState: ${formData.state}\nOccupation: ${formData.occupation}\nRequirements: ${formData.requirements}`
            });

            if (response.data.success) {
                setSubmitSuccess(true);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    setFormData({
                        name: '',
                        country: '',
                        state: '',
                        phoneNumber: '',
                        email: '',
                        occupation: '',
                        requirements: '',
                        agreeToTerms: false
                    });
                    setSubmitSuccess(false);
                    onClose();
                }, 3000);
            } else {
                throw new Error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response?.data?.errors) {
                setSubmitError(error.response.data.errors.join(', '));
            } else {
                setSubmitError(error.message || 'Registration failed. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div className="consultation-container py-8 px-4 sm:px-6 lg:px-8 bg-gray-900/50 rounded-lg shadow-lg max-w-4xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <h2 className="text-2xl sm:text-3xl font-serif text-white mb-2">
                    {type === 'purchase' ? 'Schedule Your Property Consultation' : 'Customize Your Tourism Experience'}
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    {type === 'purchase' 
                        ? 'Fill out the form below to schedule a personalized consultation with our property experts.'
                        : 'Tell us what youre looking for in your dream vacation, and well craft the perfect experience for you.'}
                </p>
            </motion.div>
            
            {submitSuccess ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-900/50 border border-green-500 text-green-100 rounded-md p-4 mb-6 text-center"
                >
                    <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                    <p>Your consultation request has been submitted successfully. Our team will contact you shortly.</p>
                </motion.div>
            ) : (
                <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                >
                    {submitError && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-900/50 border border-red-500 text-red-100 rounded-md p-4 mb-6"
                        >
                            {submitError}
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                                Full Name*
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                                Email Address*
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-200 mb-1">
                                Country of Residence*
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-800 border ${errors.country ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                placeholder="Enter your country"
                            />
                            {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-200 mb-1">
                                State/Province*
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-800 border ${errors.state ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                placeholder="Enter your state or province"
                            />
                            {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200 mb-1">
                                Phone Number*
                            </label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-800 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                placeholder="Enter your phone number"
                            />
                            {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                        </div>
                        
                        <div>
                            <label htmlFor="occupation" className="block text-sm font-medium text-gray-200 mb-1">
                                Occupation*
                            </label>
                            <input
                                type="text"
                                id="occupation"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 bg-gray-800 border ${errors.occupation ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                                placeholder="Enter your occupation"
                            />
                            {errors.occupation && <p className="mt-1 text-sm text-red-500">{errors.occupation}</p>}
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-200 mb-1">
                            {type === 'purchase' 
                                ? 'Property Requirements & Preferences*' 
                                : 'Tourism Package Requirements & Preferences*'}
                        </label>
                        <textarea
                            id="requirements"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            rows="4"
                            className={`w-full px-4 py-2 bg-gray-800 border ${errors.requirements ? 'border-red-500' : 'border-gray-600'} rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                            placeholder={type === 'purchase' 
                                ? 'Please describe your ideal property, budget range, timeline, etc.'
                                : 'Tell us about your preferred activities, accommodations, duration, special requirements, etc.'}
                        />
                        {errors.requirements && <p className="mt-1 text-sm text-red-500">{errors.requirements}</p>}
                    </div>

                    <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-700 rounded"
                        />
                        <label htmlFor="agreeToTerms" className="text-gray-300 text-sm">
                            I agree to the <a href="/terms" className="text-amber-500 hover:underline">Terms of Service</a> and{' '}
                            <a href="/privacy" className="text-amber-500 hover:underline">Privacy Policy</a>*
                        </label>
                    </div>
                    {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

                    <div className="flex justify-end space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                isSubmitting
                                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#cd754a] to-[#dfb562] text-white hover:opacity-90'
                            }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                        </motion.button>
                    </div>
                </motion.form>
            )}
        </div>
    );
};

export default Consultation;