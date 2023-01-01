import $ from 'jquery';
import {Component, componentFactory, renderRootDomElement} from "coyote2";
import {DIV, P, BUTTON} from "coyote2";

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
        return DIV(
            P(
                {
                    style: `color:${COLORS[this.state.count % 2]};`,
                }, 
                `Clicked ${this.state.count} times`
            ),
            BUTTON({onclick: this.btnClickHandler}, ">> click me <<")
        );
    }
});


$(function() {
    renderRootDomElement(
        document.getElementById("appView"),
        MyPage()
    )
});
