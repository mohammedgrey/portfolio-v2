import { type FC } from "react";

const AppFooter: FC = () => {
  return (
    <footer className="p-4">
      <p className="text-center text-sm">
        © {new Date().getFullYear()} NextJS Template. All rights reserved.
      </p>
    </footer>
  );
};

export default AppFooter;
