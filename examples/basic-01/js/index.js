import $ from 'jquery';
import {Component, componentFactory, renderRootDomElement} from "coyote2";

const MyPage = componentFactory(class extends Component {
    state = {
        count: 0,
    }

    render() {
        return div(
            p({style: 'color:red;'}, `Clicked ${this.state.count} times`),
            button({
                onclick: () => {
                    this.setState(state => {
                        state.count +=1 ;
                    });
                },
            }, ">> click me <<")
        );
    }
});


$(function() {
    renderRootDomElement(
        document.getElementById("appView"),
        MyPage({})
    )
});
