import React from 'react';

interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
    return (
        <div className="w-full h-full py-36 justify-center items-center inline-flex px-2">
            <div className="grow shrink basis-0 self-stretch text-center text-black text-4xl font-bold max-w-5xl">{title}</div>
        </div>
    );
};

export default Title;