import React from "react";
import { render } from "react-dom";

import { Route, Link } from "react-router-dom";
import { withRouter } from "react-router";

import Home from './Home';
import Dog from './Dog';
import Cat from './Cat'; 


class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {};
    }

    componentDidMount(){
        console.log(this.props);
    }


    render(){
        return(<div className="App">
             <div>  {/* 여기에 네비게이션해주는 친구들을 모은다 */}
                <Link to="/">Home으로 가기</Link>
                <Link to="/cat/nabi">Cat으로 가기</Link>
                <Link to="/dog">Dog으로 가기</Link>
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/cat/:cat_name" component={Cat} />
            <Route path="/dog" component={Dog} />

            <button onClick={()=>{
                this.props.history.push('/cat/nabi');
            }}>/cat으로 가기</button>
            <button onClick={()=>{
                this.props.history.goBack(); // goBack()은 history가 제공해주는 함수
            }}>뒤로 가기</button>

        </div>);
    }
}

export default withRouter(App);