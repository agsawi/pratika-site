// TypeScript interfaces for Pratika navigation structure
export interface DropdownItem {
  name: string;
  url: string;
}

export interface MegaMenuItem {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface NavBarItem {
  name: string;
  url: string;
  type: 'link' | 'dropdown' | 'megamenu' | 'cta';
  items?: DropdownItem[] | MegaMenuItem[];
}

// Pratika Services Data for Mega Menu
export const pratikaServicesData: MegaMenuItem[] = [
  {
    name: "Limpeza e Conservação Ambiental",
    url: "/servicos/limpeza-e-conservacao",
    description: "Serviços completos de limpeza e manutenção ambiental para todos os tipos de ambientes",
    icon: "cleaning"
  },
  {
    name: "Portaria Desarmada",
    url: "/servicos/portaria-desarmada",
    description: "Serviços de portaria e controle de acesso com profissionais qualificados",
    icon: "security"
  },
  {
    name: "Gestão de Áreas Verdes",
    url: "/servicos/gestao-de-areas-verdes",
    description: "Cuidado e manutenção profissional de jardins e áreas verdes",
    icon: "garden"
  },
  {
    name: "Serviços de Apoio (Copa, Recepção, Telefonia)",
    url: "/servicos/servicos-de-apoio",
    description: "Serviços de apoio administrativo e operacional para empresas",
    icon: "support"
  },
  {
    name: "Limpeza em Altura",
    url: "/servicos/limpeza-em-altura",
    description: "Serviços especializados de limpeza em altura com segurança garantida",
    icon: "height"
  },
  {
    name: "Manutenção Predial",
    url: "/servicos/manutencao-predial",
    description: "Manutenção preventiva e corretiva de edifícios e instalações",
    icon: "maintenance"
  },
  {
    name: "Orientação de Estacionamento",
    url: "/servicos/orientacao-de-estacionamento",
    description: "Gestão e organização de estacionamentos com profissionais treinados",
    icon: "parking"
  }
];

// Pratika Market Segments Data for Mega Menu
export const pratikaSegmentsData: MegaMenuItem[] = [
  {
    name: "Indústria",
    url: "/segmentos/industria",
    description: "Soluções especializadas para o setor industrial com foco em produtividade",
    icon: "industry"
  },
  {
    name: "Saúde (Hospitais e Clínicas)",
    url: "/segmentos/saude",
    description: "Serviços especializados para ambientes de saúde com protocolos rigorosos",
    icon: "healthcare"
  },
  {
    name: "Condomínios (Residenciais e Comerciais)",
    url: "/segmentos/condominios",
    description: "Gestão completa de facilities para condomínios residenciais e comerciais",
    icon: "building"
  },
  {
    name: "Varejo e Comércio",
    url: "/segmentos/varejo-e-comercio",
    description: "Soluções para estabelecimentos comerciais e redes de varejo",
    icon: "retail"
  },
  {
    name: "Educação",
    url: "/segmentos/educacional",
    description: "Serviços especializados para instituições de ensino e centros educacionais",
    icon: "education"
  },
  {
    name: "Escritórios e Empresas",
    url: "/segmentos/escritorios-e-empresas",
    description: "Facilities management para ambientes corporativos e escritórios",
    icon: "office"
  }
];

// Complete Pratika Navigation Structure
export const pratikaNavBarLinks: NavBarItem[] = [
  {
    name: "Sobre a Pratika",
    url: "/sobre-nos",
    type: "dropdown",
    items: [
      { name: "Conheça a Prátika", url: "/sobre-nos" },
      { name: "Compromisso ESG", url: "/esg" },
      { name: "Ética e Compliance", url: "/etica-e-compliance" }
    ] as DropdownItem[]
  },
  {
    name: "Diferenciais",
    url: "/diferenciais",
    type: "dropdown",
    items: [
      { name: "Tecnologia e Inovação", url: "/diferenciais/tecnologia-e-inovacao" },
      { name: "Gestão da Qualidade e Certificações", url: "/diferenciais/gestao-da-qualidade-e-certificacoes" }
    ] as DropdownItem[]
  },
  {
    name: "Serviços",
    url: "/servicos",
    type: "megamenu",
    items: pratikaServicesData
  },
  {
    name: "Segmentos Atendidos",
    url: "/segmentos",
    type: "megamenu",
    items: pratikaSegmentsData
  },
  {
    name: "Blog",
    url: "/blog",
    type: "link"
  },
  {
    name: "Contato",
    url: "/contato",
    type: "dropdown",
    items: [
      { name: "Fale Conosco", url: "/contato" },
      { name: "Unidades", url: "/unidades" }
    ] as DropdownItem[]
  },
  {
    name: "Solicitar Orçamento",
    url: "/orcamento",
    type: "cta"
  }
];

// Export individual data sets for component use
export default {
  pratikaNavBarLinks,
  pratikaServicesData,
  pratikaSegmentsData,
};