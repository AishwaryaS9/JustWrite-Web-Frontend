import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '@/components/pageTitle';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle/>
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto mt-10 p-6">

          <div className="text-black dark:bg-black dark:text-white">
            <div className="container mx-auto px-4 py-8">
              <div className="w-full flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold mb-6 text-primaryColor">About Us</h1>
                <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-3xl">
                  Welcome to JustWrite, a platform dedicated to empowering writers and bloggers to share their thoughts, ideas, and stories with the world. Our mission is to provide a space where creativity thrives, and writers of all backgrounds can connect, learn, and grow.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center p-4 hover:bg-primaryColorLight rounded-lg group">
                  <h2 className="text-2xl font-semibold mb-2 text-primaryColor group-hover:text-white transition-colors duration-300">Our Vision</h2>
                  <p className="text-base text-gray-700 dark:text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300">
                    To create a world where every voice is heard and every story finds its audience. We believe in the power of words to inspire, inform, and transform lives.
                  </p>
                </div>

                <div className="flex flex-col items-center p-4 hover:bg-primaryColorLight rounded-lg group">
                  <h2 className="text-2xl font-semibold mb-2 text-primaryColor group-hover:text-white transition-colors duration-300">Our Mission</h2>
                  <p className="text-base text-gray-700 dark:text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300">
                    To provide a user-friendly platform that enables writers to focus on their craft while connecting with a community of like-minded individuals.
                  </p>
                </div>

                <div className="flex flex-col items-center p-4 hover:bg-primaryColorLight rounded-lg group">
                  <h2 className="text-2xl font-semibold mb-2 text-primaryColor group-hover:text-white transition-colors duration-300">Our Values</h2>
                  <p className="text-base text-gray-700 dark:text-gray-300 text-center group-hover:text-gray-200 transition-colors duration-300">
                    At JustWrite, we are guided by values that reflect our commitment to writers and the creative community.
                  </p>
                </div>
              </div>

              <div className="mt-20">
                <h2 className="text-md font-semibold mb-6 text-[#333333] text-center">HOW WE WORK</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="flex flex-col items-left leading-10 gap-4">
                    <h3 className="text-dimGray text-[40px]">01</h3>
                    <h3 className="text-[20px] font-bold text-primaryColor dark:text-gray-200">Brainstorming</h3>
                    <p className="text-sm text-dimGray dark:text-gray-400 text-left">Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated</p>
                  </div>

                  <div className="flex flex-col items-left leading-10 gap-4">
                    <h3 className="text-dimGray text-[40px]">02</h3>
                    <h3 className="text-[20px] font-bold text-primaryColor dark:text-gray-200">Analysing</h3>
                    <p className="text-sm text-dimGray dark:text-gray-400 text-left">Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line solely on the bottom line.</p>
                  </div>

                  <div className="flex flex-col items-left leading-10 gap-4">
                    <h3 className="text-dimGray text-[40px]">03</h3>
                    <h3 className="text-[20px] font-bold text-primaryColor dark:text-gray-200">News Publishing</h3>
                    <p className="text-sm text-dimGray dark:text-gray-400 text-left">Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <h2 className="text-2xl font-semibold mb-4 text-primaryColor">Get in Touch</h2>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
                  Have questions, suggestions, or just want to say hello? We’d love to hear from you! Reach out to us at <a href="mailto:support@justwrite.com" className="text-primaryColor underline">support@justwrite.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
