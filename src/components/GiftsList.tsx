import React, { useState, useRef, useEffect } from "react";
import ProductModal from "./ProductModal";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
// --- Importações do Firebase ---
import { db } from "../firabse";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

// --- Suas imagens e lista de presentes ---
import tvImage from "../assets/SmartTV.png";
import fornoImage from "../assets/Forninho.png";
import multiprocessadorImage from "../assets/Multiprocessador-removebg-preview.png";
import microondasImage from "../assets/Microondas-removebg-preview.png";
import frigideirasImage from "../assets/Frigideiras.png";
import rackImage from "../assets/Rack.png";
import BanhoToalha from "../assets/Toalha-removebg-preview.png";
import Cafeteira from "../assets/Cafeteira-removebg-preview.png";
import Ededrom from "../assets/Ededrom.png";
import Cuscuzeira from "../assets/Cuscuzeira.png";
import Faqueiro from "../assets/Faqueiro.png";
import Assadeiras from "../assets/Assadeira.png";
import Lençol from "../assets/LençolCasal.png";
import Toalhas from "../assets/Toalhas.png";

interface Gift {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  link: string;
  isPurchased: boolean;
}

const initialGifts: Gift[] = [
  {
    id: 1,
    name: "Smart TV 32 LG",
    price: 969.9,
    image: tvImage,
    category: "Eletrodoméstico",
    link: "https://www.amazon.com.br/LG-32LR600B-Processador-integrado-compat%C3%ADvel/dp/B0D7F19S2L/ref=sr_1_5?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1S5XZY5VA31Z2&dib=eyJ2IjoiMSJ9.Z_nKWCxAahpwQOYzKJEpPh2wnsGtP4V4S7Mab5170lJycf5Wm_mWt1xQJixMdeux-Ub4TDZW1BUe25LB48G61PYxh8-YAQT-miZCaoHTY7KM3OISTOyl5QuysTbxKnqeGnGRdTRCN9iI5yYF5-x2o2Z-pN39_V3yrnH5-K3vuCxHIErUMqKfp8dSYfsBEpwEBLKqJtbb2JT2MTq-TTsfMZzAsWFWlZ1IS2pEtywACl4uf8alo80kCZ9iRGMP2A_ELrJ8w7cOqgvl6PoEPjENFv5yVBQVp3WihekHjTtJXlY.Lewob7f_GuSsvwd29RyPMSvwVCYNjyG7F2TT4mzboTM&dib_tag=se&keywords=smart+tv&qid=1755014718&s=electronics&sprefix=smart+tv+%2Celectronics%2C170&sr=1-5&ufe=app_do%3Aamzn1.fos.a492fd4a-f54d-4e8d-8c31-35e0a04ce61e",
    isPurchased: false,
  },
  {
    id: 2,
    name: "Forno Elétrico Britânia",
    price: 438.59,
    image: fornoImage,
    category: "Eletrodoméstico",
    link: "https://www.amazon.com.br/dp/B0CBL5C5D4?ref=cm_sw_r_cso_cp_apan_dp_P10R3S12EAVVQK856W76&ref_=cm_sw_r_cso_cp_apan_dp_P10R3S12EAVVQK856W76&social_share=cm_sw_r_cso_cp_apan_dp_P10R3S12EAVVQK856W76",
    isPurchased: false,
  },
  {
    id: 3,
    name: "Multiprocessador Turbo Chef",
    price: 289.0,
    image: multiprocessadorImage,
    category: "Cozinha",
    link: "https://www.amazon.com.br/dp/B09NX8NZRW/ref=twister_B0CBLSZFFS?_encoding=UTF8&th=1",
    isPurchased: false,
  },
  {
    id: 4,
    name: "Micro-Ondas Mondial",
    price: 610.0,
    image: microondasImage,
    category: "Cozinha",
    link: "https://www.amazon.com.br/dp/B09NHW7XN3/ref=twister_B0CFG5CWQ2?_encoding=UTF8&th=1",
    isPurchased: false,
  },
  {
    id: 5,
    name: "Jogo de frigideiras 3 pçs",
    price: 104.38,
    image: frigideirasImage,
    category: "Cozinha",
    link: "https://www.amazon.com.br/Tramontina-JOGO-FRIGIDEIRAS-CARIBE-PRETO/dp/B09W48TKX2/ref=sr_1_5?dib=eyJ2IjoiMSJ9.kibsR3yJIda2A_U3CLaLq6hwqRLTGnjUzHPc1395htJ7Wi5xSyEkh4K8Tht16egKeuIbVt6w1VWWLOMKgzbIHosVIUyCRMO2DnpWnYic-MoGsxevLWoyR9NCExuUGnRjA68kvgDD0bfXEUrWQn4JlE6Mzun3q02Xv1oRpTspTGy6krq_mzHSyWvrv8DTzw4jYVzNQ_rIg_uBFRR0upfrks_f-3qmnUeJVBGU0kTRuOiO_O7f3KHVrDBqLuDY22VFpyGbBbPgSkwv2jiT-u3Pd3gdiHzUayFoGaLeld0KoPM.DGJ-DPA64NHMqzUSdZj0RycogZ_jM82aRRMOzoZOzoo&dib_tag=se&keywords=jogo+de+frigideira+tramontina&qid=1755103096&sr=8-5&ufe=app_do%3Aamzn1.fos.6121c6c4-c969-43ae-92f7-cc248fc6181d",
    isPurchased: false,
  },
  {
    id: 6,
    name: "Rack Madeira Dubai para TV",
    price: 349.99,
    image: rackImage,
    category: "Móveis",
    link: "https://www.amazon.com.br/Rack-Madesa-Dubai-para-Polegadas/dp/B085CMZN2S/ref=sr_1_3?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2D03U422RCSO7&dib=eyJ2IjoiMSJ9.G7T5eUHDksyr8tzA9NkbZ8Sz8y98wZxRH4z2sq2aVPld4hZXAIuIjP5d-gi5rPtQpNXGSbcwk0qvX3RtZ8aQzXd1HUQysV3cMOX47_Sg3SfrlYbUErvDxjuS_F2WZOKJVgOSIQuTyZU6U9lqiYMFlveaPgcaLkHDf50l5XDZKKKb5QpnhfSNEoz530-AvGS-vbP5j3X0iu3VtekzRSVAHoVNyN_yQzzyY2R9wMjjlDM.G941ULhraxECc-1QbS5vy_9VyWMeZzyX9U3m-BAA8Ug&dib_tag=se&keywords=Rack%2BMadesa%2BDubai%2Bbranco&qid=1755102656&s=home&sprefix=rack%2Bmadesa%2Bdubai%2Bbran%2Chome%2C172&sr=1-3&ufe=app_do%3Aamzn1.fos.fcd6d665-32ba-4479-9f21-b774e276a678&th=1",
    isPurchased: false,
  },
  {
    id: 7,
    name: "Jogo Banhão 5 Peças",
    price: 259.0,
    image: BanhoToalha,
    category: "Cama, Mesa e Banho",
    link: "https://www.amazon.com.br/Banh%C3%A3o-Cristal-Renascen%C3%A7a-Penteado-Buettner/dp/B07VKJR8W3/ref=sr_1_2_sspa?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=31A8RCNU7I8SC&dib=eyJ2IjoiMSJ9.C0GLpD5NIou_MP0Mm_8s5ikS8cA3CzL6FKmz1nlTzwiD2DinTKdIDHTksn6YumKAYDJ7YcYCBj63xcfIWXOXh21dkWFhOBO7oGQ8mNZ16MieG2URsEuulpkse1-y5xJiq83dppx-WKwD4y8HRkE5Vlhwa_njt0tisAa3PZivN24okVXjxGpAvWodRYq3LXHZTOZd-EHkhG22vKmh11UIfupKbJujsZSPPFE-4HA_5V2zw8NEy4e0uV5V_9WRNDrMS_5Kpo2GVFtpl3RdBBpHRAnrq6XHlSPbPU7nOZc_Ofo.O5lepy0OKIFOxVrjrEuvGARUquW7lZnGsu3WxrDtqVs&dib_tag=se&keywords=Jogo+Banh%C3%A3o&qid=1755015894&sprefix=rack+madesa+dubai%2Caps%2C418&sr=8-2-spons&ufe=app_do%3Aamzn1.fos.fcd6d665-32ba-4479-9f21-b774e276a678&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    isPurchased: false,
  },
  {
    id: 8,
    name: "Cafeteira Elétrica Dolce",
    price: 140.0,
    image: Cafeteira,
    category: "Cozinha",
    link: "https://www.amazon.com.br/C-35-18x-Cafeteira-Eletrodomesticos-Vermelho/dp/B07K6NL9SV/ref=dp_fod_d_sccl_1/139-0970265-5892018?pd_rd_w=wKjJC&content-id=amzn1.sym.b62ac7bd-1361-4636-859b-961edb7c8aff&pf_rd_p=b62ac7bd-1361-4636-859b-961edb7c8aff&pf_rd_r=51XJQPHRZ5BKQEQX0NSX&pd_rd_wg=ZNFpF&pd_rd_r=c954fc41-b211-408f-9f65-62776c213774&pd_rd_i=B07K6NL9SV&th=1",
    isPurchased: false,
  },
  {
    id: 9,
    name: "Coberdrom Colcha Cobre Leito Edredom Com Enchimento",
    price: 279.00,
    image: Ededrom,
    category: "Cama, Mesa e Banho",
    link: "https://www.amazon.com.br/Coberdrom-Colcha-Edredom-Enchimento-Xadrez/dp/B0DVCJDJ7L/ref=sr_1_2_sspa?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2EL2Q0VNP85UT&dib=eyJ2IjoiMSJ9.9TWjk7GbgFW1hQ-Q2yz73eWxVX1k-5ErbSJecJ8xvuvtSrFaBqU9Z7rFhPCsNa6xkXyTPDvNktiWY1KViwJbOvICnsFY2g6sNJtoSAOjuqYjxH9UMimY6fKLqsTW6aaUzFkaWXM-7CoSmMK8Z7zgYK4mx9HjGVexKGjBVwh-D7kTdbB0jdHgROXTDornT_E3GA53r89Jeo7h_WpZT5r2rDAjfOyanaJNlnxDdYOm7AE.mRBO8yMngBQzkP_ujN9eh4X9cSsGfbh6nLzhWZ59mI0&dib_tag=se&keywords=Kit%2BColcha%2BCobre%2BLeito%2BCasal&qid=1755102776&s=home&sprefix=kit%2Bcolcha%2Bcobre%2Bleito%2Bcasal%2Chome%2C297&sr=1-2-spons&ufe=app_do%3Aamzn1.fos.fcd6d665-32ba-4479-9f21-b774e276a678&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1",
    isPurchased: false,
  },
  {
    id: 10,
    name: "Panela De Pressão  + Cuscuzeira ",
    price: 194.77,
    image: Cuscuzeira,
    category: "Cozinha",
    link: "https://produto.mercadolivre.com.br/MLB-4408536722-kit-panela-de-presso-antiaderente-45l-cuscuzeira-t-vidro-_JM?attributes=COLOR_SECONDARY_COLOR%3AVmVybWVsaG8%3D#reviews",
    isPurchased: false,
  },

    {
    id: 11,
    name: "Faqueiro 42 Pçs Inox",
    price: 124.99,
    image: Faqueiro,
    category: "Cozinha",
    link: "https://www.mercadolivre.com.br/faqueiro-42-pcs-inox-siena-serve-6-pessoas-brinox-5109120/up/MLBU1118127242?pdp_filters=item_id:MLB2861433301#origin%3Dshare%26sid%3Dshare",
    isPurchased: false,
  },

   {
    id: 12,
    name: " Assadeiras Retangulares 3pçs",
    price: 199.99,
    image: Assadeiras,
    category: "Cozinha",
    link: "https://www.havan.com.br/jogo-de-assadeiras-retangular-portuguesa-havan-casa-3-pecas-branco/p",
    isPurchased: false,
  },

  {
    id: 13,
    name: " Lençol Casal com Elástico e Fronhas",
    price: 229.90,
    image: Lençol,
    category: "Cama, Mesa e Banho",
    link: "https://www.karsten.com.br/lencol-casal-com-elastico-e-fronhas-100-algodao-noah-verde-chabranco-3570071/p",
    isPurchased: false,
  },

    {
    id: 14,
    name: " Jogo de Banho 5 Peças",
    price: 287.91,
    image: Toalhas,
    category: "Cama, Mesa e Banho",
    link: "https://www.karsten.com.br/jogo-de-banho-5-pecas-fio-penteado-lumina-petalarosa-3844210/p",
    isPurchased: false,
  },
];

