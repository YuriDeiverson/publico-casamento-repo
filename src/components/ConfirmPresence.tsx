import React, { useState } from "react";
// ✅ Verifique se o nome do arquivo é 'firebase' (minúsculo)
import { db } from "../firabse";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// ✅ Verifique se este caminho para a imagem está correto
import sideImage from "../assets/Bosque.jpg";

interface ConfirmPresenceProps {
  onNavigate: (page: string) => void;
}

const ConfirmPresence: React.FC<ConfirmPresenceProps> = ({ onNavigate }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (status: "confirmado" | "nao_irei") => {
    if (!firstName || !lastName || !phone) {
      setMessage("Por favor, preencha Nome, Sobrenome e Telefone.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const confirmationsCollectionRef = collection(db, "confirmations");

      await addDoc(confirmationsCollectionRef, {
        firstName,
        lastName,
        phone,
        email,
        status,
        timestamp: serverTimestamp(),
      });

      setMessage(
        status === "confirmado"
          ? "Presença confirmada! Muito obrigado!"
          : "Registro feito. Sentiremos sua falta!",
      );

      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setMessage("Erro ao enviar resposta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ AQUI ESTÁ O JSX QUE FALTAVA PARA RENDERIZAR O FORMULÁRIO
  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col md:flex-row">
      {/* Coluna do Formulário */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Confirmação de Presença
          </h2>
          <p className="text-gray-600 mb-6">
            Por favor, informe se poderá comparecer
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nome"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Sobrenome"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <input
              type="tel"
              placeholder="Telefone"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email (Opcional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />

            {message && (
              <p
                className={`text-center text-sm font-semibold ${
                  message.includes("confirmada")
                    ? "text-green-600"
                    : message.includes("falta")
                    ? "text-yellow-700"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={() => handleSubmit("confirmado")}
                disabled={isSubmitting}
                className="bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Confirmar presença"}
              </button>
              <button
                onClick={() => handleSubmit("nao_irei")}
                disabled={isSubmitting}
                className="bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Enviando..." : "Não poderei ir"}
              </button>
            </div>

            <button
              onClick={() => onNavigate("home")}
              className="w-full mt-2 text-blue-600 font-bold py-2 rounded-lg hover:underline"
            >
              Voltar para o Início
            </button>
            {/* // ✅ LINK ADICIONADO AQUI */}
            <button
              onClick={() => onNavigate("login")}
              className="w-full mt-2 text-gray-500 text-sm hover:underline"
            >
              Somos os noivos
            </button>
          </div>
        </div>
      </div>

      {/* Coluna da Imagem Lateral */}
      <div
        className="hidden md:block md:w-1/3 lg:w-1/2 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${sideImage})` }}
      ></div>
    </div>
  );
};

export default ConfirmPresence;
