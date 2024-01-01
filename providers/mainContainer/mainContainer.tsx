import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
}

const MainContainer = ({ children }: GradientTextProps) => {
  return <div className="w-full maxWidthContainer mx-auto">{children}</div>;
};

export default MainContainer;
