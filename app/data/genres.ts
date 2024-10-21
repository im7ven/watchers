import toystoryCover from "@/public/toystoryCover.png";
import bladeCover from "@/public/bladeCover.png";
import screamCover from "@/public/screamCover.png";
import titanicCover from "@/public/titanicCover.png";
import willywonkaCover from "@/public/willywonkaCover.png";
import martrixCover from "@/public/matrixCover.png";
import harrypotterCover from "@/public/harrypotterCover.png";
import hangoverCover from "@/public/hangoverCover.png";
import americansniperCover from "@/public/americansniperCover.png";
import cloverfieldCover from "@/public/cloverfieldCover.png";
import djangoCover from "@/public/djangoCover.png";
import starwarsCover from "@/public/starwarsCover.png";
import heatCover from "@/public/heatCover.png";
import tencommandmentsCover from "@/public/tencommandmentsCover.png";
import dragontattooCover from "@/public/dragontattooCover.png";
import pulpfictionCover from "@/public/pulpfictionCover.jpg";
import marchofpeguinsCover from "@/public/marchofpeguinsCover.png";
import whiplashCover from "@/public/whiplashCover.png";
import { StaticImageData } from "next/image";

type Genre = {
  id: number;
  name: string;
  image?: StaticImageData;
};

const genres: Genre[] = [
  {
    id: 28,
    name: "Action",
    image: bladeCover,
  },
  {
    id: 12,
    name: "Adventure",
    image: starwarsCover,
  },
  {
    id: 16,
    name: "Animation",
    image: toystoryCover,
  },
  {
    id: 35,
    name: "Comedy",
    image: hangoverCover,
  },
  {
    id: 80,
    name: "Crime",
    image: heatCover,
  },
  {
    id: 99,
    name: "Documentary",
    image: marchofpeguinsCover,
  },
  {
    id: 18,
    name: "Drama",
    image: pulpfictionCover,
  },
  {
    id: 10751,
    name: "Family",
    image: willywonkaCover,
  },
  {
    id: 14,
    name: "Fantasy",
    image: harrypotterCover,
  },
  {
    id: 36,
    name: "History",
    image: tencommandmentsCover,
  },
  {
    id: 27,
    name: "Horror",
    image: screamCover,
  },
  {
    id: 10402,
    name: "Music",
    image: whiplashCover,
  },
  {
    id: 9648,
    name: "Mystery",
    image: dragontattooCover,
  },
  {
    id: 10749,
    name: "Romance",
    image: titanicCover,
  },
  {
    id: 878,
    name: "Science Fiction",
    image: martrixCover,
  },
  {
    id: 53,
    name: "Thriller",
    image: cloverfieldCover,
  },
  {
    id: 10752,
    name: "War",
    image: americansniperCover,
  },
  {
    id: 37,
    name: "Western",
    image: djangoCover,
  },
];

export default genres;
