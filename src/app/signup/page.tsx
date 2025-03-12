'use client';
import Lottie from 'lottie-react';
import regAnimation from '../../../public/reg.json';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { imageUpload } from '../../api/utils/index';
import Link from 'next/link';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

// Define User and AuthResult interfaces for proper typing
interface User {
    email?: string;
    displayName?: string;
}

interface AuthResult {
    user?: User;
}

const Page: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
        const isTablet = /iPad|Android/i.test(userAgent) && !/Mobile/i.test(userAgent);

        console.log("User Agent:", userAgent);
        if (isMobile) {
            console.log("Device Type: Mobile");
        } else if (isTablet) {
            console.log("Device Type: Tablet");
        } else {
            console.log("Device Type: Desktop");
        }
    }, []);

    const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            Swal.fire({
                title: 'Profile Picture Required',
                text: 'Please upload a profile picture.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const imageUrl = await imageUpload(image);
            await createUser(email, password);
            await updateUserProfile(name, imageUrl);
            Swal.fire({
                title: 'Signup Successful',
                text: 'You have successfully signed up.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
            Swal.fire({
                title: 'Signup Failed',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = (await signInWithGoogle()) as AuthResult | undefined;

            if (result && result.user) {
                const userInfo = {
                    email: result.user.email || '',
                    name: result.user.displayName || '',
                };
                await axiosPublic.post('/users', userInfo);
            } else {
                Swal.fire({
                    title: 'Google Sign-In Failed',
                    text: 'No user information returned.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Google sign-in failed.';
            Swal.fire({
                title: 'Google Sign-In Failed',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center py-10 px-5">
            <div className="w-full max-w-xl">
                <Lottie animationData={regAnimation} loop={true} />
            </div>
            <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-semibold text-center text-[#25527E] mb-8">
                    Create Your Account
                </h2>

                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Full Name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            placeholder="Your Password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="profile-pic">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profile-pic"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f0652b]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#22C55E] text-white font-semibold rounded-lg hover:bg-[#25a755] transition-colors duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <div>
                    <button
                        onClick={handleGoogleLogin}
                        className="max-w-[320px] flex items-center justify-center mx-auto mt-4 py-2 px-5 text-sm font-bold text-center uppercase rounded-md border border-[rgba(50,50,80,0.25)] gap-3 text-white bg-[rgb(50,50,80)] cursor-pointer transition-all duration-600 ease-in-out hover:scale-[1.02] hover:bg-[rgb(90,90,120)]"
                    >
                        Continue with Google
                    </button>
                </div>

                <p className="mt-5 text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#f0652b] hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Page;
