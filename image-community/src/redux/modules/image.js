import { createActions, handleActions } from "redux-actions";
import produce from "immer";

import { storage } from "../../shared/firebase";
import createAction from "redux-actions/lib/createAction";

// action
const UPLOADING = "UPLOADING"; // 업로드 중인지 아닌지 알게해주는 액션
const UPLOAD_IMAGE = "UPLOAD_IMAGE"; // 실제로 파일을 업로드하는 액션
const SET_PREVIEW = "SET_PREVIEW" // 사진 업로드했을 때 미리보기 액션

// actionCreator
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));

// initialState
const initialState = {
    image_url: '',
    uploading: false,
    preview: null,
}

// firebase에 업로드할거야
function uploadImageFB(image) {
    return function (dispatch, getState, {history}) {
      
      dispatch(uploading(true));
      
      console.log(`images/${new Date().getTime()}_${image.name}`);
      const _upload = storage.ref(`images/${image.name}`).put(image);
  
      //   업로드!
      _upload.then((snapshot) => {
        console.log(snapshot);
  
        // 업로드한 파일의 다운로드 경로를 가져오자!
        snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
          dispatch(uploadImage(url));
        });
      }).catch(err => {
          dispatch(uploading(false));
      });
    };
  }

// reducer
export default handleActions({
    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
        // image_url 고쳐주기, 갈아끼우는것
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
    }),
    [UPLOADING]: (state, action) => produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
    }),
    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.preview = action.payload.preview;
    })

}, initialState);

const actionCreators = {
    uploadImage,
    uploadImageFB,
    setPreview,
}

export { actionCreators };