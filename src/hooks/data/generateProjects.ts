import { NestedTranslationKey } from "@/i18n/types";
import { ProjectType } from "@/types/common";
import { ProjectNameEnum, TechEnum } from "@/types/enums";
import { v4 as uuidv4 } from "uuid";
import { generateDomains } from "./generateDomains";

export const generateProjects = (
  t: (key: NestedTranslationKey<"Projects">) => string,
  domains: ReturnType<typeof generateDomains>,
) => {
  const projects: ProjectType[] = [
    {
      id: uuidv4(),
      title: ProjectNameEnum.MASROOF,
      type: domains.education,
      image: "", // TODO: Update image
      details: {
        brief: t("briefs.masroof"),
        techs: [
          {
            label: TechEnum.Typescript,
            value: TechEnum.Typescript,
          },
          {
            label: TechEnum.ReactNative,
            value: TechEnum.ReactNative,
          },
        ],
      },
      year: 2024,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.KT_MESSENGER,
      type: domains.messaging,
      image: "", // TODO: Update image
      details: {
        brief: t("briefs.ktMessenger"),
        techs: [
          {
            label: TechEnum.Typescript,
            value: TechEnum.Typescript,
          },
          {
            label: TechEnum.ReactNative,
            value: TechEnum.ReactNative,
          },
        ],
      },
      year: 2023,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.CORNERS,
      type: domains.delivery,
      image: "", // TODO: Update image
      details: {
        brief: t("briefs.corners"),
        techs: [
          {
            label: TechEnum.Typescript,
            value: TechEnum.Typescript,
          },
          {
            label: TechEnum.ReactNative,
            value: TechEnum.ReactNative,
          },
        ],
      },
      year: 2023,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.AT_HOME_DOC,
      type: domains.enterprise,
      image: "/assets/images/projects/ahd/cover.png",
      link: "https://ahd-dashboard.metadoc.care/",
      details: {
        PDF: "/assets/pdfs/ahd.pdf",
        brief: t("briefs.atHomeDoc"),
        techs: [
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.NextJS,
            value: TechEnum.NextJS,
          },
          {
            label: TechEnum.GraphQl,
            value: TechEnum.GraphQl,
          },
        ],
      },
      year: 2023,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.MACQUEEN,
      type: domains.hospitality,
      link: "https://www.macqueen.co/",
      image: "/assets/images/projects/macqueen/cover.png",
      details: {
        android:
          "https://play.google.com/store/apps/details?id=com.zeidex.macqueen&hl=en&gl=US",
        ios: "https://apps.apple.com/sa/app/macqueen/id1495088277",
        brief: t("briefs.macQueen"),
        techs: [
          {
            label: TechEnum.ReactNative,
            value: TechEnum.ReactNative,
          },
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.NextJS,
            value: TechEnum.NextJS,
          },
        ],
      },
      year: 2023,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.GEBHALY,
      type: domains.ecommerce,
      link: "https://www.gebhaly.com/",
      image: "/assets/images/projects/gebhaly/cover.png",
      details: {
        extension:
          "https://chrome.google.com/webstore/detail/gebhaly/kadfaclbnegniefcmnnlpleggkhmkcne",
        brief: t("briefs.gebhaly"),
        techs: [
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.NextJS,
            value: TechEnum.NextJS,
          },
        ],
      },
      year: 2022,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.EG_PARCEL_EXPRESS,
      type: domains.logistics,
      link: "https://www.egparcelexpress.com/",
      image: "/assets/images/projects/egparcelexpress/cover.png",
      details: {
        brief: t("briefs.egParcelExpress"),
        techs: [
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.NextJS,
            value: TechEnum.NextJS,
          },
        ],
      },
      year: 2022,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.LOOK_ME_UP,
      type: domains.search,
      link: "https://lookkmeup.web.app/",
      image: "/assets/images/projects/lookmeup/cover.png",
      details: {
        brief: t("briefs.lookMeUp"),
        techs: [
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.SpringBoot,
            value: TechEnum.SpringBoot,
          },
          {
            label: TechEnum.MongoDB,
            value: TechEnum.MongoDB,
          },
        ],
        git: {
          both: "https://github.com/mohammedgrey/Search-Engine",
        },
        API: "https://lookme-up.herokuapp.com/",
        PDF: "/assets/pdfs/SearchEngine.pdf",
      },
      year: 2021,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.IZI_HANDMADE,
      type: domains.ecommerce,
      link: "https://izihandmade.web.app/",
      image: "/assets/images/projects/izi/cover.png",
      details: {
        brief: t("briefs.iziHandmade"),
        techs: [
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.NodeJS,
            value: TechEnum.NodeJS,
          },
          {
            label: TechEnum.Express,
            value: TechEnum.Express,
          },
          {
            label: TechEnum.MongoDB,
            value: TechEnum.MongoDB,
          },
          {
            label: TechEnum.Firebase,
            value: TechEnum.Firebase,
          },
        ],
        git: {
          client: "https://github.com/mohammedgrey/izi",
          server: "https://github.com/mohammedgrey/iziserver",
        },
      },
      year: 2021,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.EGY_SCHOOLS,
      type: domains.education,
      image: "/assets/images/projects/schools/cover.png",
      details: {
        brief: t("briefs.egySchools"),
        techs: [
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.Flutter,
            value: TechEnum.Flutter,
          },
        ],
        carousel: [
          "https://res.cloudinary.com/dxome9kh1/image/upload/v1623331280/Portfolio/EgySchoolsCarousel%20/1_hysikz.png",
          "https://res.cloudinary.com/dxome9kh1/image/upload/v1623331281/Portfolio/EgySchoolsCarousel%20/2_taecgt.png",
          "https://res.cloudinary.com/dxome9kh1/image/upload/v1623331278/Portfolio/EgySchoolsCarousel%20/3_w5kg12.png",
          "https://res.cloudinary.com/dxome9kh1/image/upload/v1623331286/Portfolio/EgySchoolsCarousel%20/4_lresdt.png",
          "https://res.cloudinary.com/dxome9kh1/image/upload/v1623334296/Portfolio/EgySchoolsCarousel%20/5_exwbhs.png",
          "https://res.cloudinary.com/dxome9kh1/image/upload/v1623334296/Portfolio/EgySchoolsCarousel%20/6_nmnqcl.png",
        ],
        PDF: "/assets/pdfs/Datatec.pdf",
      },
      year: 2020,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.SPOTIFY_CLONE,
      type: domains.entertainment,
      image: "/assets/images/projects/spotify/cover.png",
      details: {
        brief: t("briefs.spotifyClone"),
        techs: [
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.Redux,
            value: TechEnum.Redux,
          },
          {
            label: TechEnum.ReactRouter,
            value: TechEnum.ReactRouter,
          },
        ],
        git: {
          client: "https://github.com/FatemaFawzy/Frontend-Team",
        },
      },
      year: 2020,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.SANTA_GAME,
      type: domains.gaming,
      image: "/assets/images/projects/santa/cover.png",
      link: "https://drive.google.com/file/d/1RSvIiQUV_hW8EbJwNwemhZwKQCLNBjBw/view?usp=sharing",
      details: {
        brief: t("briefs.santaGame"),
        techs: [
          {
            label: TechEnum.OpenGL,
            value: TechEnum.OpenGL,
          },
          {
            label: TechEnum.Cpp,
            value: TechEnum.Cpp,
          },
        ],
        git: {
          both: "https://github.com/mohammedgrey/GameEngine",
        },
      },
      year: 2022,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.GRADES_AUTOFILLER,
      type: domains.aiMl,
      image: "/assets/images/projects/sheetgrader/cover.png",
      link: "https://sheetgrader.web.app/",
      details: {
        brief: t("briefs.gradesAutofiller"),
        techs: [
          {
            label: TechEnum.Python,
            value: TechEnum.Python,
          },
          {
            label: TechEnum.OpenCV,
            value: TechEnum.OpenCV,
          },
          {
            label: TechEnum.Flask,
            value: TechEnum.Flask,
          },
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
        ],
        git: {
          both: "https://github.com/MoaazZaki/grade_auto_filler",
        },

        PDF: "/assets/pdfs/ImageProcessing.pdf",
      },
      year: 2022,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.HARVARD_PROCESSOR,
      type: domains.hardware,
      image: "/assets/images/projects/processor/cover.png",
      containImage: true,
      details: {
        brief: t("briefs.harvardProcessor"),
        techs: [
          {
            label: TechEnum.VHDL,
            value: TechEnum.VHDL,
          },
        ],
        git: {
          both: "https://github.com/MoaazZaki/HarvardProcessor",
        },
        PDF: "/assets/pdfs/Processor.pdf",
      },
      year: 2021,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.FONT_CLASSIFIER,
      type: domains.aiMl,
      image: "/assets/images/projects/fontclassifier/cover.png",
      link: "https://drive.google.com/file/d/1D5ahomRW4M7fShPb3K_HgJEOPcoD0TtX/view?usp=sharing",
      details: {
        brief: t("briefs.fontClassifier"),
        techs: [
          {
            label: TechEnum.Python,
            value: TechEnum.Python,
          },
          {
            label: TechEnum.ScikitLearn,
            value: TechEnum.ScikitLearn,
          },
          {
            label: TechEnum.OpenCV,
            value: TechEnum.OpenCV,
          },
        ],
        PDF: "/assets/pdfs/FontClassifier.pdf",
      },
      year: 2020,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.SRP,
      type: domains.networking,
      image: "/assets/images/projects/networks/cover.png",
      details: {
        brief: t("briefs.srp"),
        techs: [
          {
            label: TechEnum.Omnetpp,
            value: TechEnum.Omnetpp,
          },
          {
            label: TechEnum.Cpp,
            value: TechEnum.Cpp,
          },
        ],
        git: {
          both: "https://github.com/mohammedgrey/SelectiveRepeatProtocol",
        },
      },
      year: 2022,
    },
  ];

  return projects;
};
