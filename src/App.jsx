import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-screen lg:w-[1200px] p-2 mx-auto">
        <Navbar />
      </div>
    </Provider>
  );
};

export default App;
