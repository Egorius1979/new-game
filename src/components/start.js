import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTable, levelDown, levelUp } from "../reducers/game";

const Start = () => {
  const [valueX, setValueX] = useState("");
  const [valueY, setValueY] = useState("");
  const message = useSelector((store) => store.game.level_message);
  const counter = useSelector((store) => store.game.counter);
  const dispatch = useDispatch();

  const setX = (e) => {
    if (!Number.isNaN(+e.target.value)) {
      if (e.target.value > 8) {
        setValueX(8);
      } else {
        setValueX(+e.target.value);
      }
    }
  };

  const setY = (e) => {
    if (!Number.isNaN(+e.target.value)) {
      if (e.target.value > 8) {
        setValueY(8);
      } else {
        setValueY(+e.target.value);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        {`X: `}
        <input
          className="border-gray-700 border mt-2 mr-4 text-center outline-none placeholder-opacity-50 w-40"
          placeholder="min-2, max-8"
          type="text"
          value={valueX}
          onChange={setX}
        />
      </div>
      <div>
        {`Y: `}
        <input
          className="border-gray-700 border mt-2 mr-4 text-center outline-none placeholder-opacity-50 w-40"
          placeholder="min-2, max-8"
          type="text"
          value={valueY}
          onChange={setY}
        />
      </div>
      <div className="flex mt-4">
        <button
          type="button"
          className="level__button hover:bg-gray-900 bg-gray-800 text-white outline"
          onClick={() => dispatch(levelDown(message))}
        >
          -
        </button>
        <div className="w-16 text-center">{message}</div>
        <button
          type="button"
          className="level__button hover:bg-gray-900 bg-gray-800 text-white outline"
          onClick={() => dispatch(levelUp(message))}
        >
          +
        </button>
      </div>
      <div>
        <button
          type="button"
          className="bg-yellow-800 hover:bg-orange-800 text-white mt-6 px-8 py-2 rounded-full shadow-lg outline"
          onClick={() => {
            if (!counter) {
              dispatch(setTable(valueX, valueY));
            }
          }}
        >
          start!
        </button>
      </div>
    </div>
  );
};

export default Start;
