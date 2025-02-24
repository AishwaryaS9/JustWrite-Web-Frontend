import React, { useState } from 'react'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotUserPassword } from '@/api/userApi';
import Link from 'next/link';
import Image from 'next/image';
import forgotpassword from '../assets/images/forgotpassword.png'
import PageTitle from '@/components/pageTitle';


const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!emailRegex.test(email)) {
            toast.error('Invalid email format!');
            return;
        }

        try {
            const response = await forgotUserPassword(email);
            if (response) {
                toast.success("Password reset link sent to your email!");
            } else {
                toast.error("Failed to send reset email. Please try again later.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);

        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex flex-col min-h-screen">
                <PageTitle />
                <Navbar />
                <main className="flex-grow">
                    <div className='min-h-screen w-full flex items-center justify-center bg-gray-100 '>
                        <div className="font-[sans-serif]">
                            <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
                                <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
                                    <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                                        <form onSubmit={handleForgotPassword} className="space-y-4">
                                            <div className="mb-8" >
                                                <h3 className="text-gray-800 text-3xl font-bold">Forgot Password</h3>
                                                {/* <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p> */}
                                                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Forgot your password? Enter your email to reset it and get back on track.</p>
                                            </div>
                                            <div>
                                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                                <div className="relative flex items-center">

                                                    <input
                                                        value={email}
                                                        type='email'
                                                        placeholder='Enter your email'
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                                        className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-primaryColor" />

                                                </div>
                                            </div>


                                            <div className="!mt-8">
                                                <button
                                                    type="submit"
                                                    className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-primaryColor hover:bg-primaryColorLight focus:outline-none"
                                                >
                                                    Send Reset Link
                                                </button>
                                            </div>
                                            <p className="text-sm !mt-8 text-center text-gray-500">Remember your password?

                                                <Link href={"/login"} className="text-primaryColor font-semibold hover:underline ml-1 whitespace-nowrap">
                                                    Login
                                                </Link>
                                            </p>
                                        </form>
                                    </div>
                                    <div className="max-md:mt-8">
                                        <Image
                                            className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Sign In"
                                            src={forgotpassword}
                                        /> </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </main>
                <Footer />
            </div>
        </>
    )
}

export default ForgotPassword