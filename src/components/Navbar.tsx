import React, { useState, useEffect } from "react";

// Adicione uma prop para lidar com a navegação
interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(window.location.hash.replace("#", ""));
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navLinks = [
    { href: "#about", text: "Nossa história" },
    { href: "#gifts", text: "Lista de presentes" },
    { href: "#dresscode", text: "Dress Code" },
    { href: "#adress", text: "Local" },
  ];

  return (
    <nav className="w-full bg-white shadow-md px-4 py-4 sm:px-8 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto h-16">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2" onClick={() => onNavigate('home')}>
          <span className="text-[#D8B348]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <h1 className="text-2xl font-bold text-gray-800">Leila & Yuri</h1>
        </a>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-8 text-gray-900 font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`py-2 border-b-2 border-transparent hover:border-[#D8B348] transition-colors ${
                  activeTab === link.href.substring(1) ? "text-[#D8B348] font-bold border-[#D8B348]" : ""
                }`}
                onClick={() => onNavigate('home')} // Navega para a home e rola para a seção
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>

        {/* Botão presença - desktop */}
        <div className="hidden md:block">
          <button
            onClick={() => onNavigate('confirm-presence')} // Redireciona para a página de confirmação
            className="shadow-md p-3 bg-[#D8B348] hover:bg-yellow-700 text-white rounded-lg font-bold transition-colors"
          >
            Confirmar presença
          </button>
        </div>

        {/* Botão hambúrguer */}
        <button
          className="md:hidden text-3xl text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          ☰
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 bg-white shadow-lg rounded-lg p-4">
          <ul className="flex flex-col gap-3 text-gray-800 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => { setMenuOpen(false); onNavigate('home'); }}
                  className={`block py-2 hover:text-[#D8B348] ${
                    activeTab === link.href.substring(1) ? "text-[#D8B348] font-bold" : ""
                  }`}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
          <div className="p-3 bg-[#D8B348] hover:bg-yellow-700 text-white rounded-lg font-bold text-center transition-colors">
            <button onClick={() => { setMenuOpen(false); onNavigate('confirm-presence'); }}>Confirmar presença</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
