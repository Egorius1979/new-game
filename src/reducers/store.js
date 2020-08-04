import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game";

export default configureStore({
  reducer: {
    game: gameReducer,
  },
});
