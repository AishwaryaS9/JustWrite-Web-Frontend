import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { signUpUser } from '@/api/userApi';
import { useRouter } from 'next/router';
import Image from 'next/image'
import signupImage from '../assets/images/signup.png'
import PageTitle from '@/components/pageTitle';

const Register = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format!");
            return;
        }
        try {
            const signUpResponse = await signUpUser(name, email, password);
            if (signUpResponse && signUpResponse.status === 201) {
                toast.success("Registered successfully!");
                router.push("/login");
            } else if (signUpResponse && signUpResponse.status === 400) {
                if (signUpResponse.data.message === "User already registered") {
                    toast.error("User already registered. Please login.");
                } else {
                    toast.error(signUpResponse.data.message || "Failed to register. Try again.");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.");
                console.log("Unhandled signup response:", signUpResponse);
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("Something went wrong. Please try again.");
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
                theme="light" />

            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <div className='min-h-screen w-full flex items-center justify-center bg-gray-100 '>
                        <PageTitle />
                        <div className="font-[sans-serif]">
                            <div className="min-h-screen flex fle-col items-center justify-center p-6">
                                <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl max-lg:max-w-lg w-full">

                                    <form onSubmit={handleRegister}
                                        className="lg:max-w-md w-full border border-gray-300 p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-lg">
                                        <h3 className="text-gray-800 text-2xl font-bold mb-8">Create an account</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                                                <input
                                                    value={name}
                                                    type='name'
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="rounded-lg w-full text-gray-800 text-sm border border-gray-300 pl-4 pr-10 px-4 py-3  focus:border-primaryColor outline-none transition-all"
                                                    placeholder="Enter name"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                                <input
                                                    value={email}
                                                    type='email'
                                                    placeholder='Enter email'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="rounded-lg w-full text-gray-800 text-sm border border-gray-300 pl-4 pr-10 px-4 py-3 focus:border-primaryColor outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                                <input
                                                    value={password}
                                                    type='password'
                                                    placeholder='Enter your password'
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="rounded-lg w-full text-gray-800 text-sm border border-gray-300 pl-4 pr-10 px-4 py-3  focus:border-primaryColor outline-none transition-all"
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <input id="agreeterms" name="agreeterms" type="checkbox" className="h-4 w-4 shrink-0 border-gray-300 rounded" />
                                                <label htmlFor="agreeterms" className="ml-3 block text-sm text-gray-800">
                                                    I accept the <Link href={"/terms"} className="text-primaryColor font-semibold hover:underline ml-1">Terms and Conditions</Link>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                            <button type="submit"
                                                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-primaryColor hover:bg-primaryColorLight focus:outline-none"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-800 mt-6">Already have an account?
                                            <Link href={"/login"} className="text-primaryColor font-semibold hover:underline ml-1">
                                                Sign in here</Link>
                                        </p>
                                    </form>
                                    <div className="h-full">
                                        <Image
                                            className="w-full h-full object-contain aspect-[628/516]" alt="Sign up"
                                            src={signupImage}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div >
        </>
    )
}

export default Register