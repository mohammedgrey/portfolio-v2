import {
  CalendarIcon,
  CopyIcon,
  LinkIcon,
  ShareIcon,
  StarFilledIcon,
} from "@/assets/icons";
import { CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { FC } from "react";

import { ProjectType } from "@/types/common";

interface ProjectDetailsOverlayProps {
  project: ProjectType;
  onClose: () => void;
}

const ProjectDetailsOverlay: FC<ProjectDetailsOverlayProps> = ({ project }) => {
  const { title, details, image, year, type, link } = project;
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-0 flex flex-col gap-6 animate-fade-in">
        <div className="flex gap-6 items-center">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-border shadow-md shrink-0">
            <Image
              src={image || "/assets/placeholder.png"}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {title}
              <span className="ml-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {type}
              </span>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <CalendarIcon className="w-4 h-4 opacity-70" />
              <span>{year}</span>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-3 flex items-center gap-1 text-primary hover:underline"
                >
                  <LinkIcon className="w-4 h-4" />
                  Visit
                </a>
              )}
            </CardDescription>
          </div>
        </div>

        {details?.brief && (
          <div className="text-base text-muted-foreground font-medium bg-muted/40 rounded-lg px-4 py-3">
            {details.brief}
          </div>
        )}

        {details?.techs && (
          <div className="flex flex-wrap gap-2 items-center">
            <StarFilledIcon className="w-4 h-4 text-yellow-400" />
            {details.techs.map((tech: string) => (
              <span
                key={tech}
                className="bg-accent text-accent-foreground px-2 py-0.5 rounded text-xs font-semibold border border-accent/40 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Render links, PDFs, git, etc. */}
        <div className="flex flex-wrap gap-3 mt-2">
          {details?.PDF && (
            <a
              href={details.PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline bg-blue-100/60 px-2 py-1 rounded transition"
            >
              <CopyIcon className="w-4 h-4" /> PDF
            </a>
          )}
          {details?.android && (
            <a
              href={details.android}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-700 hover:underline bg-green-100/60 px-2 py-1 rounded transition"
            >
              <ShareIcon className="w-4 h-4" /> Android
            </a>
          )}
          {details?.ios && (
            <a
              href={details.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-700 hover:underline bg-gray-100/60 px-2 py-1 rounded transition"
            >
              <ShareIcon className="w-4 h-4" /> iOS
            </a>
          )}
          {details?.extension && (
            <a
              href={details.extension}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-purple-700 hover:underline bg-purple-100/60 px-2 py-1 rounded transition"
            >
              <ShareIcon className="w-4 h-4" /> Extension
            </a>
          )}
          {details?.API && (
            <a
              href={details.API}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-orange-700 hover:underline bg-orange-100/60 px-2 py-1 rounded transition"
            >
              <ShareIcon className="w-4 h-4" /> API
            </a>
          )}
          {details?.git &&
            Object.entries(details.git).map(([key, url]: [string, string]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-black hover:underline bg-muted/60 px-2 py-1 rounded transition"
              >
                <ShareIcon className="w-4 h-4" /> Git{" "}
                {key !== "both" ? `(${key})` : ""}
              </a>
            ))}
        </div>

        {/* Carousel or images if available */}
        {details?.carousel && Array.isArray(details.carousel) && (
          <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
            {details.carousel.map((img: string, idx: number) => (
              <div
                key={idx}
                className="relative w-40 h-28 rounded-lg overflow-hidden border border-border shrink-0 shadow"
              >
                <Image
                  src={img}
                  alt={`carousel-${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsOverlay;
