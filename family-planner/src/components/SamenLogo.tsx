export default function SamenLogo( { className } : {className? : string}) {
    return (
        <div 
          className={`
            text-white
            text-2xl 
            rounded-xl 
            p-3 
            pl-5 
            pr-5 
            bg-black 
            font-[Instrument] 
            font-medium 
            italic 
            flex 
            items-center 
            justify-center
            ${className}
            `}
        >
            S
        </div>
    )
}