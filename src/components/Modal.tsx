import { useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: string;
};

export default function Modal({ isOpen, onClose, title, children, footer, width = "max-w-md" }: ModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />

            <div
                className={`relative z-10 w-full ${width} transform overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white">{title || "Info"}</h3>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="px-6 py-4 text-white/80">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-white/5 px-6 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
