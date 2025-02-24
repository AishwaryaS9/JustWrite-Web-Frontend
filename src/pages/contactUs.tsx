
import Navbar from '@/components/Navbar';
import Footer from '../components/Footer';
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 
import PageTitle from '@/components/pageTitle';

const ContactUs: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent successfully!");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle />
            <Navbar />

            <main className="flex-grow bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-semibold text-center mb-8">Get in Touch</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white p-6 rounded-lg h-40 flex flex-col items-center justify-center text-center">
                            <div className="mb-4">
                                <FaMapMarkerAlt className="text-primaryColor text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Our Office
                            </h3>
                            <p className="text-gray-600">
                                1234 Street Name, City, Country
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg h-40 flex flex-col items-center justify-center text-center">
                            <div className="mb-4">
                                <FaEnvelope className="text-primaryColor text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Email Us
                            </h3>
                            <p className="text-gray-600">
                                support@company.com
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg h-40 flex flex-col items-center justify-center text-center">
                            <div className="mb-4">
                                <FaPhone className="text-primaryColor text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Call Us
                            </h3>
                            <p className="text-gray-600">
                                +1 234 567 890
                            </p>
                        </div>

                    </div>

                    <h2 className="text-2xl font-semibold text-center mb-8">Send Us a Message</h2>
                    <div className="items-center flex justify-center">
                        <form onSubmit={handleSubmit} className="space-y-6 w-[50%] bg-white p-8 rounded-8 justify-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-gray-700 font-semibold">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-semibold">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="phone" className="block text-gray-700 font-semibold">Your Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-gray-700 font-semibold">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-gray-700 font-semibold">Your Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-primaryColor text-white rounded-md hover:bg-primarColor-700 transition duration-300"
                                >
                                    Send Message
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactUs;
