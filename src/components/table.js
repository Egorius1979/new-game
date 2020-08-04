import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import { setGameTable, setCell, cellClicked } from "../Reducers/game";

const Table = () => {
  const table = useSelector((store) => store.game.table);
  const gametable = useSelector((store) => store.game.gametable);
  const winner = useSelector((store) => store.game.winner);
  const counter = useSelector((store) => store.game.counter);
  const timer = useSelector((store) => store.game.timer);
  const width = 40 * table.y;
  const dispatch = useDispatch();

  useEffect(() => {
    if (table.x >= 2 && table.y >= 2) {
      dispatch(setGameTable(table));
    }
  }, [table]);

  useEffect(() => {
    if (Object.keys(gametable).length) {
      const timerId = setTimeout(
        () => dispatch(setCell(gametable, counter)),
        timer
      );
      if (winner) {
        clearTimeout(timerId);
      }
    }
  }, [gametable]);

  if (table.x >= 2 && table.y >= 2) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 bg-gray-400">
        <div className="flex flex-wrap" style={{ width: `${width}px` }}>
          {Object.keys(gametable).map((it) => (
            <button
              key={it}
              type="button"
              aria-label="click"
              // className={`table__element ${
              //   gametable[it] === "yellow"
              //     ? "bg-orange-300"
              //     : gametable[it] === "green"
              //     ? "bg-green-300"
              //     : "bg-red-300"
              // }`}
              className={classnames("table__element", {
                "bg-orange-300": gametable[it] === "yellow",
                "bg-green-300": gametable[it] === "green",
                "bg-red-300": gametable[it] === "red",
              })}
              onClick={() => {
                if (gametable[it] === "yellow") {
                  dispatch(cellClicked(it));
                }
              }}
            />
          ))}
        </div>
        <div>{counter}</div>
        <div className="mt-5 text-2xl text-teal-800">{winner}</div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <div className="w-64 mt-10 px-4 py-2 border-2 bg-gray-800 border-teal-600 rounded-lg  text-center text-white">
        Игра: создаётся поле X * Y. Через равные промежутки времени в случайном
        порядке выбирается клетка. Успейте нажать на неё, пока она жёлтого
        цвета. Выигрывает тот, чьих клеток ( зелёные - ваши, красные -
        компьютера) будет больше половины от общего количества. Удачи!
      </div>
    </div>
  );
};

Table.propTypes = {};

export default Table;
