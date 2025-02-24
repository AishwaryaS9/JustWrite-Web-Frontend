import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '@/components/pageTitle';

const PrivacyPolicy = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle />
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-6xl mx-auto mt-10 p-6">

                    <div className="text-black dark:bg-black dark:text-white">
                        <div className="container mx-auto px-4 py-8">
                            <div className="w-full flex">
                                <h1 className="text-3xl font-bold mb-4 text-primaryColor">Privacy Policy for JustWrite</h1>
                            </div>
                            <br />
                            <p className="mb-4 text-base">
                                At JustWrite, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information. By using our platform, you agree to the practices described in this policy.
                            </p>
                            <br />
                            <div className="pb-5">
                                <h2 className="font-bold text-primaryColor">Information We Collect</h2>
                                <br />
                                <ul>
                                    <li className="list-disc">
                                        <p className="text-base">
                                            We collect information that you provide when creating an account, such as your name, email address, and profile details.
                                        </p>
                                    </li>
                                    <br />
                                    <li className="list-disc">
                                        <p className="text-base">
                                            We may collect usage data, including IP addresses, browser types, and device information, to improve our services.
                                        </p>
                                    </li>
                                </ul>
                            </div>

                            <div className="pb-5">
                                <h2 className="font-bold text-primaryColor">How We Use Your Information</h2>
                                <br />
                                <ul>
                                    <li className="list-disc">
                                        <p className="text-base">
                                            We use your information to provide and improve our services, personalize your experience, and communicate with you about updates and features.
                                        </p>
                                    </li>
                                    <br />
                                    <li className="list-disc">
                                        <p className="text-base">
                                            Your information may be used for security purposes, such as detecting and preventing fraudulent activity.
                                        </p>
                                    </li>
                                </ul>
                            </div>

                            <div className="pb-5">
                                <h2 className="font-bold text-primaryColor">Sharing Your Information</h2>
                                <br />
                                <ul>
                                    <li className="list-disc">
                                        <p className="text-base">
                                            We do not sell your personal information to third parties. However, we may share data with trusted service providers to operate and enhance our platform.
                                        </p>
                                    </li>
                                    <br />
                                    <li className="list-disc">
                                        <p className="text-base">
                                            We may disclose information when required by law or to protect the rights, property, or safety of JustWrite and its users.
                                        </p>
                                    </li>
                                </ul>
                            </div>

                            <div className="pb-5">
                                <h2 className="font-bold text-primaryColor">Data Security</h2>
                                <br />
                                <ul>
                                    <li className="list-disc">
                                        <p className="text-base">
                                            We implement reasonable security measures to protect your personal information. However, no system is completely secure, and we cannot guarantee the absolute security of your data.
                                        </p>
                                    </li>
                                    <br />
                                </ul>
                            </div>

                            <div className="pb-5">
                                <h2 className="font-bold text-primaryColor">Your Rights</h2>
                                <br />
                                <ul>
                                    <li className="list-disc">
                                        <p className="text-base">
                                            You have the right to access, update, or delete your personal information. Please contact us to exercise these rights.
                                        </p>
                                    </li>
                                    <br />
                                    <li className="list-disc">
                                        <p className="text-base">
                                            You can opt-out of receiving promotional emails by following the unsubscribe instructions in the email or contacting us directly.
                                        </p>
                                    </li>
                                </ul>
                            </div>

                            <div className="pb-5">
                            <h2 className="font-bold text-primaryColor">Children&apos;s Privacy</h2>
                            <br />
                                <ul>
                                    <li className="list-disc">
                                        <p className="text-base">
                                            JustWrite is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.
                                        </p>
                                    </li>
                                    <br />
                                </ul>
                            </div>

                            <div className="pb-5">
                                <h2 className="font-bold text-primaryColor">Changes to this Privacy Policy</h2>
                                <br />
                                <ul>
                                    <li className="list-disc">
                                        <p className="text-base">
                                            We may update this Privacy Policy from time to time. Changes will be communicated via email or posted on our website.
                                        </p>
                                    </li>
                                    <br />
                                </ul>
                            </div>

                            <div className="pb-5">
                                <h2 className="font-bold text-primaryColor">Contact Information</h2>
                                <br />
                                <ul>
                                    <p className="text-base">
                                        If you have questions or concerns about this Privacy Policy, please contact us at support@justwrite.com.
                                    </p>
                                    <br />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
