import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkSide from "../hooks/useDarkSide";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(colorTheme === "light");

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const DarkModeSwitchAny = DarkModeSwitch as any;

  return (
    <DarkModeSwitchAny
      style={{ marginTop: "5px" }}
      checked={darkSide}
      onChange={toggleDarkMode}
      size={30}
      sunColor="white"
      moonColor="black"
    />
  );
}
