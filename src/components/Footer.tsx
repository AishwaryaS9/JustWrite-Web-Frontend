import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPenAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-900 py-8 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="mb-6">
            <Link href="/">
            <h2 className="text-3xl font-semibold text-[#333333] mb-2 flex items-center justify-center">
              <FaPenAlt className="w-6 h-6 mr-2 text-[#7C4EE4]" />
              JustWrite
            </h2>
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 justify-center md:space-x-8 text-sm mb-6">
          <Link href="/" className="text-[#333333] hover:text-gray-900 transition duration-300">
            Home
          </Link>
          <Link href="/allPosts" className="text-[#333333] hover:text-gray-900 transition duration-300">
            Posts
          </Link>
          <Link href="/createPost" className="text-[#333333] hover:text-gray-900 transition duration-300">
            Create Post
          </Link>
          <Link href="/aboutUs" className="text-[#333333] hover:text-gray-900 transition duration-300">
            About Us
          </Link>
          <Link href="/contactUs" className="text-[#333333] hover:text-gray-900 transition duration-300">
            Contact US
          </Link>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-5 h-5" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-400 text-white hover:bg-blue-500 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter className="w-5 h-5" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-pink-600 text-white hover:bg-pink-700 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-700 text-white hover:bg-blue-800 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="w-5 h-5" />
          </Link>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <p className="text-sm text-[#333333]">&copy; 2025 JustWrite. All rights reserved.</p>
          <Link
            href="/privacyPolicy"
            className="text-sm text-[#333333] hover:text-gray-900 transition duration-300 mt-2 inline-block"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
