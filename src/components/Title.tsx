import React from 'react';

interface TitleProps {
    title: string;
    authors?: string;
    date?: string;
    paperLink?: string;
}

const Title: React.FC<TitleProps> = ({ title, authors, date, paperLink }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full py-24 sm:py-36 px-2">
            <div className="text-center pb-6">{date}</div>
            <div className="text-center text-4xl font-bold max-w-5xl pb-6">{title}</div>
            <div className="text-center pb-12 max-w-2xl">{authors}</div>
            {paperLink && (
                <div className="text-center">
                    <a href={paperLink}>
                        <div className="w-48 h-14 rounded-3xl border border-black justify-center items-center inline-flex hover:text-white hover:bg-black transition-all duration-300">
                            <div className="text-xl">Read paper ↗︎</div>
                        </div>
                    </a>
                </div>
            )}
        </div>

    );
};

export default Title;