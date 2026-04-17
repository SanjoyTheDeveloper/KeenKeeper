"use client";

import { useEffect, useState } from "react";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineTextsms } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { Navber } from "@/src/ui/Navber";
import { getTimelineEntries, TimelineEntry } from "@/src/lib/timeline";

type FilterType = "All" | "Call" | "Text" | "Video";

function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

export default function TimelinePage() {
    const [entries, setEntries] = useState<TimelineEntry[]>([]);
    const [filter, setFilter] = useState<FilterType>("All");

    useEffect(() => {
        setEntries(getTimelineEntries());
    }, []);

    const filteredEntries =
        filter === "All" ? entries : entries.filter((entry) => entry.type === filter);

    return (
        <div className="min-h-screen bg-slate-100 text-slate-950">
            <Navber />
            <main className="mx-auto mt-9 max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <div className="">
                    <div>
                        <h1 className="text-4xl  font-semibold text-slate-900">Timeline</h1>
                    </div>
                    <div className="rounded-2xl py-4">
                        
                        <select
                            id="timeline-filter"
                            value={filter}
                            onChange={(event) => setFilter(event.target.value as FilterType)}
                            className="mt-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                        >
                            <option value="All">Filter Timeline</option>
                            <option value="Call">Call</option>
                            <option value="Text">Text</option>
                            <option value="Video">Video</option>
                        </select>
                    </div>
                </div>

                <div className=" space-y-4">
                    {filteredEntries.length === 0 ? (
                        <div className="rounded-sm border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
                            No interactions match this filter. Adjust the filter or add a new timeline entry from a friend’s details page.
                        </div>
                    ) : (
                        filteredEntries.map((entry) => {
                            const Icon = entry.type === "Call" ? BiPhoneCall : entry.type === "Text" ? MdOutlineTextsms : IoVideocamOutline;
                            return (
                                <div key={entry.id} className="grid gap-4 rounded-sm border border-slate-200 bg-white p-2 shadow-sm sm:grid-cols-[auto_1fr_auto] sm:items-center">
                                    <div className="flex h-14 w-14 items-center justify-center  text-slate-900">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-slate-900">{entry.title}</p>
                                        <div className=" text-sm text-slate-500">{formatDate(entry.date)}</div>
                                    </div>
                                    
                                </div>
                            );
                        })
                    )}
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
