import React from 'react';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { useSelector, useDispatch } from 'react-redux';

import { deleteBucketFB, updateBucketFB } from './redux/modules/bucket';

const Detail = (props) => {
    const dispatch = useDispatch();

    // 스토어에서 상태값 가져오기
    const bucket_list = useSelector((state) => state.bucket.list);

    console.log(bucket_list); // 완료하기 버튼 누르면 completed: true로 잘 바뀌는거 확인이되었다. 
    // url 파라미터에서 인덱스 가져오기
    let bucket_index = parseInt(props.match.params.index);

    return (
        <div>
            <h1>{bucket_list[bucket_index].text}</h1>
            <ButtonGroup>
                
                <Button 
                style={{color: "blue"}}
                onClick={() => {
                    dispatch(deleteBucketFB(bucket_index)); // dispatch가 호출되면 리듀서함수를 실행시켜서 새로운 상태 만들어준다. 
                    props.history.goBack();
                }}> 삭제하기
                </Button>

                <Button onClick={() => {
                    dispatch(updateBucketFB(bucket_index));
                    props.history.goBack();
                }}> 완료하기
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Detail;