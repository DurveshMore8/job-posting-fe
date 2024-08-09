import { ChangeEvent, FunctionComponent, useState } from "react";
import "./style.css";
import Visibility from "../icons/visibility";
import VisibilityOff from "../icons/visibility_off";

interface TextfieldProps {
  id: string;
  value: string;
  placeholder: string;
  isPassword?: boolean;
  type: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

const Textfield: FunctionComponent<TextfieldProps> = ({
  id,
  value,
  placeholder,
  isPassword = false,
  type,
  onChange,
  readonly = false,
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="textfield">
      <input
        className="textfield-input"
        id={id}
        onChange={onChange}
        type={isPassword ? (show ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        readOnly
      />
      {isPassword &&
        (show ? (
          <button
            type="button"
            className="textfield-icon"
            onClick={() => setShow(false)}
          >
            <VisibilityOff />
          </button>
        ) : (
          <button
            type="button"
            className="textfield-icon"
            onClick={() => setShow(true)}
          >
            <Visibility />
          </button>
        ))}
    </div>
  );
};

export default Textfield;
