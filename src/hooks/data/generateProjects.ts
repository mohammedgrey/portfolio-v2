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
      title: ProjectNameEnum.CNHI_PROJECTS,
      type: domains.healthtech,
      image: "https://www.google.com/s2/favicons?domain=seha.sa&sz=256",
      link: "https://seha.sa/",
      details: {
        brief: t("briefs.cnhiProjects"),
        techs: [
          {
            label: TechEnum.Typescript,
            value: TechEnum.Typescript,
          },
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.DotNet,
            value: TechEnum.DotNet,
          },
          {
            label: TechEnum.SQLServer,
            value: TechEnum.SQLServer,
          },
        ],
      },
      year: 2026,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.DIGITAL_TWIN,
      type: domains.healthtech,
      image: "https://www.google.com/s2/favicons?domain=seha.sa&sz=256",
      link: "https://apps.apple.com/sa/app/%D8%B5%D8%AD%D8%AA%D9%8A-sehhaty/id1459266578",
      details: {
        android:
          "https://play.google.com/store/apps/details?id=com.lean.sehhaty",
        ios: "https://apps.apple.com/sa/app/%D8%B5%D8%AD%D8%AA%D9%8A-sehhaty/id1459266578",
        brief: t("briefs.digitalTwin"),
        techs: [
          {
            label: TechEnum.Typescript,
            value: TechEnum.Typescript,
          },
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
        ],
      },
      year: 2025,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.CAPACITY_DEMAND,
      type: domains.healthtech,
      image: "https://www.google.com/s2/favicons?domain=hulool.seha.sa&sz=256",
      link: "https://hulool.seha.sa/",
      details: {
        brief: t("briefs.capacityDemand"),
        techs: [
          {
            label: TechEnum.Typescript,
            value: TechEnum.Typescript,
          },
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
        ],
      },
      year: 2025,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.OPEN_DATA,
      type: domains.healthtech,
      image: "https://www.google.com/s2/favicons?domain=hdp.moh.gov.sa&sz=256",
      link: "https://hdp.moh.gov.sa",
      details: {
        brief: t("briefs.openData"),
        techs: [
          {
            label: TechEnum.Typescript,
            value: TechEnum.Typescript,
          },
          {
            label: TechEnum.React,
            value: TechEnum.React,
          },
          {
            label: TechEnum.NextJS,
            value: TechEnum.NextJS,
          },
          {
            label: TechEnum.DotNet,
            value: TechEnum.DotNet,
          },
          {
            label: TechEnum.SQLServer,
            value: TechEnum.SQLServer,
          },
        ],
      },
      year: 2025,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.MASROOF,
      type: domains.edtech,
      image: "https://www.google.com/s2/favicons?domain=masroof.sa&sz=256",
      link: "https://www.masroof.sa/",
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
      title: ProjectNameEnum.RZERVE,
      type: domains.hospitality,
      image: "https://www.google.com/s2/favicons?domain=rzerve.com&sz=256",
      link: "https://rzerve.com/",
      details: {
        brief: t("briefs.rzerve"),
        client: "https://bonsai.rzerve.com/",
        techs: [
          {
            label: TechEnum.SurrealDB,
            value: TechEnum.SurrealDB,
          },
          {
            label: TechEnum.Vue,
            value: TechEnum.Vue,
          },
          {
            label: TechEnum.Nuxt,
            value: TechEnum.Nuxt,
          },
        ],
      },
      year: 2024,
    },
    {
      id: uuidv4(),
      title: ProjectNameEnum.KT_MESSENGER,
      type: domains.entertainment,
      image: "https://www.google.com/s2/favicons?domain=ktmessenger.com&sz=256",
      link: "https://ktmessenger.com/",
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
      type: domains.ecommerce,
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
      type: domains.healthtech,
      image: "",
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
      image: "https://www.google.com/s2/favicons?domain=macqueen.co&sz=256",
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
          {
            label: TechEnum.NodeJS,
            value: TechEnum.NodeJS,
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
      image: "https://www.google.com/s2/favicons?domain=gebhaly.com&sz=256",
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
      type: domains.ecommerce,
      link: "https://www.egparcelexpress.com/",
      image:
        "https://www.google.com/s2/favicons?domain=egparcelexpress.com&sz=256",
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
      type: domains.engineering,
      image:
        "https://www.google.com/s2/favicons?domain=lookme-up.herokuapp.com&sz=256",
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
      image:
        "https://www.google.com/s2/favicons?domain=izihandmade.web.app&sz=256",
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
      type: domains.edtech,
      image: "",
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
      image: "",
      details: {
        brief: t("briefs.spotifyClone"),
        techs: [
          {
            label: TechEnum.React,
            value: TechEnum.React,
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
      type: domains.entertainment,
      image:
        "https://www.google.com/s2/favicons?domain=drive.google.com&sz=256",
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
      image:
        "https://www.google.com/s2/favicons?domain=sheetgrader.web.app&sz=256",
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
      type: domains.engineering,
      image: "",
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
      image:
        "https://www.google.com/s2/favicons?domain=drive.google.com&sz=256",
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
      type: domains.engineering,
      image: "",
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
