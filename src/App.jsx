import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Instagram, Briefcase, Scissors, Heart, Utensils, Home, Hammer, Truck, Wrench, Zap, Monitor, Calendar, Cake, BookOpen, Settings } from 'lucide-react';

// O "Banco de Dados" estático. Para adicionar alguém, basta copiar um bloco e alterar os dados.
const db = [
    {
        id: 1,
        category: "Beleza & Estética",
        name: "Mauren Gelinske da Silveira",
        phone: "54994342323",
        displayPhone: "(54) 99434-2323",
        description: "Corte masculino e feminino, progressiva, luzes, unhas, spa dos pés e muito mais.",
    },
    {
        id: 2,
        category: "Beleza & Estética",
        name: "Geovana Pimentel",
        phone: "54999249705",
        displayPhone: "(54) 99924-9705",
        description: "Especialista em progressiva, corte feminino e cronograma de hidratação.",
    },
    {
        id: 3,
        category: "Beleza & Estética",
        name: "Paola Santos – Lash Designer",
        instagram: "paola.lash_designer_9",
        description: "Extensão de cílios, design de sobrancelhas, limpeza de pele e outros procedimentos estéticos.",
    },
    {
        id: 4,
        category: "Beleza & Estética",
        name: "Eduarda Oligini – Lash Designer",
        phone: "54991740377",
        displayPhone: "(54) 99174-0377",
        instagram: "oliginilash",
        description: "Técnicas de extensão de cílios do natural ao marcante. Atendimento domiciliar disponível.",
    },
    {
        id: 5,
        category: "Saúde & Bem-Estar",
        name: "Niria – Reflexologia Podal",
        phone: "54991352444",
        displayPhone: "(54) 99135-2444",
        description: "Cuidado físico e emocional através dos pés.",
    },
    {
        id: 6,
        category: "Saúde & Bem-Estar",
        name: "Silvia – Massoterapeuta",
        phone: "54999702390",
        displayPhone: "(54) 99970-2390",
        description: "Massagem terapêutica, relaxante, pedras quentes, drenagem linfática, facial, etc. Atendimento personalizado.",
    },
    {
        id: 7,
        category: "Alimentação",
        name: "Tuô Dindin (Jenifer)",
        phone: "54991481396",
        displayPhone: "(54) 99148-1396",
        instagram: "tuodindin",
        description: "Entregamos amor em cada Dindin.",
    },
    {
        id: 8,
        category: "Imóveis",
        name: "Jaques Silva",
        phone: "54991514194",
        displayPhone: "(54) 99151-4194",
        instagram: "jaquessilvaoficial",
        description: "Venda e compra de imóveis, despachante documental imobiliário, reformas e regularização.",
    },
    {
        id: 9,
        category: "Construção",
        name: "R&S Engenharia e Reformas",
        phone: "54991514194",
        displayPhone: "(54) 99151-4194",
        instagram: "r_s_engenhariaereformas",
        description: "Projetos, obras e reformas.",
    },
    {
        id: 10,
        category: "Construção",
        name: "Arte Pedras Silva",
        phone: "54991179107",
        displayPhone: "(54) 99117-9107",
        instagram: "artepedras_silva",
        description: "Pedras naturais, basalto e revestimentos para áreas internas e externas.",
    },
    {
        id: 11,
        category: "Construção",
        name: "Parlântina Indústria Metalúrgica",
        phone: "54991846058",
        displayPhone: "(54) 99184-6058 / (54) 3632-9818",
        description: "Soluções em prateleiras corte e dobras há mais de 50 anos.",
    },
    {
        id: 12,
        category: "Logística",
        name: "Zen Transportes – Ricardo Vieira",
        phone: "54996177015",
        displayPhone: "(54) 99617-7015",
        description: "Fretes e mudanças com responsabilidade e confiança.",
    },
    {
        id: 13,
        category: "Assistência",
        name: "Luizinho das Máquinas",
        phone: "54999153353",
        displayPhone: "(54) 99915-3353",
        description: "Conserto de máquinas de lavar, secadoras e refrigeração.",
    },
    {
        id: 14,
        category: "Personalização",
        name: "Niki Laser",
        phone: "54991527277",
        displayPhone: "(54) 99152-7277",
        description: "Cortes a laser em Acrílico e MDF.",
    },
    {
        id: 15,
        category: "Consultoria",
        name: "Rony de Jesus",
        phone: "51995154938",
        displayPhone: "(51) 99515-4938",
        description: "Consultoria para redução de custos na conta de energia (até 20%). Oportunidade de renda extra.",
    },
    {
        id: 16,
        category: "Tecnologia",
        name: "JC Soluções em Tecnologia",
        phone: "54991678057",
        displayPhone: "(54) 99167-8057",
        instagram: "jcsolucoes_tech",
        description: "Desenvolvimento de Sites, Aplicativos, Softwares de gestão (ERP). Marketing Digital e Tráfego Pago.",
    },
    {
        id: 17,
        category: "Eventos",
        name: "Ricardo Eventos",
        phone: "54991757015",
        displayPhone: "(54) 99175-7015",
        description: "Comida boa e organização para festas, aniversários e eventos em geral.",
    },
    {
        id: 18,
        category: "Construção",
        name: "Altair da rosa",
        phone: "54992658952",
        displayPhone: "(54) 99265-8952",
        description: "Reformas e construção em geral.",
    },
    {
        id: 19,
        category: "Alimentação",
        name: "Dinda Paula tortas e doces",
        phone: "54991808378",
        displayPhone: "(54) 99180-8378",
        instagram: "dindapaulatortasedoces",
        description: "Tortas e doces caseiros feitos com carinho. Para aniversários, festas ou final de semana.",
    }
];

