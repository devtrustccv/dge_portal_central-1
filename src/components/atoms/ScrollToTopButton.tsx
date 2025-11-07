'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        const scrollStep = () => {
            const distance = window.scrollY;
            if (distance > 0) {
                window.scrollTo(0, distance - distance / 10);
                requestAnimationFrame(scrollStep);
            }
        };
        requestAnimationFrame(scrollStep);
    };

    return (
        isVisible && (
            <div className='flex flex-col gap-5'>
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-20 right-6 p-3 bg-gradient-to-r from-[#81D1B3] to-[#4C85B7] text-white rounded-full transition-all z-50 animate-ping-pong"
                    aria-label="Voltar ao topo"
                >
                    <ArrowUp className="w-5 h-5"/>
                </button>
                <span
                    className="fixed bottom-[42px] right-[26px] w-10 h-1 bg-gradient-to-r from-[#81D1B3] to-[#4C85B7] rounded-full shadow-lg shadow-[#4C85B7]"
                    aria-hidden="true"
                />

                <span
                    className="fixed bottom-5 right-[26px] w-10 h-1 bg-gradient-to-r from-[#81D1B3] to-[#4C85B7] rounded-full shadow-lg shadow-[#4C85B7]"
                    aria-hidden="true"
                />

            </div>

        )
    );
}