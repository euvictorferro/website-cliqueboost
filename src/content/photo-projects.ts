/**
 * Projetos de exemplo da página /photos. Cada item é um par antes/depois do mesmo enquadramento e mesmo tamanho.
 * Enquanto `before` ou `after` estiver vazio, a página mostra um espaço reservado (não usar banco de imagem).
 * `credit` é o crédito da foto (dono ou fonte), mostrado em texto pequeno abaixo do slider.
 */
export type PhotoProject = {
  room: string;
  adjust: string;
  before: string;
  after: string;
  credit: string;
  alt: string;
};

export const PHOTO_PROJECTS: PhotoProject[] = [
  {
    room: "Pool area",
    adjust: "clearer water, cleaner lawn and edges",
    before: "/photos/park-estates/piscina-before.webp",
    after: "/photos/park-estates/piscina-after.webp",
    credit: "",
    alt: "Backyard pool beside the house",
  },
  {
    room: "Living room",
    adjust: "brighter light, true colors, cleaner walls",
    before: "/photos/park-estates/sala-formal-before.webp",
    after: "/photos/park-estates/sala-formal-after.webp",
    credit: "",
    alt: "Formal living room with a piano and a sofa",
  },
  {
    room: "Loft",
    adjust: "brighter light, true colors, cleaner walls",
    before: "/photos/park-estates/loft-before.webp",
    after: "/photos/park-estates/loft-after.webp",
    credit: "",
    alt: "Loft with a large sofa",
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
    room: "Bedroom",
    adjust: "brighter light, true colors",
    before: "/photos/park-estates/quarto-before.webp",
    after: "/photos/park-estates/quarto-after.webp",
    credit: "",
    alt: "Bedroom with white furniture and a bed",
  },
];
