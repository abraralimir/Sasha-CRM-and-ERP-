
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/firebase/auth";
import { useEffect } from "react";
import { Logo } from "@/components/logo";

export default function LoginPage() {
    const auth = getAuth();
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) {
            router.replace('/dashboard');
        }
    }, [user, loading, router]);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push('/dashboard');
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    };

    if(loading || user) {
        return null;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle className="font-headline">Welcome Back</CardTitle>
                    <CardDescription>Sign in to continue to Sasha AI CRM</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" onClick={handleGoogleLogin}>
                        Sign In with Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
