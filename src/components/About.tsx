import React from "react";
import { motion } from "framer-motion"; // 1. Importe o motion
import type { Variants } from "framer-motion";

// TODO: Troque os placeholders pelas suas 6 fotos do casal
// Sugestão: Coloque as fotos em ordem cronológica, da mais antiga para a mais nova.
import casalFoto1 from "/src/assets/casal-foto-6.jpg"; // Foto mais antiga
import casalFoto2 from "/src/assets/casal-foto-2.jpg";
import casalFoto3 from "/src/assets/casal-foto-3.jpg";
import casalFoto5 from "/src/assets/casal-3.jpg";
import casalFoto6 from "/src/assets/casal-2.jpg";
import casalFoto7 from "/src/assets/casal-1.png"; // Foto mais recente

// 2. Definição das variantes de animação para um código mais limpo
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Atraso entre a animação do texto e das fotos
    },
  },
};

const textVariants : Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const photoTimelineVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25, // Atraso entre a animação de cada foto
    },
  },
};

const photoVariants : Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};


const About: React.FC = () => {
  const photos = [
    { src: casalFoto2, alt: "Primeira viagem", caption: "// 2024", position: "top-0 left-10", rotation: "-rotate-3" },
    { src: casalFoto7, alt: "Comemoração especial", caption: "// 2023", position: "top-32 right-8", rotation: "rotate-2" },
    { src: casalFoto3, alt: "Um momento especial", caption: "// 2022", position: "top-64 left-12", rotation: "rotate-4" },
    { src: casalFoto1, alt: "Dois anos juntos", caption: "// 2021", position: "top-96 right-16", rotation: "-rotate-5" },
    { src: casalFoto6, alt: "Um ano juntos", caption: "// 2020", position: "top-[30rem] left-8", rotation: "rotate-2" },
    { src: casalFoto5, alt: "Início do namoro", caption: "// 2019", position: "top-[38rem] right-10", rotation: "-rotate-3" },
  ];

  return (
    <section id="about" className="bg-[#F4F4F4] py-32 sm:py-40 px-4 sm:px-8 md:px-16 overflow-x-hidden">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-16 md:gap-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* --- Coluna de Texto à esquerda com animação --- */}
        <motion.div variants={textVariants} className="flex-1 flex flex-col items-start relative md:pl-8 z-10">
          <div className="absolute left-0 top-0 w-1 h-20 bg-[#d8b348] hidden md:block" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#d8b348] mb-6 pl-4 md:pl-0">
            Nossa história
          </h2>

          <div className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4 pl-4 md:pl-0 space-y-6">
            <p>
              Leila e Yuri se conheceram aos 19 anos, através de um aplicativo
              de namoro. Na época, não imaginavam que algumas conversas
              tímidas, encontros casuais e afinidades improváveis seriam o
              começo de algo tão forte. Com o tempo, aquele sentimento
              cresceu, sobreviveu a fases difíceis, amadureceu… e hoje, está
              pronto para dar um novo passo.
            </p>
            <p>
              Eles não são um casal de conto de fadas, nem um clichê de comédia
              romântica. São só duas pessoas reais, com seus jeitos únicos,
              escrevendo uma história cheia de verdade, parceria e afeto.
            </p>
            <p>
              Ela é copywriter. Ele é desenvolvedor. E juntos formam a dupla
              perfeita: Dev e copy, ele constrói os códigos, ela dá alma às
              palavras. Uma combinação improvável para uns, mas perfeita para
              quem acredita que o amor mora nos detalhes, inclusive nos mais
              nerds. Essa é só a introdução de um novo capítulo. E a história
              está só começando.
            </p>
          </div>
        </motion.div>

        {/* --- Colagem de Imagens "Linha do Tempo" à direita com animação --- */}
        <motion.div variants={photoTimelineVariants} className="flex-1 flex justify-center items-start w-full mt-10 md:mt-0 min-h-[800px]">
          <div className="relative w-full max-w-lg h-full">
            {/* A Linha do Tempo em SVG */}
            <svg
              className="absolute top-0 left-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400 800"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 200 0 V 120 L 300 220 V 320 L 150 450 V 550 L 280 680 V 800"
                stroke="#d1d5db"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {photos.map((photo, index) => (
              <motion.div
                key={index}
                variants={photoVariants}
                className={`absolute transform transition-transform duration-300 ease-in-out hover:scale-110 hover:z-20 group ${photo.position} ${photo.rotation}`}
              >
                {/* Polaroid */}
                <div className="bg-white p-2 pb-2 rounded-sm shadow-xl">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-40 h-40 object-cover"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/300x300/FBBF24/374151?text=Foto+${index + 1}`; }}
                  />
                  <p className="font-mono text-xs text-gray-400 mt-2 pl-1 group-hover:text-yellow-600 transition-colors">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
