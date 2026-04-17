"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiHome2Line } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import { ImStatsDots } from "react-icons/im";

const navItems = [
    { label: "Home", href: "/", icon: RiHome2Line },
    { label: "Timeline", href: "/timeline", icon: IoTimeOutline },
    { label: "Stats", href: "/stats", icon: ImStatsDots },
];

export function Navber() {
    const pathname = usePathname();

    return (
        <header className="fixed inset-x-0 top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-9xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="rounded-3xl px-4 py-2 text-lg">
                        <img src="/assets/logo.png" alt="KeenKeeper logo" className="lg:h-8 lg:w-auto w-22" />
                    </div>
                </div>
                <nav className="flex items-center gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const activeClasses = isActive
                            ? "bg-green-500 text-white"
                            : "bg-transparent text-slate-700 hover:bg-slate-100";
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition ${activeClasses}`}
                            >
                                <item.icon />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
