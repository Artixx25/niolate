import { useRouter } from "next/router";
import { GiMoebiusTriangle } from "react-icons/gi"

const SidebarLogo = () => {
    const router = useRouter()
    return (
        <div 
        onClick={() => router.push('/')}
        className="
            rounded-full
            h-14
            w-14
            p-4
            flex
            items-center
            justify-center
            hover:bg-violet-300
            hover:bg-opacity-10
            cursor-pointer
            transition
        ">
            <GiMoebiusTriangle size={28} color="white"/>
        </div>
    )
}

export default SidebarLogo;