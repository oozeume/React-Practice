import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Detail = (props) => {
    // 스토어에서 상태값 가져오기
    const bucket_list = useSelector((state)=>state.bucket.list);
    // url 파라미터에서 인덱스 가져오기
    let bucket_index = parseInt(props.match.params.index);

    return (
    <h1>{bucket_list[bucket_index]}</h1>
    );
};

export default Detail;