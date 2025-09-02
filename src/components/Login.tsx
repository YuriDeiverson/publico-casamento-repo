import React, { useState } from "react";
import { auth } from "../firabse"
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onNavigate("admin-confirmations");
    } catch (err) {
      setError("Email ou senha inválidos. Tente novamente.");
      console.error("Erro de login:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // ✅ FORMULÁRIO COMPLETO ADICIONADO AQUI
  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Login
        </h2>
        <p className="text-gray-600 mb-6 text-center">Acesso para os noivos</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#D8B348] text-white font-bold py-3 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Entrando..." : "Entrar"}
          </button>
          <button
            type="button"
            onClick={() => onNavigate("confirm-presence")}
            className="w-full mt-2 text-blue-600 font-bold py-2 rounded-lg hover:underline"
          >
            Voltar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
