import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navber } from "@/src/ui/Navber";

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

async function getContact(id: string): Promise<Contact | undefined> {
    const filePath = path.join(process.cwd(), "public", "contacts.json");
    const content = await fs.readFile(filePath, "utf8");
    const contacts: Contact[] = JSON.parse(content);
    return contacts.find((contact) => contact.id === Number(id));
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const contact = await getContact(id);

    if (!contact) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-100 text-slate-950">
            <Navber />

            <main className="flex-1 mx-auto max-w-8xl mt-20 px-4 py-10 sm:px-6 lg:px-8">
              

                <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
                    <div>

                    
                    <aside className="space-y-6 rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="space-y-6 text-center">
                            <div className="mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                                <img src={contact.picture} alt={contact.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                                <p className="text-2xl font-semibold text-slate-900">{contact.name}</p>
                                
                            </div>
                            <div className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold shadow-sm shadow-slate-200/50 ${statusClasses[contact.status] ?? "bg-slate-100 text-slate-700"}`}>
                                {contact.status}
                            </div>
                            <div className="flex flex-wrap justify-center gap-2">
                                {contact.tags.map((tag) => (
                                    <span key={tag} className="rounded-full px-3 py-1 text-xs font-semibold bg-green-100 text-green-800">
                                        {tag}
                                    </span>
                                ))}
                                <span>{contact.bio}</span>
                                <span>{contact.email}</span>                      
                                </div>
                            
                        </div>

                        
                    </aside>
                    <div className="grid gap-3 mt-2 ">
                            <button className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-800">
                                snoze 2 weeks
                            </button>
                            <button className="rounded-sm border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                                Archive 
                            </button>
                            <button className="rounded-sm border border-slate-200 bg-slate-50  px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">
                                Delete
                            </button>
                        </div>
                    </div>

                    

                    <section className="space-y-6">
                       

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                                
                                <p className="mt-4 text-3xl font-semibold text-slate-900">{contact.days_since_contact}</p>
                                <p className="text-sm text-slate-500">Days Since Contact</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                               
                                <p className="mt-4 text-3xl font-semibold text-slate-900">{contact.goal} </p>
                                <p className="text-sm ">Goal (Days)</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center">
                                <p className="mt-4 text-3xl font-semibold text-slate-900">{contact.next_due_date}</p>
                                <p className="text-sm text-slate-500">Next due</p>
                            </div>
                            
                           
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <div className="gap-4">
                                <div className="flex gap-4">
                                    <div>Relationship Goal</div>
                                    <div><button>Edit</button></div>
                                </div>
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
        </div>
    );
}
