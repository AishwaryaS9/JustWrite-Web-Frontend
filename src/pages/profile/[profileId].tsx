"use client"
import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '@/api/userApi';
import { useRouter } from 'next/router.js';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAppSelector } from '@/redux/hooks';
import PageTitle from '@/components/pageTitle';
import { RootState } from '@/redux/store';

interface UserProfileDetails {
  name: string;
  email: string;
  avatar: string;
}

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfileDetails | null>(null);
  const [error, setError] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState<UserProfileDetails>({
    name: '',
    email: '',
    avatar: '',
  });

  const router = useRouter();
  const { profileId } = router.query as { profileId: string };
  const userToken = useAppSelector((state: RootState) => state.user.token) || '';

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const data  = await getUserProfile(userToken);
      setProfile(data);
      setEditProfile({
        name: data.name,
        email: data.email,
        avatar: data.avatar
      });
    } catch (error) {
      console.log('Error', JSON.stringify(error))
      setError('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (profile) {
      setEditProfile(profile);
    }
  };

  const handleSaveClick = async () => {
    try {
      setLoading(true);
      const response = await updateUserProfile(profileId, editProfile, userToken);
      if (response) {
        setProfile(response);
        setIsEditing(false);
        fetchProfileDetails();
      }

    } catch (error) {
      console.log('Error', JSON.stringify(error))
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="text-2xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center text-red-500 mt-8">Failed to load profile.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <PageTitle />
      <Navbar />
      <main className="flex-1 flex justify-center items-center p-6 bg-gray-100">
        {error ? (
          <div className="text-red-500 text-lg">{error}</div>
        ) : (
          <div className="flex items-center w-full max-w-4xl  rounded-lg p-8">
            <div className="flex-shrink-0 mr-8">
              <img
                src={profile.avatar || "https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small_2x/profile-icon-login-head-icon-vector.jpg"}
                alt="Profile Avatar"
                className="w-40 h-40 object-cover rounded-full border-4 border-gray-300 transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex-grow">
              {isEditing ? (
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700">Name:</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={editProfile.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-primaryColor focus:primaryColor"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={editProfile.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-primaryColor focus:primaryColor"
                    />
                  </div>

                  <div>
                    <label htmlFor="avatar" className="block text-gray-700">Avatar URL:</label>
                    <input
                      type="text"
                      name="avatar"
                      id="avatar"
                      value={editProfile.avatar}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-primaryColor focus:primaryColor"
                    />
                    {editProfile.avatar && (
                      <img
                        src={editProfile.avatar}
                        alt="Avatar Preview"
                        className="mt-4 w-24 h-24 object-cover rounded-full"
                      />
                    )}
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <strong>Name:</strong> {profile.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {profile.email}
                  </div>
                </div>
              )}

              <div className="mt-6 flex space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="text-white px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="text-white px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="text-white px-6 py-2 rounded-lg bg-primaryColor hover:bg-lavenderPurple transition duration-300"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserProfile;