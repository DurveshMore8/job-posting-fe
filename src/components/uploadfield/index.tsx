import { ChangeEvent, FunctionComponent } from "react";
import "./style.css";

interface UploadfieldProps {
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Uploadfield: FunctionComponent<UploadfieldProps> = ({
  name,
  onChange,
}) => {
  return (
    <div className="uploadfield">
      <label className="uploadfield-label" htmlFor="file-upload">
        {name.length == 0 ? "Profile Image" : name}
      </label>
      <input
        id="file-upload"
        className="uploadfield-input"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </div>
  );
};

export default Uploadfield;
