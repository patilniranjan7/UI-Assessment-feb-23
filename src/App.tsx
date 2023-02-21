import React, { useEffect } from "react";
import "./App.css";
import UserProfileCard from "./components/user/UserProfileCard";
import { makeServer } from "./server";

function App() {
  useEffect(() => {
    makeServer();
  }, []);

  return (
    <div className="App">
      <UserProfileCard />
    </div>
  );
}

export default App;
