import Button from "@/components/button";
import Close from "@/components/icons/close";
import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import "./style.css";
import Textfield from "@/components/textfield";

interface CategoryPopupProps {
  viewCategory: boolean;
  setViewCategory: Dispatch<SetStateAction<boolean>>;
  createCategory: (category: string) => void;
}

const CategoryPopup: FunctionComponent<CategoryPopupProps> = ({
  viewCategory,
  setViewCategory,
  createCategory,
}) => {
  const [categoryName, setCategoryName] = useState<string>("");

  const handleClick = () => {
    createCategory(categoryName);
    setCategoryName("");
  };

  return (
    <div className={`category-popup ${viewCategory && "show"}`}>
      <div className="category-popup-section">
        <div onClick={() => setViewCategory(false)} className="category-close">
          <Close />
        </div>
        <div className="category-form">
          <Textfield
            id={"categoryName"}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder={"Category Name"}
            type={"text"}
          />
          <Button value={"Add"} onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;
