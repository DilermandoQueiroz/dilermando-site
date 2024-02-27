import React from 'react';

const Navigation: React.FC = () => {
    return (
        <div className="w-full pt-14 justify-center items-start gap-6 inline-flex text-neutral-500">
            <a href="/" className="text-2xl font-normal font-['Inter']">Home</a>
            <a href="/blog" className="text-2xl font-normal font-['Inter']">Blog</a>
            <a href="/contact" className="text-2xl font-normal font-['Inter']">Contact</a>
        </div>
    );
};

export default Navigation;