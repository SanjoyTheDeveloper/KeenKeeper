import { RiHome2Line } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import { ImStatsDots } from "react-icons/im";

export function Navber() {
    return (
        <header className="fixed inset-x-0 top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-9xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="rounded-3xl  px-4 py-2 text-lg  ">
                        <span className="font-bold">Keen</span>
                        <span >Keeper</span>
                         
                    </div>
                    
                </div>
                <nav className="flex items-center gap-2">
                    
                   <span><RiHome2Line /></span><button className="rounded-ful text-sm mr-3 font-medium text-slate-700 transition hover:bg-slate-100">Home</button>
                    <span><IoTimeOutline /></span><button className="rounded-full text-sm mr-3 font-medium text-slate-700 transition hover:bg-slate-100">Timeline</button>
                    <span><ImStatsDots /></span><button className="rounded-full  text-sm font-medium text-slate-700 transition hover:bg-slate-100">Stats</button>
                </nav>
            </div>
        </header>
    );
}
