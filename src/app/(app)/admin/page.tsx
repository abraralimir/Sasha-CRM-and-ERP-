
'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type User = {
    id: string;
    email: string;
    role: string;
}

export default function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const db = getDb();
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
            setUsers(usersData);
        });
        return () => unsubscribe();
    }, []);


    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b flex items-center justify-between bg-card fixed top-0 w-full z-10 md:relative">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-xl font-semibold font-headline">Admin Dashboard</h1>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <Shield className="w-8 h-8 text-primary" />
                            <div>
                                <CardTitle className="font-headline">User Management</CardTitle>
                                <CardDescription>A list of all users registered in the system.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>User ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell><Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge></TableCell>
                                        <TableCell className="font-mono text-xs">{user.id}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
