import React from "react";

const Button = ({ label }: { label: string }) => {
  return <button className="btn-primary">{label}</button>;
};

export default Button;
