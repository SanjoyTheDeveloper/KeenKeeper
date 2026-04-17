import { Navber } from "@/src/ui/Navber";

const interactionData = [
    { label: "Text", color: "#8b5cf6", value: 28 },
    { label: "Call", color: "#064e3b", value: 42 },
    { label: "Video", color: "#22c55e", value: 30 },
];

export default function StatsPage() {
    const total = interactionData.reduce((sum, item) => sum + item.value, 0);
    const ringStyle = {
        background: `conic-gradient(${interactionData
            .map((item, index) => {
                const start = interactionData
                    .slice(0, index)
                    .reduce((sum, prev) => sum + prev.value, 0);
                const end = start + item.value;
                return `${item.color} ${start * 3.6}deg ${end * 3.6}deg`;
            })
            .join(", ")})`,
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-950">
            <Navber />
            <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
                <div className="rounded-3xl  p-10 shadow-md shadow-slate-200/40">
                    <div className="mb-8">
                        <h1 className="text-5xl font-semibold tracking-tight text-slate-950">Friendship Analytics</h1>
                    </div>

                    <div className="rounded-sm border border-slate-200 bg-slate-50 p-8 shadow-sm">
                        <div>
                            <p className="text-xl font-semibold ">By Interaction Type</p>

                        </div>
                        <div className="flex flex-col items-center justify-center mt-6">


                            <div className="relative mx-auto flex items-center justify-center  h-72 w-72 sm:mx-0">
                                <div className="absolute inset-0 rounded-full border border-slate-200 bg-white" style={ringStyle} />
                                <div className="absolute inset-6 rounded-full bg-slate-100" />
                                <div className="absolute inset-16 flex items-center justify-center rounded-full bg-white text-center">
                                    <div>
                                        <p className="text-sm text-slate-500">Total</p>
                                        <p className="text-3xl font-semibold text-slate-950">{total}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex">
                                {interactionData.map((item) => (
                                    <div key={item.label} className="flex items-center gap-1 p-4 ">
                                        <span className="flex h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{item.label}</p>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
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
                        <span className="">Privacy Policy</span>
                        <span className="">Terms of Service</span>
                        <span className="">Cookies</span>
                    </div>

                </div>
            </footer>
        </div>
    );
}
