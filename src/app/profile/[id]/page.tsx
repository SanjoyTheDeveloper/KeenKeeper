"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navber } from "@/src/ui/Navber";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineTextsms } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { addTimelineEntry } from "@/src/lib/timeline";

type Contact = {
    id: number;
    name: string;
    picture: string;
    email: string;
    days_since_contact: number;
    status: string;
    tags: string[];
    bio: string;
    goal: number;
    next_due_date: string;
};

const statusClasses: Record<string, string> = {
    Overdue: "bg-rose-500/10 text-rose-700",
    overdue: "bg-rose-500/10 text-rose-700",
    "Almost Due": "bg-amber-500/10 text-amber-700",
    "almost due": "bg-amber-500/10 text-amber-700",
    Due: "bg-amber-500/10 text-amber-700",
    due: "bg-amber-500/10 text-amber-700",
    "On Track": "bg-emerald-500/10 text-emerald-700",
    "on track": "bg-emerald-500/10 text-emerald-700",
};

type Toast = {
    title: string;
    message: string;
};

export default function ProfilePage() {
    const params = useParams();
    const [contact, setContact] = useState<Contact | null>(null);
    const [toast, setToast] = useState<Toast | null>(null);

    useEffect(() => {
        if (!params?.id) return;

        fetch("/contacts.json")
            .then((res) => res.json())
            .then((data: Contact[]) => {
                const found = data.find((item) => item.id === Number(params.id));
                setContact(found ?? null);
            })
            .catch(() => setContact(null));
    }, [params?.id]);

    useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(() => setToast(null), 2800);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const handleToast = (title: string, message: string) => {
        setToast({ title, message });
    };

    const handleQuickAction = (type: "Call" | "Text" | "Video") => {
        if (!contact) return;
        const title = `${type} with ${contact.name}`;
        addTimelineEntry({
            type,
            title,
            contact: contact.name,
            date: new Date().toISOString(),
        });
        handleToast(title, "Added to Timeline");
    };

    const handleSnooze = () => {
        handleToast("Snoozed", "Contact snoozed for 2 weeks.");
    };

    const handleArchive = () => {
        handleToast("Archived", "Contact archived.");
    };

    const handleDelete = () => {
        handleToast("Deleted", "Contact deleted.");
    };

    if (!contact) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-950">
                <div className="rounded-xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
                    <p className="text-lg font-semibold text-slate-900">Loading contact...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-100 text-slate-950">
            <Navber />

            <main className="flex-1 mx-auto max-w-8xl mt-20 px-4 py-10 sm:px-6 lg:px-8">


                <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
                    <div>


                        <aside className="space-y-4 rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="space-y-4 text-center">
                                <div className="mx-auto flex h-20 w-18 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                                    <img src={contact.picture} alt={contact.name} className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-slate-900">{contact.name}</p>
                                </div>
                                <div className={` inline-flex rounded-full px-4 py-2 text-sm font-semibold shadow-sm shadow-slate-200/50 ${statusClasses[contact.status] ?? "bg-slate-100 text-slate-700"}`}>
                                    {contact.status}
                                </div>
                                <div className="grid flex-wrap justify-center gap-2">
                                    {contact.tags.map((tag) => (
                                        <span key={tag} className="rounded-full px-3 py-1 text-xs font-semibold  text-green-800">
                                            {tag}
                                        </span>
                                    ))}
                                    <span>{contact.bio}</span>
                                    <span>{contact.email}</span>
                                </div>

                            </div>


                        </aside>
                        <div className="grid gap-3 mt-2 ">
                            <button onClick={handleSnooze} className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-800">
                                snoze 2 weeks
                            </button>
                            <button onClick={handleArchive} className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                                Archive
                            </button>
                            <button onClick={handleDelete} className="rounded-sm border border-slate-200 bg-slate-50  px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">
                                Delete
                            </button>
                        </div>
                    </div>



                    <section className="space-y-6 flex-1 rounded-sm gap-6 p-6">


                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="rounded-sm border border-slate-200 bg-slate-50 p-6 text-center">

                                <p className="mt-4 text-3xl font-semibold text-slate-900">{contact.days_since_contact}</p>
                                <p className="text-sm text-slate-500">Days Since Contact</p>
                            </div>
                            <div className="rounded-sm border border-slate-200 bg-slate-50 p-6 text-center">

                                <p className="mt-4 text-3xl font-semibold text-slate-900">{contact.goal} </p>
                                <p className="text-sm ">Goal (Days)</p>
                            </div>
                            <div className="rounded-sm border border-slate-200 bg-slate-50 p-6 text-center">
                                <p className="mt-4 text-3xl font-semibold text-slate-900">{contact.next_due_date}</p>
                                <p className="text-sm text-slate-500">Next due</p>
                            </div>


                        </div>

                        <div className="rounded-sm border border-slate-200 bg-white p-8 shadow-sm">
                            <div className=" flex justify-between gap-4">

                                <div>Relationship Goal</div>
                                <div className="bg-slate-200 p-1 rounded-sm"><button>Edit</button></div>

                            </div>
                            <div className="mt-3 text-sm text-slate-500     ">
                                <h1>Connect every <span className="font-bold">30 days</span></h1>
                            </div>

                        </div>
                        <div className="rounded-sm border border-slate-200 bg-white p-4 pt-5 shadow-sm">
                            <div className=" flex justify-between gap-4">

                                <div className="font-semibold">Quick Check-In</div>


                            </div>
                            <div className="mt-3 flex justify-between  text-sm text-slate-500     ">
                                <button onClick={() => handleQuickAction("Call")} className="cursor-pointer">
                                    <div className="bg-slate-100 px-20 py-4 rounded-sm flex flex-col items-center">

                                        <span className="text-xl"><BiPhoneCall /></span>
                                        <h1>Call</h1>
                                    </div>
                                </button>
                                <button onClick={() => handleQuickAction("Text")} className="cursor-pointer">
                                    <div className="bg-slate-100 px-20 py-4 flex flex-col items-center  rounded-sm">
                                        <span className="text-xl"><MdOutlineTextsms /></span>
                                        <h1>Text</h1>
                                    </div>
                                </button>
                                <button onClick={() => handleQuickAction("Video")} className="cursor-pointer">
                                    <div className="bg-slate-100 px-20 py-4 flex flex-col items-center  rounded-sm">
                                        <span className="text-xl"><IoVideocamOutline />
                                        </span>
                                        <h1>Video</h1>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="border-t border-slate-200 bg-green-900 py-10 text-center text-white">
                <img src="/assets/logo-xl.png" alt="KeenKeeper logo" className="mx-auto mb-4 h-12 w-auto" />
                <p className="mt-3 text-sm text-slate-400">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
                <div className="mt-5"><h1>Social Links</h1></div>
                <div className="text-white flex justify-center gap-4 mt-3">
                    <img src="/assets/instagram.png" alt="Instagram" />
                    <img src="/assets/facebook.png" alt="Facebook" />
                    <img src="/assets/twitter.png" alt="Twitter" />
                </div>
                <div className="mt-8 flex gap-4 text-slate-400 justify-between border-t border-slate-600 pt-6 mx-auto max-w-7xl text-sm p-1 lg:p-0 lg:text-sm">
                    <div>
                        <span>© 2026 KeenKeeper. All rights reserved.</span>
                    </div>
                    <div className="flex gap-4">
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                        <span>Cookies</span>
                    </div>
                </div>
            </footer>

            {toast ? (
                <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl shadow-slate-900/10">
                    <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{toast.message}</p>
                </div>
            ) : null}
        </div>
    );
}
