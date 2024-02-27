import React from 'react';

const Publication: React.FC = () => {
    return (
        <div className="flex justify-center items-center w-full">
    <div className="max-w-5xl p-5 border-b border-black flex flex-col justify-center items-center">
        <img className="max-w-full h-auto" src="https://via.placeholder.com/732x564" alt="Publication" />
        <div className="w-full mt-5">
            <div className="text-black text-3xl font-semibold">Título da publicação</div>
            <div className="text-black text-base font-normal mt-2">By: Dilermando Queiroz Neto</div>
            <div className="text-black text-base font-normal mt-1">Posted: January 03, 2024</div>
        </div>
    </div>
</div>



    );
};

export default Publication;