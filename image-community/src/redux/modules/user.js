import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie';

// Actions
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const GET_USER = 'GET_USER';

// ActionCreator
// createAction 써준다(더편하게 액션생성함수 쓸 수 있는 방법)
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));

// initialState
const initialState = {
    user: null, // 처음에는 로그인 안했을테니까 null상태
    is_login: false, // 웹사이트 뜨자마자 아직은 아무것도 안되어있을테니까
};

// middleware actions
const loginAction = (user) => {
    return function (dispatch, getState, {history}){
        console.log(history);
        dispatch(logIn(user)); // 이 dispatch에 로그인 액션 들어오면 실제로도 login해줘야하니까
        history.push('/');
    }
}

// Reducer
export default handleActions({
    [LOG_IN]: (state, action) => produce(state, (draft) => {
        setCookie('is_login', 'success');
        draft.user = action.payload.user;
        draft.is_login = true;
    }),

    [LOG_OUT]: (state, action) => produce(state, (draft) => { 
        deleteCookie('is_login');
        draft.user = null;
        draft.is_login =  false;
    }),
    [GET_USER]: (state, action) => produce(state, (draft) => { }),
}, initialState);

// ActionCreator export
// 액션생성함수 만든거 export 해줘야 컴포넌트에서 가져다가 쓰니까
// 위에서 만든거 한번에 묶어서 내보내는 것
const actionCreators = {
    logIn, logOut, getUser, loginAction
};

export { actionCreators };
