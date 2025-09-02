import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imagemForneto from "/src/assets/forneto-pizzaria 1.png";

import type { Variants } from "framer-motion";



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Adress: React.FC = () => {
  // Parallax control
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.section
      id="adress"
      className="bg-[#F4F4F4] py-32 sm:py-40 px-4 sm:px-8 md:px-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-16">
        
        {/* Coluna de Texto */}
        <motion.div
          variants={fadeInUp}
          className="flex-1 flex flex-col items-start"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#d8b348] mb-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Local
          </motion.h2>

          <motion.div
            className="w-16 h-1 bg-[#d8b348] mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <motion.p
            className="text-gray-700 text-base sm:text-lg leading-relaxed"
            variants={fadeInUp}
          >
            <strong>Data:</strong> 28 de Novembro às 18h
            <br />
            <br />
            <strong>Forneto Restaurante</strong>
            <br />
            R. José Maia Gomes, 173
            <br />
            Jatiúca, Maceió – AL, 57036-240
          </motion.p>
        </motion.div>

        {/* Coluna da Imagem com Parallax */}
     <motion.div
  variants={fadeInUp}
  className="flex-1 w-full flex justify-center md:justify-end mt-10 md:mt-0"
>
  <motion.img
    src={imagemForneto}
    alt="Forneto Restaurante"
    className="w-full md:w-[550px] lg:w-[600px] rounded-xl shadow-2xl object-cover"
    style={{ y: yParallax }}
    whileHover={{ scale: 1.05, rotate: 0.5 }}
    transition={{ type: "spring", stiffness: 220 }}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
  />
</motion.div>
      </div>
    </motion.section>
  );
};

export default Adress;
