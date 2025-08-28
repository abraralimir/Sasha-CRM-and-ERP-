
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function NewContactPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, 'contacts'), {
                name,
                email,
                phone,
                company,
            });
            toast({
                title: "Success",
                description: "Contact created successfully.",
            });
            router.push('/contacts');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to create contact.',
            });
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b flex items-center justify-between bg-card fixed top-0 w-full z-10 md:relative">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-xl font-semibold font-headline">Create New Contact</h1>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 flex justify-center">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="font-headline">Contact Information</CardTitle>
                        <CardDescription>Fill out the form to add a new contact.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company</Label>
                                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Contact'}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
