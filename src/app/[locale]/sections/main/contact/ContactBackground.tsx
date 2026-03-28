import { type FC } from "react";

const ContactBackground: FC = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Grid Pattern */}
          <pattern
            id="contact-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1.5" className="fill-primary/20" />
          </pattern>

          {/* Gradient 1 */}
          <radialGradient id="contact-grad-1">
            <stop
              offset="0%"
              className="text-primary/10"
              stopColor="currentColor"
            />
            <stop
              offset="100%"
              className="text-primary/0"
              stopColor="currentColor"
            />
          </radialGradient>

          {/* Gradient 2 */}
          <radialGradient id="contact-grad-2">
            <stop
              offset="0%"
              className="text-primary/15"
              stopColor="currentColor"
            />
            <stop
              offset="100%"
              className="text-primary/0"
              stopColor="currentColor"
            />
          </radialGradient>

          {/* Gradient 3 */}
          <radialGradient id="contact-grad-3">
            <stop
              offset="0%"
              className="text-primary/8"
              stopColor="currentColor"
            />
            <stop
              offset="100%"
              className="text-primary/0"
              stopColor="currentColor"
            />
          </radialGradient>
        </defs>

        {/* Grid Background */}
        <rect
          width="100%"
          height="100%"
          fill="url(#contact-grid)"
          opacity="0.5"
        />

        {/* Decorative Circles */}
        <circle cx="10%" cy="20%" r="300" fill="url(#contact-grad-1)" />
        <circle cx="90%" cy="80%" r="350" fill="url(#contact-grad-2)" />
        <circle cx="50%" cy="50%" r="200" fill="url(#contact-grad-3)" />

        {/* Abstract Shapes */}
        <path
          d="M0,400 Q300,200 600,400 T1200,400"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-primary/10"
          opacity="0.3"
        />
        <path
          d="M0,500 Q400,300 800,500 T1200,500"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-primary/10"
          opacity="0.2"
        />
      </svg>
    </div>
  );
};

export default ContactBackground;
