import React from "react";
import Start from "./start";
import Table from "./table";

const App = () => {
  return (
    <div className="bg-gray-400 h-screen pt-5">
      <div>
        <Start />
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
};

export default App;
