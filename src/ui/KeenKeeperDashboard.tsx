import { Navber } from "./Navber";

const stats = [
    { value: 10, label: "Total Friends" },
    { value: 3, label: "On Track" },
    { value: 6, label: "Need Attention" },
    { value: 12, label: "Interactions This Month" },
];

const friends = [
    { name: "David Kim", status: "Overdue", tags: ["Work"] },
    { name: "Emma Wilson", status: "Overdue", tags: ["Family"] },
    { name: "Lisa Nakamura", status: "Overdue", tags: ["Work"] },
    { name: "James Wright", status: "Overdue", tags: ["Hobby", "Travel"] },
    { name: "David Kim", status: "Almost Due", tags: ["Work"] },
    { name: "Emma Wilson", status: "On Track", tags: ["Family"] },
    { name: "Lisa Nakamura", status: "On Track", tags: ["Work"] },
    { name: "James Wright", status: "Almost Due", tags: ["Hobby", "Travel"] },
    { name: "David Kim", status: "Almost Due", tags: ["Work"] },
    { name: "Emma Wilson", status: "Overdue", tags: ["Family"] },
    { name: "Lisa Nakamura", status: "Overdue", tags: ["Work"] },
    { name: "James Wright", status: "On Track", tags: ["Hobby", "Travel"] },
];

const statusClasses: Record<string, string> = {
    Overdue: "bg-rose-500/10 text-rose-700",
    "Almost Due": "bg-amber-500/10 text-amber-700",
    "On Track": "bg-emerald-500/10 text-emerald-700",
};

const tagClasses: Record<string, string> = {
    Work: "bg-slate-100 text-slate-700",
    Family: "bg-cyan-100 text-cyan-700",
    Hobby: "bg-violet-100 text-violet-700",
    Travel: "bg-emerald-100 text-emerald-700",
};

function StatCard({ value, label }: { value: number; label: string }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-4xl font-semibold text-slate-900">{value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-500">{label}</p>
        </div>
    );
}

function FriendCard({ name, status, tags }: { name: string; status: string; tags: string[] }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    {name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                </div>
                <div>
                    <p className="font-semibold text-slate-900">{name}</p>
                    <p className="mt-1 text-sm text-slate-500">Keep this relationship warm</p>
                </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                    <span key={tag} className={`rounded-full px-3 py-1 text-xs font-semibold ${tagClasses[tag] ?? "bg-slate-100 text-slate-700"}`}>
                        {tag}
                    </span>
                ))}
            </div>
            <div className={`mt-5 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusClasses[status] ?? "bg-slate-100 text-slate-700"}`}>
                {status}
            </div>
        </div>
    );
}

export default function KeenKeeperDashboard() {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-950">
            <Navber />

            <main className="mx-auto max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <section className="rounded-4xl border border-slate-200 bg-white/90 p-8 shadow-lg backdrop-blur-xl sm:p-12">
                    <div className="mx-auto max-w-4xl">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Friends to keep close in your life</p>
                                <h1 className="mt-4 text-4xl font-bold text-slate-950 sm:text-5xl">Your personal shelf of meaningful connections.</h1>
                                <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                                    Browse, tend, and nurture the relationships that matter most. Keep every friendship active with simple reminders and helpful status insights.
                                </p>
                                <button className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-700">
                                    + Add a Friend
                                </button>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:w-96">
                                {stats.map((stat) => (
                                    <StatCard key={stat.label} value={stat.value} label={stat.label} />
                                ))}
                            </div>
                        </div>

                        <div className="mt-12">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-slate-900">Your Friends</h2>
                                <span className="text-sm text-slate-500">12 profiles</span>
                            </div>
                            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {friends.map((friend, index) => (
                                    <FriendCard key={`${friend.name}-${index}`} name={friend.name} status={friend.status} tags={friend.tags} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-200 bg-slate-950 py-10 text-center text-white">
                <p className="text-3xl font-bold">KeenKeeper</p>
                <p className="mt-3 text-sm text-slate-400">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
                <div className="mt-6 flex justify-center gap-4 text-slate-400">
                    <span className="rounded-full border border-slate-700 px-3 py-2 text-xs uppercase tracking-[0.3em]">Privacy Policy</span>
                    <span className="rounded-full border border-slate-700 px-3 py-2 text-xs uppercase tracking-[0.3em]">Terms of Service</span>
                    <span className="rounded-full border border-slate-700 px-3 py-2 text-xs uppercase tracking-[0.3em]">Cookies</span>
                </div>
            </footer>
        </div>
    );
}
