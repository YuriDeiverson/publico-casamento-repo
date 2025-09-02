import React from "react";
import { motion } from "framer-motion";
import imagemCriancas from "/src/assets/foto-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faLocationDot,
  faUtensils,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import type { Variants } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants : Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariants : Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  // A correção foi feita aqui: troquei o array por uma string padrão.
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: "easeInOut" } },
};

const Header: React.FC = () => {
  return (
    <header className="relative w-full bg-[#F4F4F4] py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="relative flex-1 flex flex-col items-start md:pl-10">
          <motion.div variants={itemVariants} className="absolute left-0 top-0 bottom-0 w-1 h-20 bg-[#d8b348] hidden md:block" />

          <div className="flex flex-col w-full">
            <motion.h1 variants={itemVariants} className="text-xl sm:text-2xl text-gray-700 font-light">
              Bem-vindos ao <span className="text-[#d8b348]">💛</span>
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2 leading-tight">
              Casamento de Leila e Yuri
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-500 italic mt-4 text-base sm:text-lg max-w-lg">
              “O amor é o encontro de duas almas dispostas a serem felizes.”
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-x-8 gap-y-6 mt-16 w-full max-w-lg">
              <a href="#about" className="flex items-center gap-4 text-gray-700 font-medium hover:text-[#d8b348] transition">
                <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6 text-[#D8B348]" />
                Nossa história
              </a>
              <a href="#adress" className="flex items-center gap-4 text-gray-700 font-medium hover:text-[#D8B348] transition">
                <FontAwesomeIcon icon={faLocationDot} className="w-6 h-6 text-[#D8B348]" />
                Endereço
              </a>
              <a href="#menu" className="flex items-center gap-4 text-gray-700 font-medium hover:text-[#D8B348] transition">
                <FontAwesomeIcon icon={faUtensils} className="w-6 h-6 text-[#D8B348]" />
                Menu
              </a>
              <a href="#gifts" className="flex items-center gap-4 text-gray-700 font-medium hover:text-[#D8B348] transition">
                <FontAwesomeIcon icon={faGift} className="w-6 h-6 text-[#D8B348]" />
                Lista de presentes
              </a>
            </motion.div>
          </div>
        </div>

      <motion.div
  variants={imageVariants}
  className="flex-1 w-full flex justify-center mt-10 md:mt-0"
>
  <img
    src={imagemCriancas}
    alt="Foto do casal criança"
    className="w-full sm:w-3/4 md:w-full rounded-2xl mx-auto 
               object-contain sm:object-cover"
  />
</motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <a href="#about" className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center text-[#D8B348] hover:bg-gray-100 transition animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </motion.div>
    </header>
  );
};

export default Header;