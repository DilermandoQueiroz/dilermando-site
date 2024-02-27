import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Navigation: React.FC = () => {
    const router = useRouter();

    const isActive = (pathname: string) => router.pathname === pathname ? 'text-blue-500' : 'text-neutral-500';

    return (
        <div className="w-full pt-14 justify-center items-start gap-6 inline-flex">
            <Link href="/" className={`text-xl cursor-pointer hover:-translate-y-1 transition-transform ${isActive('/')}`}>
                Home
            </Link>
            <Link href="/blog" className={`text-xl cursor-pointer hover:-translate-y-1 transition-transform ${isActive('/blog')}`}>
                Blog
            </Link>
            <Link href="/contact" className={`text-xl cursor-pointer hover:-translate-y-1 transition-transform ${isActive('/contact')}`}>
                Contact
            </Link>
        </div>
    );
};

export default Navigation;
