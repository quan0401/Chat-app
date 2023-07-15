import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import chatRoomReducer from "./reducers/chatRoomReducer";

const reducers = combineReducers({
  user: userReducer,
  chatRoom: chatRoomReducer,
});

const middleware = [thunk];
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
