type ButtonProps = {
  onClick: () => void,
  children: string
}

export default function OrangePillButton ({ onClick, children } : ButtonProps) {

    return(
        <button 
          className="ml-auto border-2 p-2 rounded-full bg-[#D97757] text-white cursor-pointer mr-[5%]"
          onClick={onClick}
        >
            {children}
        </button>
    )
}