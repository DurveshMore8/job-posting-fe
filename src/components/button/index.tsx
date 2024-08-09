import { FunctionComponent } from "react";
import "./style.css";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  value: string;
  onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  type = undefined,
  value,
  onClick = () => {},
}) => {
  return (
    <button type={type} className="button" onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
