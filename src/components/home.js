import React from "react";
import Start from "./start";
import Table from "./table";

const Home = () => {
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

Home.propTypes = {};

export default Home;
