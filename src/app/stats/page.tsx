import { Navber } from "@/src/ui/Navber";

export default function StatsPage() {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-950">
            <Navber />
            <main className="mx-auto max-w-8xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <div className="rounded-sm border border-slate-200 bg-white p-12 shadow-sm">
                    <h1 className="text-3xl font-semibold text-slate-900">Stats</h1>
                    <p className="mt-4 text-slate-600">This is your stats dashboard. Use the navigation links to switch pages.</p>
                </div>
            </main>
        </div>
    );
}
