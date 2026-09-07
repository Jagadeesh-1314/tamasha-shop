import { FiArrowLeft, FiHome, FiSearch } from "react-icons/fi";

interface NotFoundProps {
    onGoHome?: () => void;
}

const NotFound = ({ onGoHome }: NotFoundProps) => {
    const handleGoHome = () => {
        if (onGoHome) {
            onGoHome();
        } else {
            window.location.href = "/";
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f4ef] px-4">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0">
                <div className="shop-grid absolute inset-0 opacity-50" />

                <div className="absolute left-[8%] top-[15%] h-24 w-24 rounded-full bg-[#e96b4c]/10 blur-2xl" />

                <div className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full bg-[#f4a08b]/15 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
                {/* 404 */}
                <div className="relative select-none">
                    <p className="font-serif text-[clamp(8rem,28vw,16rem)] font-bold leading-none tracking-[-0.08em] text-[#201d1a]">
                        4<span className="text-[#e96b4c]">0</span>4
                    </p>

                    <div className="absolute inset-x-0 bottom-3 mx-auto h-3 max-w-75 rounded-full bg-[#201d1a]/5 blur-md" />
                </div>

                {/* Content */}
                <div className="relative mt-2">
                    <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#e96b4c] shadow-sm ring-1 ring-[#201d1a]/5">
                        <FiSearch size={21} />
                    </div>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e96b4c]">
                        Page not found
                    </p>

                    <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#201d1a] sm:text-4xl">
                        Looks like this page wandered off.
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#201d1a]/55">
                        We couldn't find the page you're looking for. It may have
                        moved, disappeared, or never existed in the first place.
                    </p>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <button
                            onClick={handleGoHome}
                            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#201d1a] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#e96b4c] hover:text-[#201d1a] active:scale-95"
                        >
                            <FiHome size={17} />
                            Back to Shop
                        </button>

                        <button
                            onClick={() => window.history.back()}
                            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#201d1a] shadow-sm ring-1 ring-[#201d1a]/10 transition hover:ring-[#201d1a]/25 active:scale-95"
                        >
                            <FiArrowLeft size={17} />
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Bottom message */}
                <p className="mt-12 text-xs text-[#201d1a]/35">
                    Don't worry, there's plenty more to discover.
                </p>
            </div>
        </main>
    );
};

export default NotFound;
