import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import sagaMiddleware from "./enhancers/middlewares";
import reducers from "./reducers";
import rootSaga from "./sagas";

const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
});
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
