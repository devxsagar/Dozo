import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="font-medium text-7xl"></div>
    </Provider>
  );
};

export default App;
