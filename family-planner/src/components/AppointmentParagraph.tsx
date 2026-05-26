export default function AptPar({ children, className } : { children: React.ReactNode, className?: string }) {
    return(
        <p className={`mt-2 mb-2 text-[14px] text-[#6B6358] ${className}`}>{children}</p>
    )
}