import Link from 'next/link';
import React from 'react';

interface PublicationProps {
    title: string;
    date: string;
    id: string;
    image: string;
}

const Publication: React.FC<PublicationProps> = ({ title, date, id, image}) => {
    return (
        <div className="flex justify-center items-center w-full p-5">
            <Link href={`/blog/${id}`}>
                <div className="max-w-5xl border-b border-black flex flex-col items-center">
                    <div className="flex justify-center items-center w-full">
                        <div className="w-[20rem] md:w-[35rem] h-96 overflow-hidden rounded-xl">
                            <img 
                                className="w-full h-full object-cover" 
                                src={image.toString()} 
                                alt={title} 
                            /> 
                        </div>
                    </div>
                    <div className="py-4 w-[20rem] md:w-[35rem]">
                        <div className="text-3xl font-semibold">{title}</div>
                        <div className="text-base font-normal">{date}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Publication;