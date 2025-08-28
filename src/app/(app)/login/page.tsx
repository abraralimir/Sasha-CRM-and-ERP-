
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function LoginPage() {
    const auth = getAuth();
    const router = useRouter();
    const { user, loading } = useAuth();
    const { toast } = useToast();

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
        if (!loading && user) {
            router.replace('/dashboard');
        }
    }, [user, loading, router]);

    const handleUserDocument = async (userCredential: UserCredential) => {
        const user = userCredential.user;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) { // Only create doc if it doesn't exist
                await setDoc(userRef, {
                    email: user.email,
                    role: 'user', // Default role
                });
            }
        }
    };
    
    const handleGoogleLogin = async () => {
        setPageLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            await handleUserDocument(result);
            router.push('/dashboard');
        } catch (error) {
            console.error("Error signing in with Google: ", error);
            setError("Failed to sign in with Google. Please try again.");
            toast({
                variant: "destructive",
                title: "Login Error",
                description: "Failed to sign in with Google. Please try again.",
            });
        } finally {
            setPageLoading(false);
        }
    };

    const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setPageLoading(true);
        try {
            let result;
            if (isSignUp) {
                result = await createUserWithEmailAndPassword(auth, email, password);
                await handleUserDocument(result);
            } else {
                result = await signInWithEmailAndPassword(auth, email, password);
            }
            router.push('/dashboard');
        } catch (error: any) {
            console.error(`Error with ${isSignUp ? 'sign up' : 'sign in'}:`, error);
            setError(error.message);
            toast({
                variant: "destructive",
                title: isSignUp ? "Sign Up Error" : "Login Error",
                description: error.message,
            });
        } finally {
            setPageLoading(false);
        }
    };

    if (loading || user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background p-4">
                <Spinner size="large" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle className="font-headline">{isSignUp ? 'Create an Account' : 'Welcome Back'}</CardTitle>
                    <CardDescription>{isSignUp ? 'Enter your email and password to sign up.' : 'Sign in to continue to Sasha AI CRM'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleEmailPasswordSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="name@example.com" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                             />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={pageLoading}>
                            {pageLoading ? <Spinner size="small" color="white" /> : (isSignUp ? 'Sign Up' : 'Sign In')}
                        </Button>
                    </form>
                    <Separator className="my-6" />
                    <Button variant="outline" className="w-full mb-2" onClick={handleGoogleLogin} disabled={pageLoading}>
                        {pageLoading ? <Spinner size="small" /> : 'Sign In with Google'}
                    </Button>
                    <Button variant="secondary" className="w-full" asChild>
                        <Link href="/dashboard">Continue as Guest</Link>
                    </Button>
                </CardContent>
                <CardFooter className="justify-center">
                     <Button variant="link" onClick={() => {
                         setIsSignUp(!isSignUp);
                         setError(null);
                        }}>
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
