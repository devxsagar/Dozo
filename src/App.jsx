import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import { clarity } from "react-microsoft-clarity";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

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
    } else {
      document.documentElement.classList.remove("dark");
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
      <div className="dark:bg-dark-bg-body">
        <div className="max-w-screen lg:w-[1200px] p-2 mx-auto">
          <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <Board />
        </div>
      </div>
    </Provider>
  );
};

export default App;
