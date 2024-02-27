import React from 'react';
import { useRouter } from 'next/router';

const Navigation: React.FC = () => {
    const router = useRouter();

    const isActive = (pathname: string) => router.pathname === pathname ? 'text-blue-500' : 'text-neutral-500';

    return (
        <div className="w-full pt-14 justify-center items-start gap-6 inline-flex">
            <a href="/" className={`text-2xl cursor-pointer hover:-translate-y-1 transition-transform ${isActive('/')}`}>Home</a>
            <a href="/blog" className={`text-2xl cursor-pointer hover:-translate-y-1 transition-transform ${isActive('/blog')}`}>Blog</a>
            <a href="/contact" className={`text-2xl cursor-pointer hover:-translate-y-1 transition-transform ${isActive('/contact')}`}>Contact</a>
        </div>
    );
};

export default Navigation;
