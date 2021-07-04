import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import { firestore } from '../../shared/firebase';

// Action
const SET_POST = "SET_POST" // 목록을 넣어주기
const ADD_POST = "ADD_POST" // 포스트 추가

// ActionCreator
// 지금은 createAction
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));

// initialState
const initialState = {
    list: [], // 리듀서가 사용할 initialState
};

// middleware
// firebase에서 포스트 가지고오기
const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection('post');

        postDB.get().then((docs) => {
            let post_list = [];
            docs.forEach((doc) => {
                console.log(doc.id, doc.data());

                let _post = {
                    id: doc.id,
                    ...doc.data()
                };

                let post = {
                    id: doc.id,
                    user_info: {
                        user_name: _post.user_name,
                        user_profile: _post.user_profile,
                        user_id: _post.user_id,
                    },
                    image_url: _post.image_url,
                    contents: _post.contents,
                    comment_cnt: _post.comment_cnt,
                    insert_dt: _post.insert_dt,
                };

                post_list.push(post);
            });
            console.log(post_list); // 배열 안에 딕셔너리 잘 들어갔는지 확인

            dispatch(setPost(post_list));
        })
    }
}


const initialPost = { // 게시글 하나에 뭐뭐들어가있는지 보기위해서
    id: 0, // id 추가
    user_info: {
        user_name: "mean0",
        user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    },
    image_url: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    contents: "고양이네요!",
    comment_cnt: 10,
    insert_dt: "2021-02-27 10:00:00",
};

// Reducer
// 불변성 관리를 위해 immer 사용
export default handleActions({

    [SET_POST]: (state, action) => produce(state, (draft) => {
        // 갈아 끼워줄거야
        draft.list = action.payload.post_list;
    }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {

    }),
}, initialState
);

const actionCreators = {
    setPost,
    addPost,
    getPostFB,
}

export { actionCreators };