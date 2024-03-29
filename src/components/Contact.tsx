import React from 'react';
import GitHub from '../components/svgs/github';
import Envelope from '../components/svgs/envelope';
import LinkedIn from '../components/svgs/linkedin';
import GoogleScholar from '../components/svgs/scholar';

const contacts = [
  {
    Comp: GoogleScholar,
    alt: 'google scholar icon',
    link: 'https://scholar.google.com/citations?hl=pt-BR&user=QOr1PxcAAAAJ',
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/DilermandoQueiroz',
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: 'https://www.linkedin.com/in/dilermando-queiroz-neto-a25b29179/',
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:dilermando.queiroz@unifesp.br',
  },
];

const Contact: React.FC = () => {
    return (
        <div className="w-full h-full flex-col justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-5xl font-extrabold">Contact</div>
            <div className="text-center text-xl">Dilermando Queiroz Neto — Machine Learning</div>
            <div className="justify-center items-center gap-7 inline-flex">
                {contacts.map(({ Comp, link, alt }) => (
                    <a key={link} href={link} aria-label={alt} className="focus:outline-none focus:ring focus:border-blue-300">
                        <Comp height={32} />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Contact;
