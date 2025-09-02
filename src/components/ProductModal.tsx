import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import qrcode from "../assets/qrcode-pix.png"

interface Gift {
  id: number;
  name: string;
  price: number;
  image: string;
  link: string;
}

interface ProductModalProps {
  gift: Gift;
  onClose: () => void;
  onPurchase: (id: number) => void;
}

// Dados Pix
const pixData = {
  key: "yuriideiverson@gmail.com",
  copyPaste: "00020126460014BR.GOV.BCB.PIX0124yuriideiverson@gmail.com5204000053039865802BR5901N6001C62070503***630445DC",
  bank: "Banco Nubank",
  account: "0001",
  agency: "1234",
  name: "Yuri e Leila",
};

const dropIn: Variants = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { type: "spring", damping: 20, stiffness: 300 },
  },
  exit: {
    y: "100vh",
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const ProductModal: React.FC<ProductModalProps> = ({
  gift,
  onClose,
  onPurchase,
}) => {
  const [showPix, setShowPix] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handlePurchase = () => {
    window.open(gift.link, "_blank");
    onPurchase(gift.id);
    onClose();
  };

  const handlePixPurchase = () => {
    onPurchase(gift.id);
    onClose();
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixData.copyPaste);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // feedback por 2s
  };

  return (
    <AnimatePresence>
      {/* BACKDROP */}
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      />

      {/* MODAL */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* BOTÃO FECHAR */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            aria-label="Fechar"
            whileHover={{ scale: 1.2, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            &times;
          </motion.button>

          {/* CONTEÚDO */}
          <div className="p-6 md:p-8">
            {!showPix ? (
              <div className="flex flex-col md:flex-row gap-6">
                <motion.div
                  className="md:w-1/2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-64 object-contain rounded-xl"
                  />
                </motion.div>
                <motion.div
                  className="md:w-1/2 flex flex-col justify-between"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div>
                    <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                      Presente
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      {gift.name}
                    </h2>
                    <p className="text-2xl font-semibold text-green-600 mb-4">
                      R$ {gift.price.toFixed(2).replace(".", ",")}
                    </p>
                    <p className="text-sm text-gray-500">
                      Vendido e entregue por Amazon
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <motion.button
                      onClick={() => setShowConfirmation(true)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Comprar no site
                    </motion.button>
                    <motion.button
                      onClick={() => setShowPix(true)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Enviar valor via Pix
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            ) : (
              <motion.div
                className="flex flex-col items-center text-center px-4 py-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Enviar valor via Pix</h2>

                {/* Imagem do QR Pix */}
                <div className="flex justify-center mb-4">
                  <img
                    src={qrcode} // coloque a imagem do QR Pix na pasta public/assets
                    alt="Pix QR Code"
                    className="w-48 h-48 md:w-56 md:h-56 object-contain"
                  />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left w-full max-w-xs">
                  <p className="mb-1">
                    <strong>Banco:</strong> Nubank (260)
                  </p>
                  <p className="mb-1">
                    <strong>Nome:</strong> Yuri e Leila
                  </p>
                  <p className="mb-1">
                    <strong>Agência:</strong> 0001
                  </p>
                  <p className="mb-1">
                    <strong>Conta:</strong> 50796459-0
                  </p>
                  <p className="mb-1">
                    <strong>Chave Pix:</strong> {pixData.key}
                  </p>
                </div>

                <motion.button
                  onClick={handlePixPurchase}
                  className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Já enviei o valor
                </motion.button>

                <motion.button
                  onClick={handleCopyPix}
                  className={`mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition ${
                    copied ? "bg-green-500 text-white" : ""
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {copied ? "Copiado!" : "Copiar chave Pix"}
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* CONFIRMAÇÃO */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-60"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div
              className="bg-white p-6 rounded-xl z-70 shadow-lg text-center max-w-md w-full mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-4">Confirmar compra?</h3>
              <p className="text-gray-600 mb-6">
                Ao confirmar, este presente ficará indisponível para outros
                convidados.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePurchase}
                  className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Confirmar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default ProductModal;
