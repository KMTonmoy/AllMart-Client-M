'use client';
import { createContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    signInWithPhoneNumber
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import axios from 'axios';

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    createUser: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logOut: () => Promise<void>;
    updateUserProfile: (name: string, photo: string) => Promise<void>;
    sendOTP: (phoneNumber: string) => Promise<void>;
    verifyOTP: (code: string) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
let confirmationResult: any;

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const createUser = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            console.error('Error signing in:', error);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async (): Promise<void> => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            router.push('/');
        } catch (error) {
            console.error('Error signing in with Google:', error);
        } finally {
            setLoading(false);
        }
    };

    const logOut = async (): Promise<void> => {
        setLoading(true);
        try {
            await axios.get(`https://allmartserver.vercel.app/logout`, { withCredentials: true });
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name: string, photo: string): Promise<void> => {
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const sendOTP = async (phoneNumber: string): Promise<void> => {
        try {
            confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
            console.log('OTP sent');
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const verifyOTP = async (code: string): Promise<boolean> => {
        try {
            await confirmationResult.confirm(code);
            console.log('OTP verified');
            return true;
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return false;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo: AuthContextProps = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        sendOTP,
        verifyOTP,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
   