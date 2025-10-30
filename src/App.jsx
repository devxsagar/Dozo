import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { clarity } from "react-microsoft-clarity";
import Footer from "./components/Footer";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Microsoft Clarity
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      clarity.init("twxi7ytvvo");
    }
  }, []);

  // useEffect runs whenever `darkMode` changes
  useEffect(() => {
    // It adds or removes the 'dark' class on the <html> element
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f0f0f";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f9fafb";
    }
    // save the theme to the local storage
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle function to switch between light and dark modes
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Provider store={store}>
      <div>
        <div className="max-w-screen lg:w-[1200px] min-h-screen p-2 mx-auto flex flex-col justify-between gap-y-20">
          <div>
            <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <Board />
          </div>
          <Footer />
        </div>
      </div>
    </Provider>
  );
};

export default App;
