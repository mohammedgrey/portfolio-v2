import { personalInfo } from "@/data/personalInfo";
import { socials } from "@/data/socials";
import useEducation from "@/hooks/data/useEducation";
import useExperience from "@/hooks/data/useExperience";
import useInterests from "@/hooks/data/useInterests";
import useProjects from "@/hooks/data/useProjects";
import useSkills from "@/hooks/data/useSkills";

const formatMonthYear = (date: Date | null) => {
  if (!date) return "Present";

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const formatWorkType = (workType: string) => {
  return workType
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");
};

const useAiContext = () => {
  const { experienceItems } = useExperience();
  const { skillCategories } = useSkills();
  const { educationItems } = useEducation();
  const { languages, interestItems } = useInterests();
  const { projects } = useProjects();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const allSkills = Array.from(
    new Set(skillCategories.flatMap((category) => category.skills)),
  ).join(", ");

  const socialLinks = socials
    .map((social) => `${social.title} (${social.link})`)
    .join(", ");

  const languageSummary = languages
    .map((lang) => `${lang.language} (${lang.proficiency})`)
    .join(", ");

  const educationSummary = educationItems
    .map((education) => {
      const scorePart = education.gpa
        ? ` - GPA: ${education.gpa}`
        : education.score
          ? ` - Score: ${education.score}`
          : "";

      return `- ${education.degree} - ${education.institution} (Graduated ${formatMonthYear(education.graduationDate)})${scorePart}`;
    })
    .join("\n");

  const workExperienceSummary = experienceItems
    .map((experience, index) => {
      const technologies = experience.technologies
        .map((technology) => technology.label)
        .join(", ");

      return `${index + 1}. ${experience.company.toUpperCase()} (${formatMonthYear(experience.startDate)} - ${formatMonthYear(experience.endDate)}) - ${experience.position}, ${experience.location} (${formatWorkType(experience.workType)})\n   - ${experience.description}\n   - Technologies: ${technologies}`;
    })
    .join("\n\n");

  const projectsSortedByYear = [...projects].sort((a, b) => b.year - a.year);
  const mainProjects = projectsSortedByYear.slice(0, 10);
  const additionalProjects = projectsSortedByYear.slice(10);
  const portfolioStartYear = Math.min(
    ...projects.map((project) => project.year),
  );
  const portfolioEndYear = Math.max(...projects.map((project) => project.year));

  const formatProjectLine = (
    project: (typeof projectsSortedByYear)[number],
    index?: number,
  ) => {
    const technologies = project.details.techs
      .map((tech) => tech.label)
      .join(", ");
    const linkSuffix = project.link ? ` - ${project.link}` : "";

    const prefix = typeof index === "number" ? `${index + 1}. ` : "";

    return `${prefix}${project.title.toUpperCase()} (${project.year}) - ${project.details.brief.split("\n")[0]} - Built with ${technologies}${linkSuffix}`;
  };

  const projectPortfolioSummary = mainProjects
    .map((project, index) => formatProjectLine(project, index))
    .join("\n");

  const additionalProjectsSummary = additionalProjects
    .map((project) => `- ${formatProjectLine(project)}`)
    .join("\n");

  const interestsSummary = interestItems
    .map((interest) => {
      if (interest.date) {
        return `- ${interest.title} (${formatMonthYear(interest.date)}): ${interest.description}`;
      }

      if (interest.startDate || interest.endDate) {
        return `- ${interest.title} (${formatMonthYear(interest.startDate ?? null)} - ${formatMonthYear(interest.endDate ?? null)}): ${interest.description}`;
      }

      return `- ${interest.title}: ${interest.description}`;
    })
    .join("\n");

  const context = `You are supposed to provide helpful answers to the user's questions based on the context provided. The response should sound smart, human, and friendly. You are an AI to help the user know more info about Mohammed Dawood's portfolio and projects.
If the user is asking a neutral question like "Hi", "Hmmm", "Hello", "How are you?", "Whats up?", "Hi there", "...etc. respond in a friendly manner and be proactive to mention the things you can help with.
If the user is asking a totally unrelated question. You can respond with a funny and polite message saying you can only answer questions related to Mohammed Dawood's portfolio and projects. and make sure to add some humor to it as well as make some suggestions on what they can ask.
You should respond in the same language the user is using.
Here is some context about Mohammed Dawood's portfolio and projects:
- Today's date is ${currentDate}.
- The current year is ${currentYear}.
- Mohammed Dawood is a software engineer specializing in web and mobile applications. Expert in Frontend and React.
- He started his professional software engineering career in September 2020.
- He has experience with technologies such as ${allSkills}.
- His portfolio showcases various projects demonstrating his skills and expertise in these technologies.
- He is passionate about building user-friendly and efficient applications.
- Don't start the sentence with greeting unless the user is actually greeting.
- Keep the tone professional, concise, and credible.
- You can highlight Mohammed's strengths, but avoid exaggerated praise, slangy compliments, or hype language.
- Prefer evidence-based wording (projects, outcomes, technologies, impact) over promotional wording.
- Don't be a robot, keep the tone friendly and human-like.
- When the user asks about time-related wording like "this year", "last year", "currently", or "recently", interpret it using the current year/date above.

PERSONAL INFORMATION:
- Full Name: ${personalInfo.name}
- Location: ${personalInfo.location.city}, ${personalInfo.location.country}
- Email: ${personalInfo.email}
- Phone: ${personalInfo.phone}
- Social Links: ${socialLinks}
- Languages: ${languageSummary}

EDUCATION:
${educationSummary}

WORK EXPERIENCE:
${workExperienceSummary}

INTERESTS & ACHIEVEMENTS:
${interestsSummary}

PROJECT PORTFOLIO (${portfolioStartYear}-${portfolioEndYear}):
${projectPortfolioSummary}

ADDITIONAL PROJECTS:
${additionalProjectsSummary}
`;

  return {
    context,
  };
};

export default useAiContext;

export type UseAiContextReturn = ReturnType<typeof useAiContext>;
