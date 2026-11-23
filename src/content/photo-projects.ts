/**
 * Projetos de exemplo da página /photos. Cada item é um par antes/depois do mesmo enquadramento e mesmo tamanho.
 * Enquanto `before` ou `after` estiver vazio, a página mostra um espaço reservado (não usar banco de imagem).
 * `credit` é o crédito da foto (dono ou fonte), mostrado em texto pequeno abaixo do slider.
 * `large` ocupa a largura toda da grade (destaque).
 */
export type PhotoProject = {
  room: string;
  adjust: string;
  before: string;
  after: string;
  credit: string;
  alt: string;
  large?: boolean;
};

export const PHOTO_PROJECTS: PhotoProject[] = [
  {
    room: "Exterior",
    adjust: "brighter facade, richer sky, greener lawn",
    before: "/photos/park-estates/fachada-before.webp",
    after: "/photos/park-estates/fachada-after.webp",
    credit: "",
    alt: "Two-story house exterior with a driveway and lawn",
    large: true,
  },
  {
    room: "Pool area",
    adjust: "clearer water, cleaner lawn and edges",
    before: "/photos/park-estates/piscina-before.webp",
    after: "/photos/park-estates/piscina-after.webp",
    credit: "",
    alt: "Backyard pool beside the house",
  },
  {
    room: "Patio",
    adjust: "richer sky, clearer water, true colors",
    before: "/photos/park-estates/varanda-before.webp",
    after: "/photos/park-estates/varanda-after.webp",
    credit: "",
    alt: "Covered patio with outdoor seating next to a pool",
  },
  {
    room: "Kitchen",
    adjust: "brighter light, true colors, cleaner counters",
    before: "/photos/park-estates/cozinha-before.webp",
    after: "/photos/park-estates/cozinha-after.webp",
    credit: "",
    alt: "Kitchen with an island, bar stools and pendant lights",
    large: true,
  },
  {
    room: "Suite",
    adjust: "brighter light, true colors",
    before: "/photos/park-estates/suite-before.webp",
    after: "/photos/park-estates/suite-after.webp",
    credit: "",
    alt: "Suite with a bed and windows",
  },
  {
    room: "Living room",
    adjust: "brighter light, true colors",
    before: "/photos/park-estates/sala-sofa-before.webp",
    after: "/photos/park-estates/sala-sofa-after.webp",
    credit: "",
    alt: "Living room with a large sectional sofa and plants",
  },
];
