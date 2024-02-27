import React from 'react';

const Skills: React.FC = () => {
    return (
        // <div className="w-full py-24 flex justify-center items-center">
        //     <div className="flex flex-wrap justify-center items-center">
        //         <div className="text-lg text-center p-4 flex-1">🌩️Pytorch</div>
        //         <div className="text-lg text-center p-4 flex-1">🖥️NextJs</div>
        //         <div className="text-lg text-center p-4 flex-1">💨FastAPI</div>
        //         <div className="text-lg text-center p-4 flex-1">🎲PostgreSQL</div>
        //         <div className="text-lg text-center p-4 flex-1">🧠Deep Learning</div>
        //         <div className="text-lg text-center p-4 flex-1">🌍Foundation Models</div>
        //         <div className="text-lg text-center p-4 flex-1">👀Computer Vision</div>
        //     </div>
        // </div>
        <div className="w-full h-full py-24 flex flex-col justify-center items-center gap-6">
            <div className="flex flex-row justify-center items-center gap-14 flex-wrap">
                <div className="text-xl">🌩️ Pytorch</div>
                <div className="text-xl">🖥️ NextJs</div>
                <div className="text-xl">💨 FastAPI</div>
                <div className="text-xl">🎲 PostgreSQL</div>
            </div>
            <div className="flex flex-row justify-center items-center gap-14 flex-wrap">
                <div className="text-xl">🧠 Deep Learning</div>
                <div className="text-xl">🌍 Foundation Models</div>
                <div className="text-xl">👀 Computer Vision</div>
            </div>
        </div>

    );
};

export default Skills;  