import React from "react";
import Upload from "./components/Upload";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center">Media Hosting App</h1>
      <Upload />
    </div>
  );
};

export default App;
