import React, { ReactNode } from "react";
import clsx from "clsx"; 

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <div className={clsx("flex flex-1 flex-col p-4", className)}>
      {children}
    </div>
  );
};

export default Wrapper;