// Mapeamento de categorias para ícones
const categoryConfig = {
    "Todas": <MapPin size={18} />,
    "Beleza & Estética": <Scissors size={18} />,
    "Saúde & Bem-Estar": <Heart size={18} />,
    "Alimentação": <Utensils size={18} />,
    "Imóveis": <Home size={18} />,
    "Construção": <Hammer size={18} />,
    "Logística": <Truck size={18} />,
    "Assistência": <Wrench size={18} />,
    "Personalização": <Briefcase size={18} />,
    "Consultoria": <Zap size={18} />,
    "Tecnologia": <Monitor size={18} />,
    "Eventos": <Calendar size={18} />
};

export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    // Primeiro pegamos as categorias do banco e ordenamos alfabeticamente
    const uniqueCategories = [...new Set(db.map(item => item.category))].sort();
    // Depois, forçamos o "Todas" a ser sempre o primeiro item da lista
    const categories = ["Todas", ...uniqueCategories];

    // Filtra os dados com base na busca e na categoria selecionada
    const filteredData = useMemo(() => {
        return db.filter(item => {
            const matchCategory = selectedCategory === "Todas" || item.category === selectedCategory;
            const searchLower = searchTerm.toLowerCase();
            const matchSearch = item.name.toLowerCase().includes(searchLower) ||
                item.description.toLowerCase().includes(searchLower) ||
                item.category.toLowerCase().includes(searchLower);
            return matchCategory && matchSearch;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="min-h-screen bg-[#fdfaf6] text-slate-800 font-sans">
            {/* Header Fixo - Estilo Poder da Fé */}
            <header className="bg-gradient-to-b from-[#7a0010] to-[#5c000c] text-white sticky top-0 z-10 shadow-lg border-b-4 border-[#d4af37]">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex flex-col items-center justify-center mb-4">
                        {/* Ícones simulando a logo (Bíblia/Engrenagens) */}
                        <div className="flex items-center gap-1 mb-2 text-[#d4af37]">
                            <Settings size={28} />
                            <BookOpen size={32} className="mx-1" />
                            <Settings size={28} />
                        </div>

                        <h1 className="text-3xl font-serif font-bold text-center tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#f9d976] to-[#e1b846]">
                            CONEXÃO EMPRESARIAL
                        </h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-[1px] w-8 bg-[#d4af37]"></div>
                            <p className="text-center text-[#f9d976] text-sm font-semibold tracking-[0.2em] uppercase">
                                Poder da Fé
                            </p>
                            <div className="h-[1px] w-8 bg-[#d4af37]"></div>
                        </div>
                    </div>

                    <div className="relative mt-6">
                        <input
                            type="text"
                            placeholder="Buscar serviço, nome ou palavra-chave..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-800 border-2 border-transparent focus:outline-none focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/50 shadow-sm transition-all bg-white/95"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-6">
                {/* Filtros de Categoria - Removemos o 'scrollbar-hide' para a barra aparecer */}
                <div className="flex overflow-x-auto pb-4 mb-4 gap-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-[#7a0010] text-[#f9d976] shadow-md border border-[#5c000c]'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-[#fff9e6] hover:text-[#7a0010] hover:border-[#d4af37]/30'
                                }`}
                        >
                            {categoryConfig[cat] || <Briefcase size={16} />}
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Resultados */}
                <div className="mb-4 text-sm text-slate-500 flex justify-between items-center">
                    <span>Encontrados: <strong className="text-[#7a0010]">{filteredData.length}</strong> negócios</span>
                    <a href="https://www.instagram.com/igr.poderdafe/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#7a0010] hover:text-[#d4af37] transition-colors font-medium">
                        <Instagram size={14} />
                        @igr.poderdafe
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredData.length > 0 ? (
                        filteredData.map(item => (
                            <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-[#d4af37]/40 transition-all flex flex-col h-full group">
                                <div className="flex-grow">
                                    <span className="inline-block px-3 py-1 bg-[#fff4f5] text-[#7a0010] border border-[#7a0010]/10 text-xs font-semibold rounded-full mb-3 group-hover:bg-[#7a0010] group-hover:text-white transition-colors">
                                        {item.category}
                                    </span>
                                    <h2 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h2>
                                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-50">
                                    {item.phone && (
                                        <a
                                            href={`https://wa.me/55${item.phone}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
                                        >
                                            <Phone size={16} />
                                            WhatsApp
                                        </a>
                                    )}
                                    {item.instagram && (
                                        <a
                                            href={`https://instagram.com/${item.instagram}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 hover:opacity-90 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-opacity shadow-sm"
                                        >
                                            <Instagram size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-100">
                            <Search className="mx-auto text-slate-300 mb-3" size={48} />
                            <h3 className="text-lg font-medium text-slate-700">Nenhum resultado encontrado</h3>
                            <p className="text-slate-500 mt-1">Tente buscar por outro termo ou categoria.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}