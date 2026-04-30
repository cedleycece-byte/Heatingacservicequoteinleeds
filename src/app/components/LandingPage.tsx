import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LandingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    postcode: '',
    service: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessKey = 'ebe9210c-a12a-4124-b3e5-9f8976dbc8d2';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: 'New HVAC Quote Request - Leeds',
          from_name: formData.fullName,
          name: formData.fullName,
          phone: formData.phone,
          postcode: formData.postcode,
          service: formData.service,
          message: `New quote request from ${formData.fullName}
Phone: ${formData.phone}
Postcode: ${formData.postcode}
Service: ${formData.service}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/thank-you');
      } else {
        alert('Failed to submit. Please try again or call us directly.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit. Please try again or call us directly.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-16">
        {/* Company Name */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Leeds Heating & Plumbing</h2>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Get a Free Boiler, Heat pump & AC Service Quote in Leeds — Local Engineers Ready
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            No obligation, no commitment. A local engineer will call you back within the hour.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-5">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="John Smith"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-5">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="07123 456789"
              />
            </div>

            {/* Postcode */}
            <div className="mb-5">
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-900 mb-2">
                Postcode
              </label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                required
                value={formData.postcode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="LS1 1AB"
              />
            </div>

            {/* Service Needed */}
            <div className="mb-6">
              <label htmlFor="service" className="block text-sm font-medium text-gray-900 mb-2">
                Service Needed
              </label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="">Select a service...</option>
                <option value="boiler-service">Boiler Service</option>
                <option value="boiler-installation">Boiler Installation</option>
                <option value="air-conditioning">Air Conditioning Installation</option>
                <option value="heat-pump">Heat Pump Installation</option>
              </select>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-md transition-colors duration-200 mb-3"
            >
              Get My Free Quote
            </button>

            {/* Trust Line */}
            <p className="text-center text-sm text-gray-600">
              100% free, no obligation. Local Leeds engineers only.
            </p>
          </form>
        </div>

        {/* Optional Trust Indicators */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Serving Leeds and surrounding areas</p>
        </div>
      </div>
    </div>
  );
}
