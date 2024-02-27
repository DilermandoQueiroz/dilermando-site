import React from 'react';

const Skills: React.FC = () => {
    return (
        <div className="w-full h-full py-24 flex flex-col justify-center items-center gap-6">
            <div className="flex flex-row justify-center items-center gap-14 sm:gap-8 md:gap-40 lg:gap-40 xl:gap-40 flex-wrap">
                <div className="text-xl font-bold">🌩️ Pytorch</div>
                <div className="text-xl font-bold">🖥️ NextJs</div>
                <div className="text-xl font-bold">💨 FastAPI</div>
                <div className="text-xl font-bold">🎲 PostgreSQL</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-14 sm:gap-8 md:gap-40 lg:gap-40 xl:gap-40 flex-wrap">
                <div className="text-xl font-bold">🧠 Deep Learning</div>
                <div className="text-xl font-bold">🌍 Foundation Models</div>
                <div className="text-xl font-bold">👀 Computer Vision</div>
            </div>
        </div>

    );
};

export default Skills;  