const SET_TABLE = "SET_TABLE";
const SET_GAME_TABLE = "SET_GAME_TABLE";
const SET_CELL = "SET_CELL";
const SET_GREEN_CELL = "GET_GREEN_CELL";
const SET_LEVEL = "SET_LEVEL";

const initialState = {
  table: {},
  gametable: {},
  winner: "",
  greencell: 0,
  counter: 0,
  level_message: "normal",
  timer: 800,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE:
      return { ...state, table: action.table };
    case SET_GAME_TABLE:
      return {
        ...state,
        gametable: action.gametable,
        winner: "",
        counter: 0,
        greencell: 0,
      };
    case SET_CELL:
      return {
        ...state,
        gametable: action.gametable,
        counter: action.counter,
        winner: action.winner,
      };
    case SET_GREEN_CELL:
      return { ...state, greencell: action.it };
    case SET_LEVEL:
      return { ...state, level_message: action.l_message, timer: action.timer };

    default:
      return state;
  }
};

export function setTable(x, y) {
  return { type: SET_TABLE, table: { x, y } };
}

export function setGameTable(table) {
  const array = new Array(table.x * table.y).fill(0);
  const gametable = array.reduce((acc, rec, index) => {
    return { ...acc, [index + 1]: "start" };
  }, {});
  return { type: SET_GAME_TABLE, gametable };
}

export function setCell(gametable, counter) {
  return (dispatch, getState) => {
    const { greencell } = getState().game;
    const keys = Object.keys(gametable);
    const filteredTable = keys.filter((it) => gametable[it] === "start");
    const yellow = keys.filter((it) => gametable[it] === "yellow")[0];
    const green = keys.filter((it) => gametable[it] === "green");
    const red = keys.filter((it) => gametable[it] === "red");

    if (green.length + red.length === keys.length - 1 && !(keys.length % 2)) {
      if (yellow !== greencell && red.length === keys.length / 2) {
        return dispatch({
          type: SET_CELL,
          gametable: {
            ...gametable,
            [yellow]: "red",
          },
          winner: "комп победил!",
        });
      }
      if (yellow === greencell && green.length === keys.length / 2) {
        return dispatch({
          type: SET_CELL,
          gametable: {
            ...gametable,
            [yellow]: "green",
          },
          winner: "вы победили, молодцом!",
        });
      }
      return dispatch({
        type: SET_CELL,
        gametable: {
          ...gametable,
          [yellow]: yellow === greencell ? "green" : "red",
        },
        winner: "ребята, это ничья!",
      });
    }
    if (red.length === Math.floor(keys.length / 2) && yellow !== greencell) {
      return dispatch({
        type: SET_CELL,
        gametable: {
          ...gametable,
          [yellow]: "red",
        },
        winner: "комп победил!",
      });
    }
    if (green.length === Math.floor(keys.length / 2) && yellow === greencell) {
      return dispatch({
        type: SET_CELL,
        gametable: {
          ...gametable,
          [yellow]: "green",
        },
        winner: "вы победили, молодцом!",
      });
    }
    if (yellow) {
      return dispatch({
        type: SET_CELL,
        gametable: {
          ...gametable,
          [filteredTable[Math.floor(Math.random() * filteredTable.length)]]:
            "yellow",
          [yellow]: yellow === greencell ? "green" : "red",
        },
        counter: counter + 1,
      });
    }
    return dispatch({
      type: SET_CELL,
      gametable: {
        ...gametable,
        [filteredTable[Math.floor(Math.random() * filteredTable.length)]]:
          "yellow",
      },
      counter: counter + 1,
    });
  };
}

export function cellClicked(it) {
  return { type: SET_GREEN_CELL, it };
}

export function levelDown(message) {
  return {
    type: SET_LEVEL,
    l_message: message === "hard" ? "normal" : "easy",
    timer: message === "hard" ? 800 : 1100,
  };
}

export function levelUp(message) {
  return {
    type: SET_LEVEL,
    l_message: message === "easy" ? "normal" : "hard",
    timer: message === "easy" ? 800 : 500,
  };
}
