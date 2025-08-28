
'use client';

import { useEffect, useState } from "react";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";


type Contact = {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const db = getDb();
        const unsubscribe = onSnapshot(collection(db, "contacts"), (snapshot) => {
            const contactsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Contact));
            setContacts(contactsData);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        const db = getDb();
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast({
                title: "Success",
                description: "Contact deleted successfully.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete contact.",
            });
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b flex items-center justify-between bg-card fixed top-0 w-full z-10 md:relative">
                <div className="flex items-center gap-4">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-xl font-semibold font-headline">Contacts</h1>
                </div>
                <Button asChild>
                    <Link href="/contacts/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Contact
                    </Link>
                </Button>
            </header>
            <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Contact List</CardTitle>
                        <CardDescription>A list of all contacts in your CRM.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.map(contact => (
                                    <TableRow key={contact.id}>
                                        <TableCell>{contact.name}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.phone}</TableCell>
                                        <TableCell>{contact.company}</TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="ghost" size="icon">
                                                <Link href={`/contacts/edit/${contact.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the contact.
                                                    </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(contact.id)}>Delete</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
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
