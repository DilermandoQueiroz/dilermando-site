import React from 'react';

const Skills: React.FC = () => {
    return (
        <div className="w-full py-24 flex justify-center items-center">
            <div className="grid grid-cols-4 flex flex-wrap justify-center items-center">
                <div className="text-lg text-center p-4 flex-1">🌩️Pytorch</div>
                <div className="text-lg text-center p-4 flex-1">🖥️ NextJs</div>
                <div className="text-lg text-center p-4 flex-1">💨 FastAPI</div>
                <div className="text-lg text-center p-4 flex-1">🎲PostgreSQL</div>
                <div className="text-lg text-center p-4 flex-1">🧠 Deep Learning</div>
                <div className="text-lg text-center p-4 flex-1">🌍 Foundation Models</div>
                <div className="text-lg text-center p-4 flex-1">👀 Computer Vision</div>
            </div>
        </div>
    );
};

export default Skills;  