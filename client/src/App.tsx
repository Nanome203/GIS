import { useState } from "react";
import Authentication from "./routes/Authentication";
import { context } from "./utils/context";
import MainPage from "./routes/MainPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <context.Provider value={{ setIsLoggedIn }}>
      {isLoggedIn ? <MainPage /> : <Authentication />}
    </context.Provider>
  );
}

export default App;
