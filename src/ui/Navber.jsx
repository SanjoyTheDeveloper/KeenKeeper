import { RiHome2Line } from "react-icons/ri";
import { IoTimeOutline } from "react-icons/io5";
import { ImStatsDots } from "react-icons/im";

export function Navber() {
    return (
        <header className="fixed inset-x-0 top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-9xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="rounded-3xl  px-4 py-2 text-lg  ">
                        <img src="" alt="" />
                         
                    </div>
                    
                </div>
                <nav className="flex items-center gap-2">
                    
                   <span className="flex bg-green-500 py-2 px-1 rounded-sm items-center gap-2"><RiHome2Line /><button className="rounded-ful text-sm mr-3 font-medium text-slate-700 transition">Home</button></span>
                    <span className="flex items-center gap-2"><IoTimeOutline /><button className="rounded-full text-sm mr-3 font-medium text-slate-700 transition ">Timeline</button></span>
                    <span className="flex items-center gap-2"><ImStatsDots /><button className="rounded-full  text-sm font-medium text-slate-700 transition ">Stats</button></span>
                </nav>
            </div>
        </header>
    );
}
