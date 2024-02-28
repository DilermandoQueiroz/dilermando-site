import Link from 'next/link';
import React from 'react';

interface PublicationProps {
    title: string;
    date: string;
    id: string;
}

const Publication: React.FC<PublicationProps> = ({ title, date, id }) => {
    return (
        <div className="flex justify-center items-center w-full">
            <Link href={`/blog/${id}`}>
            <div className="max-w-5xl p-5 border-b border-black flex flex-col justify-center items-center">
                {/* <img className="max-w-full h-auto" src="https://via.placeholder.com/732x564" alt="Publication" /> */}
                <div className="w-full mt-5">
                    <div className="text-black text-3xl font-semibold">{title}</div>
                    <div className="text-black text-base font-normal mt-1">{date}</div>
                </div>
            </div>
            </Link>
        </div>
    );
};

export default Publication;