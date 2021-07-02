import React from 'react';

import {Grid, Image, Text} from '../elements';

const Post = (props) => {
    return (
        <React.Fragment>
            {/* 이런게 필요하다 미리 작성해두고 시작 (이 정보들을 props로 받아올거라는 얘기) */}
            {/* user profile / user name / insert_dt / is_me btn (edit btn) */}
            {/* contents */}
            {/* image*/}
            {/* comment count*/}

            <Grid padding="16px">
                <Grid is_flex>
                    <Image shape='circle' src={props.src}/>
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.insert_dt}</Text>
                </Grid>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape='rectangle' src={props.src}/>
                </Grid >
                <Grid padding="16px">
                    <Text bold>댓글 {props.comment_count}개</Text>
                </Grid>
                <div>user profile / user name / insert_dt / is_me btn (edit btn)</div>
                <div>contents</div>
                <div>image</div>
                <div>comment count</div>
            </Grid>
        </React.Fragment>
    )
}

//  필요한 props를 미리 넘겨놓는 방식 - props가 안넘어올 경우 오류를 대비
Post.defaultProps = {
    user_info: {
        user_name: 'jigum',
        user_profile: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80',
    },
    image_url: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80",
    contents: '댕댕이닷',
    comment_count: 10,
    insert_dt: '2021-02-27 10:00:00'
}

export default Post;