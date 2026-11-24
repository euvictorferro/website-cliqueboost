/**
 * Projetos de exemplo da página /photos. Cada item é um par antes/depois do mesmo enquadramento e mesmo tamanho.
 * Enquanto `before` ou `after` estiver vazio, a página mostra um espaço reservado (não usar banco de imagem).
 */
export type PhotoProject = {
  room: string;
  adjust: string;
  before: string;
  after: string;
  alt: string;
  large?: boolean;
};

export const PHOTO_PROJECTS: PhotoProject[] = [
  {
    room: "Exterior",
    adjust: "brighter facade, richer sky, greener lawn",
    before: "/photos/park-estates/fachada-before.webp",
    after: "/photos/park-estates/fachada-after.webp",
    alt: "Two-story house exterior with a driveway and lawn",
    large: true,
  },
  {
    room: "Kitchen",
    adjust: "brighter light, true colors",
    before: "/photos/park-estates/cozinha-before.webp",
    after: "/photos/park-estates/cozinha-after.webp",
    alt: "Kitchen with an island, bar stools and pendant lights",
    large: true,
  },
  {
    room: "Living room",
    adjust: "brighter light, true colors",
    before: "/photos/park-estates/sala-sofa-before.webp",
    after: "/photos/park-estates/sala-sofa-after.webp",
    alt: "Living room with a large sectional sofa and plants",
  },
  {
    room: "Formal living room",
    adjust: "brighter light, true colors",
    before: "/photos/park-estates/sala-formal-before.webp",
    after: "/photos/park-estates/sala-formal-after.webp",
    alt: "Formal living room with a sofa, a piano and a large window",
  },
  {
    room: "Loft",
    adjust: "brighter light, true colors",
    before: "/photos/park-estates/loft-before.webp",
    after: "/photos/park-estates/loft-after.webp",
    alt: "Loft with a sectional sofa and three windows",
  },
  {
    room: "Suite",
    adjust: "brighter light, true colors",
    before: "/photos/park-estates/suite-before.webp",
    after: "/photos/park-estates/suite-after.webp",
    alt: "Suite with a bed and windows",
  },
];
