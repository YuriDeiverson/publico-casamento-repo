import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Easing } from "framer-motion";

// Easing cubic-bezier equivalente ao easeOut
const easeOut: Easing = [0.33, 1, 0.68, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: easeOut } 
  },
};

const staggerChildren: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const DressCode: React.FC = () => {
  return (
    <section id="dresscode" className="bg-[#F4F4F4] py-32 sm:py-40 px-6 md:px-12">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        {/* Coluna de Texto */}
        <motion.div
          className="flex-1 flex flex-col items-start relative md:pl-8"
          variants={fadeInUp}
        >
          <motion.div
            className="absolute left-0 top-0 w-1 h-20 bg-[#d8b348] hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: easeOut }}
          />

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#d8b348] mb-6 pl-4 md:pl-0"
            variants={fadeInUp}
          >
            Dress Code
          </motion.h2>

          <motion.div
            className="text-gray-700 space-y-6 text-base sm:text-lg leading-relaxed mt-4 pl-4 md:pl-0"
            variants={staggerChildren}
          >
            <motion.p variants={fadeInUp}>
              Nosso casamento será uma celebração intimista e vai acontecer em
              um restaurante charmoso que combina perfeitamente com o momento
              especial que estamos vivendo.
            </motion.p>

            <motion.p variants={fadeInUp}>
              Queremos que vocês se sintam confortáveis e lindos, mas com um
              toque de sofisticação. Não precisa ir de gala, nem usar salto se
              não quiser!
            </motion.p>

            <motion.div
              className="bg-white/60 p-6 rounded-2xl border border-gray-200"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="font-bold text-gray-800">👉 Dress code sugerido:</p>
              <p>Minimalista, formal e com a sua personalidade.</p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="font-bold text-gray-800 text-xl mb-4 mt-6">
                ✨ Evitem:
              </h3>
              <motion.ul
                className="space-y-4"
                variants={staggerChildren}
              >
                <motion.li
                  className="flex items-start gap-3"
                  variants={fadeInUp}
                  whileHover={{ x: 4 }}
                >
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-[#d8b348] mt-1.5"
                  />
                  <span>
                    <strong>Branco e off-white</strong>, que são cores
                    reservadas à noiva (sim, a tradição permanece viva! 😄)
                  </span>
                </motion.li>

                <motion.li
                  className="flex items-start gap-3"
                  variants={fadeInUp}
                  whileHover={{ x: 4 }}
                >
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-[#d8b348] mt-1.5"
                  />
                  <span>
                    <strong>Looks informais demais</strong> (tipo chinelo e
                    camiseta, por exemplo 🙈)
                  </span>
                </motion.li>
              </motion.ul>
            </motion.div>

            <motion.p
              className="pt-6 border-t border-gray-200 mt-8"
              variants={fadeInUp}
            >
              Ah! E o mais importante é a sua presença e seu carinho. Obrigada
              por fazer parte dessa história! 🖤
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DressCode;
