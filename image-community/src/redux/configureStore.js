import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history"; // 히스토리 가져온거
import { connectRouter } from "connected-react-router";

import User from "./modules/user"; // user.js에 있는 리듀서 가지고 온거

// history를  리덕스에서 쓰기위한 설정
// history 객체 만들어주기
export const history = createBrowserHistory();

const rootReducer = combineReducers({
    user: User, // 우리가 만든 user.js 파일 넣어준거
    router: connectRouter(history), // 우리가 위에서 만든 history와 Router가 연결이 되는 것
});

const middlewares = [thunk.withExtraArgument({ history: history })]; // 여기 배열에 내가 사용할 미들웨어 하나씩 들어갈 수 있다. 
// withExtraArgument는 thunk안에 내장되어있는 함수 -> 여기서는 history를 넘겨주기위해서 사용

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

// redux devTools 설정 (브라우저환경일 경우에만 적용해라)
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;

// 미들웨어 묶어주기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어 만들기 - 미들웨어랑 rootReducer 엮어주기
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
