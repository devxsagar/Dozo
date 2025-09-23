import { useEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorPicker({ color, setColor }) {
  const [showPicker, setShowPicker] = useState(false);
  const colorPickerRef = useRef();
  console.log(showPicker);

  useEffect(() => {
    function handleClickOutside(event) {
      // if click is outside the color picker, close it
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="relative flex gap-2">
      <p className="text-sm font-medium">Board color: </p>
      <div
        style={{ backgroundColor: color }}
        className="border w-5 h-5 rounded-full"
        onClick={() => setShowPicker((prev) => !prev)}
      ></div>

      {/* Color Picker */}
      {showPicker && (
        <div ref={colorPickerRef} className="w-full absolute top-8">
          <ChromePicker
            color={color}
            onChange={(updatedColor) => setColor(updatedColor.hex)}
          />
        </div>
      )}
    </div>
  );
}
