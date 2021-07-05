// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";

const PostList = (props) => {
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);

    console.log(post_list);

    React.useEffect(() => {
        if (post_list.length === 0) {
            dispatch(postActions.getPostFB());
        }
    }, []);

    return (
        <React.Fragment>
            {/* post_list의 개수만큼 불러오기위해서 map */}
            {/* map을 해줄거면 key를 꼭 써줘야되지 */}
            {post_list.map((post, index) => {
                return <Post key={post.id} {...post} />
            })}
        </React.Fragment>
    )
}

export default PostList;

