import $ from 'jquery';
import {Component, componentFactory, renderRootDomElement} from "coyote2";

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
        if (this.state.count %2 ==0 ) {
            return div(
                p(
                    {
                        style: 'color:red;',
                    }, 
                    `Clicked ${this.state.count} times`
                ),
                p("even!"),
                button({onclick: this.btnClickHandler}, ">> click me <<")
            );
        } else {
            return div(
                p(
                    `Clicked ${this.state.count} times`
                ),
                button({onclick: this.btnClickHandler}, ">> click me <<")
            );

        }
    }
});


$(function() {
    renderRootDomElement(
        document.getElementById("appView"),
        MyPage()
    )
});
