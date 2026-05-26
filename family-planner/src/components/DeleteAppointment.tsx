import { Trash } from "lucide-react"

type ButtonProps = {
  onClick: () => void,
  children: string
}

export default function DeleteAppointment ({ onClick, children } : ButtonProps) {

    return(
        <button 
          className="flex items-center justify-center border-2 p-2 rounded-full bg-red-600/80 text-white cursor-pointer mr-[5%] shadow-md border-red-800/50"
          onClick={onClick}
        >
            <Trash size={18} className="mr-2"/>
            {children}
        </button>
    )
}