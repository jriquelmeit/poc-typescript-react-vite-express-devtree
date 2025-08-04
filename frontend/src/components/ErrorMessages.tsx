type ErrorMessagePops = {
    children: React.ReactNode
}

export default function ErrorMessage({children}: ErrorMessagePops) {
    return (
        <p className="bg-red-50 text-red-600 font-bold text-sm text-center ">
            {children}
        </p>
    );
}
