import React from 'react';

const About: React.FC = () => {
    return (
        <div className="w-full px-4 py-2.5 flex justify-center items-center">
            <div className="max-w-[1200px] text-neutral-500 text-xl lg:flex lg:justify-between">
                <div className="lg:w-1/2 text-justify lg:pr-4">
                👋 Hi! I’m Dilermando Queiroz Neto from São Paulo, Brazil. I’m pursuing my Ph.D. in Computer Science at the Federal University of São Paulo, working on the <a href="https://fairmi.site" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">FairMI project</a>.
                My research focuses on developing methods to detect and remove bias in healthcare Foundation Models (FMs), especially for medical imaging. This work is crucial since biased AI can undermine equitable healthcare delivery for underrepresented communities.
                </div>
                <div className="lg:w-1/2 text-justify lg:pl-4 mt-4 lg:mt-0">
                This website showcases my doctoral research and other projects I’m passionate about. It’s an informal space where I share articles, presentations, and workshop materials.
                Join me as I navigate the fascinating world of AI fairness in healthcare! Explore the blog to follow my journey and contributions to making machine learning more equitable and safe 🚀.
                </div>
            </div>
        </div>
    );
};

export default About;