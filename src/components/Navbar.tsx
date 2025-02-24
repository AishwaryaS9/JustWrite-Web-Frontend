import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaPenAlt } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearLogin } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';

const Navbar: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement | null>(null);

    const dispatch = useAppDispatch();

    const token = useAppSelector((state: RootState) => state.user.token);
    const userProfileId = useAppSelector((state: RootState) => state.user.userId);

    useEffect(() => {
        const userToken = token;
        const profileId = userProfileId;
        setLoggedIn(!!userToken);
        setUserId(profileId || null);
    }, []);

    const handleLogout = () => {
        dispatch(clearLogin())
        setLoggedIn(false);
        setMenuOpen(false);
        router.push('/');
    };

    const handleProfile = () => {
        if (userId) router.push(`/profile/${userId}`);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center px-6 py-4">
                <Link href="/" className="text-3xl font-sans font-bold flex items-center">
                    <FaPenAlt className="mr-2 text-[#7C4EE4]" />
                    JustWrite
                </Link>

                <div className="hidden sm:flex items-center flex-grow max-w-md mx-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-3 text-sm text-gray-800 border border-gray-300 rounded-full bg-gray-100 outline-none focus:ring-2 focus:ring-[#7C4EE4]"
                        aria-label="Search"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const searchTerm = (e.target as HTMLInputElement).value.trim();
                                if (searchTerm) router.push(`/search/${searchTerm}`);
                            }
                        }}
                    />
                </div>

                <button
                    className="sm:hidden text-2xl focus:outline-none"
                    aria-label="Toggle menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {menuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute top-14 right-6 w-60 rounded-xl shadow-lg bg-white border text-gray-900 transition-transform"
                    >
                        <ul className="flex flex-col text-center">
                            <li className="border-b">
                                <Link href="/" className="block px-4 py-3" onClick={() => setMenuOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li className="border-b">
                                <Link href="/allPosts" className="block px-4 py-3" onClick={() => setMenuOpen(false)}>
                                    Posts
                                </Link>
                            </li>
                            {loggedIn && (
                                <li className="border-b">
                                    <Link href="/createPost" className="block px-4 py-3" onClick={() => setMenuOpen(false)}>
                                        Create Post
                                    </Link>
                                </li>
                            )}
                           
                            {loggedIn ? (
                                <>
                                    <li className="border-b">
                                        <button
                                            className="w-full text-center px-4 py-3 hover:bg-gray-100"
                                            onClick={handleProfile}
                                        >
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="w-full text-center px-4 py-3 text-red-500 hover:bg-gray-100"
                                            onClick={() => {
                                                handleLogout();
                                                setMenuOpen(false);
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link
                                        href="/login"
                                        className="block px-4 py-3 text-green-500 hover:bg-gray-100"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}

                <div className="hidden sm:flex items-center space-x-6">
                    <Link href="/" className="hover:text-[#7C4EE4]">
                        Home
                    </Link>
                    <Link href="/allPosts" className="hover:text-[#7C4EE4]">
                        Posts
                    </Link>
                    {loggedIn && (
                        <Link href="/createPost" className="hover:text-[#7C4EE4]">
                            Create Post
                        </Link>
                    )}
                        
                    {loggedIn ? (
                        <div className="flex items-center space-x-4">
                            <button onClick={handleProfile} className="hover:text-[#7C4EE4]">
                                Profile
                            </button>
                            <button onClick={handleLogout} className="px-4 py-2 rounded-full hover:text-red-600">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className=" px-4 py-2 rounded-full hover:text-green-600">
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
