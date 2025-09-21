import { X } from "lucide-react";
import { useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorPicker({color, setColor}) {
  const [showPicker, setShowPicker] = useState(false);
  console.log(showPicker);
  return (
    <div className="relative flex gap-2">
      <p className="text-sm font-medium">Board color: </p>
      <div
        style={{ backgroundColor: color }}
        className="border w-5 h-5 rounded-full"
        onClick={() => setShowPicker((prev) => !prev)}
      ></div>

      {/* Color Picker */}
      <div
        className="w-full absolute top-8"
        onClick={() => setShowPicker(false)}
      >
        {showPicker && (
          <div className="w-fit mx-auto" onClick={(e) => e.stopPropagation()}>
            <ChromePicker
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
          </div>
        )}
      </div>
    </div>
  );
}
