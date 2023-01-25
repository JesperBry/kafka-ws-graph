import React from "react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

const IconButton = ({ children, onClick }: Props) => {
  return (
    <div className="icon-button" onClick={onClick}>
      {children}
    </div>
  );
};

export default IconButton;
