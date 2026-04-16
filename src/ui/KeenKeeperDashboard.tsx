"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Navber } from "./Navber";

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

const stats = [
    { value: 12, label: "Contacts Shown" },
    { value: 5, label: "Overdue" },
    { value: 4, label: "On Track" },
    { value: 3, label: "Almost Due" },
];

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

const tagClasses: Record<string, string> = {
    college: "bg-slate-100 text-slate-700",
    "close friend": "bg-cyan-100 text-cyan-700",
    work: "bg-violet-100 text-violet-700",
    project: "bg-emerald-100 text-emerald-700",
    family: "bg-fuchsia-100 text-fuchsia-700",
    cousin: "bg-orange-100 text-orange-700",
    "book club": "bg-sky-100 text-sky-700",
    friend: "bg-emerald-100 text-emerald-700",
    neighbor: "bg-slate-100 text-slate-700",
    "gym buddy": "bg-amber-100 text-amber-700",
    school: "bg-indigo-100 text-indigo-700",
    mentor: "bg-sky-100 text-sky-700",
    travel: "bg-emerald-100 text-emerald-700",
    startup: "bg-lime-100 text-lime-700",
    partner: "bg-rose-100 text-rose-700",
    aunt: "bg-rose-100 text-rose-700",
    music: "bg-emerald-100 text-emerald-700",
    bandmate: "bg-violet-100 text-violet-700",
};

function StatCard({ value, label }: { value: number; label: string }) {
    return (
        <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-4xl font-semibold text-slate-900">{value}</p>
            <p className="mt-2 text-sm text-slate-600">{label}</p>
        </div>
    );
}

function ContactCard({ contact }: { contact: Contact }) {
    return (
        <div className="rounded-sm border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md">
            <div className="text-center">


                <div className="flex justify-center">
                    <img src={contact.picture} alt={contact.name} className="h-16 w-16 rounded-full object-cover" />

                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{contact.bio}</p>
                <div className="mt-4 flex justify-center flex-wrap gap-2">
                    {contact.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${tagClasses[tag] ?? "bg-slate-100 text-slate-700"}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusClasses[contact.status] ?? "bg-slate-100 text-slate-700"}`}>
                        {contact.status}
                    </span>

                </div>

            </div>
        </div>
    );
}

export default function KeenKeeperDashboard() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        fetch("/contacts.json")
            .then((res) => res.json())
            .then((data: Contact[]) => setContacts(data.slice(0, 12)))
            .catch(() => setContacts([]));
    }, []);

    const shownContacts = contacts.slice(0, 12);

    return (
        <div className="min-h-screen bg-slate-100 text-slate-950">
            <Navber />

            <main className="mx-auto max-w-8xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <section className="p-8 sm:p-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center">
                            <p className="text-5xl font-bold">Friends to keep close in your life</p>
                            <h1 className="mt-4 text-xl text-slate-700">Your personal shelf of meaningful connections.</h1>
                            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                                Browse, tend, and nurture the relationships that matter most.
                            </p>
                        </div>
                        <div className="flex justify-center">
                            <button className="mt-8 inline-flex items-center justify-center rounded-sm bg-green-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-700">
                                + Add a Friend
                            </button>
                        </div>
                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 text-center">
                            {stats.map((stat) => (
                                <StatCard key={stat.label} value={stat.value} label={stat.label} />
                            ))}
                        </div>

                        <div className="mt-12 border-t border-slate-200 pt-12">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">Your Friends</h2>

                                </div>

                            </div>
                            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                {shownContacts.map((contact) => (
                                    <ContactCard key={contact.id} contact={contact} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
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
                        <span className="">Privacy Policy</span>
                        <span className="">Terms of Service</span>
                        <span className="">Cookies</span>
                    </div>

                </div>
            </footer>
        </div>
    );
}
