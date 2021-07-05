import React from "react";
import { Button } from "../elements";
import { storage } from "./firebase";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/post";

const Upload = (props) => {
    const dispatch = useDispatch();
    const is_uploading = useSelector((state) => state.image.uploading);
    //ref 잡아주기
    const fileInput = React.useRef(); 

    const selectFile = (e) => {
        console.log(e); // onChange가된 이벤트
        console.log(e.target); // input
        console.log(e.target.files[0]);

        console.log(fileInput.current.files[0]);

        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file); // readAsDataURL은 내장함수, 괄호안에 어떤거 읽고싶은지 파일 넣어준다.

        // 읽기가 끝나면 발생하는 이벤트 핸들러예요! :)
        reader.onloadend = () => {
            // reader.result는 파일의 컨텐츠(내용물)입니다!
            console.log(reader.result);
            dispatch(imageActions.setPreview(reader.result));
        };
    }

    // 이미지를 가지고 우리의 firebase storage에 업로드를 해주는 친구
    // 이미지를 가져왔다는걸 PostWrite컴포넌트도 알아야한다. -> 이미지 리덕스로 빼준다.
    const uploadFB = () => {
        let image = fileInput.current.files[0];
        const _upload = storage.ref(`images/${image.name}`).put(image);

        _upload.then((snapshot) => {
            console.log(snapshot);

            // 링크 가져오기
            snapshot.ref.getDownloadURL().then((url) => {
                console.log(url);
            })
        })
    }

    return (
        <React.Fragment>
            <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading} />
            <Button _onClick={uploadFB}>업로드하기</Button>
        </React.Fragment>
    )
}

export default Upload;