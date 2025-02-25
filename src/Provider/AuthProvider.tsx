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
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface AuthProviderProps {
    children: ReactNode;
}

const detectDevice = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|iphone|android|ipad/.test(userAgent)) return 'phone';
    if (/tablet/.test(userAgent)) return 'tablet';
    if (/mac|windows|linux/.test(userAgent)) return 'laptop';
    if (/smartwatch/.test(userAgent)) return 'watch';
    return 'computer';
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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
            throw error;
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
            throw error;
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
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async (): Promise<void> => {
        setLoading(true);
        try {
            await axios.get(`http://localhost:8000/logout`, { withCredentials: true });
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name: string, photo: string): Promise<void> => {
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photo,
                });
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    };

    const saveUser = async (user: User): Promise<any> => {
        try {
            const { data: existingUser } = await axios.get(`http://localhost:8000/users/${user.email}`);
            let devices = existingUser?.devices || [];

            const currentDevice = detectDevice();

            if (!devices.includes(currentDevice)) {
                devices.push(currentDevice);
            }

            const currentUser = {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL,
                role: 'user',
                devices,
            };
            const { data } = await axios.put(`http://localhost:8000/user`, currentUser);
            return data;
        } catch (error) {
            console.error('Error saving user:', error);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                setTimeout(async () => {
                    try {
                        await saveUser(currentUser);
                    } catch (error) {
                        console.error('Error handling auth state change:', error);
                    }
                }, 5000);
            }
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
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
