import { loginUser } from '@/api/userApi';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { userLogin } from '@/redux/slices/userSlice';
import { useAppDispatch } from '../redux/hooks';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Image from 'next/image'
import signinImage from '../assets/images/sigin.png'
import PageTitle from '@/components/pageTitle';

const Login = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberMeEmail");
    const savedPassword = localStorage.getItem("rememberMePassword");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format!');
      return;
    }
    setLoading(true);
    try {
      const loginResponse = await loginUser(email, password);
      if (loginResponse) {
        dispatch(userLogin({
          token: loginResponse.token,
          name: loginResponse.name,
          userId: loginResponse._id,

        }));
        if (rememberMe) {
          localStorage.setItem("rememberMeEmail", email);
          localStorage.setItem("rememberMePassword", password);
        } else {
          localStorage.removeItem("rememberMeEmail");
          localStorage.removeItem("rememberMePassword");
        }
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        toast.error("Failed to login. Try again");
        console.error("Invalid login response");
      }
    } catch (error) {
      console.log('Error', JSON.stringify(error))
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
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
        <PageTitle />
        <Navbar />
        <main className="flex-grow">
          <div className='min-h-screen w-full flex items-center justify-center bg-gray-100 '>
            <div className="font-[sans-serif]">
              <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
                  <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
                    <form className="space-y-4" onSubmit={handleLogin}>
                      <div className="mb-8" >
                        <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
                        <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to write and share your thoughts with the world. Let&apos;s get started!</p>
                      </div>
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">Email</label>
                        <div className="relative flex items-center">
                          <input
                            value={email}
                            type='email'
                            placeholder='Enter email'
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-primaryColor"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-800 text-sm mb-2 block">Password</label>
                        <div className="relative flex items-center">
                          <input
                            value={password}
                            type={showPassword ? 'text' : 'password'}
                            required
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-primaryColor"
                            placeholder="Enter password"
                          />
                          <div
                            className="absolute right-4 cursor-pointer text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 shrink-0 text-primaryColor focus:ring-primaryColor border-gray-300 rounded"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                            Remember me
                          </label>
                        </div>
                        <div className="text-sm">
                          <Link href={"/forgotPassword"} className="text-primaryColor hover:underline font-semibold">
                            Forgot your password?
                          </Link>
                        </div>
                      </div>
                      <div className="!mt-8">
                        <button
                          type="submit"
                          className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-primaryColor hover:bg-primaryColorLight focus:outline-none"
                        >
                          {loading ? 'Signing In...' : 'Sign in'}
                        </button>
                      </div>
                      <p className="text-sm !mt-8 text-center text-gray-500">Don&apos;t have an account?

                        <Link href={"/register"} className="text-primaryColor font-semibold hover:underline ml-1 whitespace-nowrap">
                          Register here
                        </Link>
                      </p>
                    </form>
                  </div>
                  <div className="max-md:mt-8">
                    <Image
                      className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Sign In"
                      src={signinImage}
                    />  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Login;