// --- Componente React ---
const GiftsList: React.FC = () => {
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const [loading, setLoading] = useState(true);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncWithFirestore = async () => {
      setLoading(true);
      try {
        const giftsCollectionRef = collection(db, "gifts");
        const updatedGifts = await Promise.all(
          initialGifts.map(async (localGift) => {
            const giftDocRef = doc(giftsCollectionRef, String(localGift.id));
            const docSnap = await getDoc(giftDocRef);
            if (docSnap.exists() && docSnap.data().isPurchased) {
              return { ...localGift, isPurchased: true };
            }
            return localGift;
          })
        );
        setGifts(updatedGifts);
      } catch (error) {
        console.error("Erro ao sincronizar com o Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    syncWithFirestore();
  }, []);

  const handleGiftClick = (event: React.MouseEvent, gift: Gift) => {
    event.stopPropagation();
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const handleGiftPurchase = async (giftId: number) => {
    const giftDocRef = doc(db, "gifts", String(giftId));
    try {
      await setDoc(giftDocRef, { isPurchased: true });
      setGifts((prevGifts) =>
        prevGifts.map((gift) =>
          gift.id === giftId ? { ...gift, isPurchased: true } : gift
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar o status do presente:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
  };

  const categories = Array.from(new Set(initialGifts.map((gift) => gift.category)));
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const filteredAndSortedGifts = gifts
    .filter((gift) =>
      gift.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((gift) => !selectedCategory || gift.category === selectedCategory)
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Sincronizando lista de presentes...</p>
      </div>
    );
  }

  // --- Variants do Framer Motion ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  return (
    <section
  id="gifts"
  className="bg-[#F4F4F4] py-12 px-4 sm:px-8 md:px-16"
>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-[#d8b348] mb-6">
      Lista de presentes
    </h2>

    {/* Filtros */}
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center gap-4 mb-8">
      {/* Dropdown categoria */}
      <div className="relative w-full sm:w-48">
        <button
          ref={categoryButtonRef}
          className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg bg-white w-full justify-center"
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          {selectedCategory || "Categoria"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ml-2 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showCategoryDropdown && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleCategorySelect(null)}>
              Todas as Categorias
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pesquisa */}
      <div className="relative flex items-center flex-grow w-full sm:w-auto">
        <input
          type="text"
          placeholder="Pesquisar item"
          className="p-3 pl-10 pr-10 border border-gray-300 rounded-lg w-full sm:w-auto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="absolute left-3 text-gray-400">🔍</span>
        {searchQuery && (
          <button className="absolute right-3 text-gray-500 hover:text-gray-800" onClick={() => setSearchQuery("")}>
            ✕
          </button>
        )}
      </div>
    </div>

    {/* Lista de presentes */}
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredAndSortedGifts.map((gift) => (
        <motion.div
          key={gift.id}
          variants={itemVariants}
          className={`bg-white p-4 rounded-lg shadow-md relative ${
            gift.isPurchased ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={(e) => !gift.isPurchased && handleGiftClick(e, gift)}
          whileHover={!gift.isPurchased ? { scale: 1.03 } : {}}
          whileTap={!gift.isPurchased ? { scale: 0.97 } : {}}
        >
          <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {gift.category}
          </span>
          <img src={gift.image} alt={gift.name} className="w-full h-40 sm:h-48 object-contain mb-4 mt-8" />
          <h3 className="text-lg font-semibold">{gift.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xl font-bold text-blue-600">
              R$ {gift.price.toFixed(2).replace(".", ",")}
            </p>
            {!gift.isPurchased && (
              <button
                className="bg-gray-200 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors"
                aria-label="Ver detalhes"
              >
                +
              </button>
            )}
          </div>
          {gift.isPurchased && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center text-[#d8b348] text-xl font-bold rounded-lg">
              Comprado!
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  </div>

  {selectedGift && isModalOpen && (
    <ProductModal gift={selectedGift} onClose={() => setIsModalOpen(false)} onPurchase={() => handleGiftPurchase(selectedGift.id)} />
  )}
</section>
  );
};

export default GiftsList;