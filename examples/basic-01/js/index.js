import $ from 'jquery';
import {Component, componentFactory, renderRootDomElement} from "coyote2";

const COLORS = ['green', 'red'];
const MyPage = componentFactory(class MyPage extends Component {
    state = {
        count: 0,
    }

    btnClickHandler = () => {
        this.setState(state => {
            state.count +=1 ;
        });
    }

    render() {
        return div(
            p(
                {
                    style: `color:${COLORS[this.state.count % 2]};`,
                }, 
                `Clicked ${this.state.count} times`
            ),
            button({onclick: this.btnClickHandler}, ">> click me <<")
        );
    }
});


$(function() {
    renderRootDomElement(
        document.getElementById("appView"),
        MyPage()
    )
});
