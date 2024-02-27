import React from 'react';

const Skills: React.FC = () => {
    return (
        <div className="w-full h-full py-24 flex flex-col justify-center items-center gap-6">
            <div className="flex flex-row justify-center items-center gap-14 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-40 flex-wrap">
                <div className="text-xl">🌩️ Pytorch</div>
                <div className="text-xl">🖥️ NextJs</div>
                <div className="text-xl">💨 FastAPI</div>
                <div className="text-xl">🎲 PostgreSQL</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-14 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-40 flex-wrap">
                <div className="text-xl">🧠 Deep Learning</div>
                <div className="text-xl">🌍 Foundation Models</div>
                <div className="text-xl">👀 Computer Vision</div>
            </div>
        </div>

    );
};

export default Skills;  