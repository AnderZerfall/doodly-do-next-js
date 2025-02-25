import { ColorPicker } from "@components/ColorPicker/ColorPicker";
import { PredefinedColors } from "../../utils/boardSettings/boardSettings";
import "./ColorBar.scss";

export const ColorBar = () => {
  const populateColorBar = () => {
    return Object.values(PredefinedColors).map((color) => (
      <ColorPicker color={color} key={`color_picker_${color}`} />
    ));
  };

  return (
    <div className="color-bar">
      {populateColorBar()}
      {/* <ColorPicker customColor/> */}
    </div>
  );
};
