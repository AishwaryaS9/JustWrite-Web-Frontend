import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageTitle from '@/components/pageTitle';

const terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PageTitle />
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto mt-10 p-6">

          <div className="text-black dark:bg-black dark:text-white">
            <div className="container mx-auto px-4 py-8">
              <div className="w-full flex">
                <h1 className="text-3xl font-bold mb-4 text-primaryColor">Terms of Service for JustWrite</h1>
              </div>
              <br />
              <p className="mb-4 text-base">
                Welcome to JustWrite. These terms of service outline the rules and regulations for using our blog platform. By accessing or using JustWrite, you agree to comply with and be bound by these terms. If you do not agree to these terms, please do not use our platform.
              </p>
              <br />
              <div className="pb-5">
                <h2 className="font-bold text-primaryColor">General</h2>
                <br />
                <ul>
                  <li className="list-disc">
                    <p className="text-base">
                      By using JustWrite, you confirm that you are at least 13 years old or have the consent of a parent or guardian. You agree to provide accurate and complete information when creating an account.
                    </p>
                  </li>
                  <br />
                  <li className="list-disc">
                    <p className="text-base">
                      We reserve the right to modify these terms at any time. Changes will be communicated via email or posted on our website. Continued use of the platform after changes indicates your acceptance of the updated terms.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="pb-5">
                <h2 className="font-bold text-primaryColor">Content Ownership</h2>
                <br />
                <ul>
                  <li className="list-disc">
                    <p className="text-base">
                      You retain ownership of any content you create and publish on JustWrite. By posting content, you grant us a non-exclusive, royalty-free license to display, distribute, and promote your content on our platform.
                    </p>
                  </li>
                  <br />
                  <li className="list-disc">
                    <p className="text-base">
                      You are responsible for ensuring that your content does not violate copyright, trademark, or other applicable laws. JustWrite is not liable for any content published by users.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="pb-5">
                <h2 className="font-bold text-primaryColor">Prohibited Activities</h2>
                <br />
                <ul>
                  <li className="list-disc">
                    <p className="text-base">
                      You agree not to use JustWrite for unlawful activities, including but not limited to publishing defamatory, obscene, or hateful content.
                    </p>
                  </li>
                  <br />
                  <li className="list-disc">
                    <p className="text-base">
                      You must not attempt to gain unauthorized access to other users&apos; accounts or JustWrite&apos;s systems. Violations may result in account termination and legal action.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="pb-5">
                <h2 className="font-bold text-primaryColor">Privacy</h2>
                <br />
                <ul>
                  <li className="list-disc">
                    <p className="text-base">
                      We value your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                    </p>
                  </li>
                  <br />
                </ul>
              </div>

              <div className="pb-5">
                <h2 className="font-bold text-primaryColor">Account Termination</h2>
                <br />
                <ul>
                  <li className="list-disc">
                    <p className="text-base">
                      We reserve the right to suspend or terminate your account at our discretion if you violate these terms or engage in harmful behavior on the platform.
                    </p>
                  </li>
                  <br />
                </ul>
              </div>

              <div className="pb-5">
                <h2 className="font-bold text-primaryColor">Governing Law</h2>
                <br />
                <ul>
                  <li className="list-disc">
                    <p className="text-base">
                      These terms are governed by the laws of the jurisdiction where JustWrite operates. Any disputes will be resolved in the courts of this jurisdiction.
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
                    If you have questions or concerns about these terms, please contact us at support@justwrite.com.
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

export default terms;
