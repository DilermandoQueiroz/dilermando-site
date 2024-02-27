import React from 'react';

const About: React.FC = () => {
    return (
        <div className="w-full px-4 py-2.5 flex justify-center items-center">
            <div className="max-w-[600px] text-neutral-500 text-xl">
                Hello, I'm Dilermando Queiroz Neto, based in São Paulo, Brazil. I am currently a Ph.D. student in Computer Science at the Federal University of São Paulo. My doctoral research is part of the FairMI project, which aims to develop methods and tools to detect, mitigate, or remove bias to enhance the security of Machine Learning models deployed in the healthcare field, particularly involving image processing.<br/><br/>I've created this website to share and promote not only my doctoral work but also other projects I'm involved in. Here, you'll find a more informal approach to sharing articles and also presentations and workshops I've conducted. My goal is to keep you updated on my progress and contributions to the academic and research community. Welcome, and explore the blog!
            </div>
        </div>

    );
};

export default About;