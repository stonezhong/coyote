import $ from 'jquery';
import {Component, componentFactory, renderRootDomElement} from "./coyote";
import {DIV, HR, SPAN, BUTTON} from "./coyote";

const COLORS = ['green', 'red'];

const City = componentFactory(class City extends Component {
    state = {
        count: this.props.initValue,
        initName: this.props.name,
    }


    onAdd   = () => {
        this.setState(state => {state.count +=1;});
    }
    onMinus = () => {
        this.setState(state => {state.count -=1;});
    }

    render() {
        return (
            DIV(
                SPAN({style:"width: 200px; display:inline-block;"}, this.props.name),
                SPAN({style:"width:  40px; display:inline-block;"}, `👍 ${this.state.count}`),
                BUTTON({onclick:this.onAdd}, "Add"),
                BUTTON({onclick:this.onMinus}, "Minus")
            )
        );
    }
});

const MyPage = componentFactory(class MyPage extends Component {
    state = {
        flip: false,
    }

    toggleFlip = () => {
        this.setState(state => {
            state.flip = !state.flip;
        });
    }

    render() {
        if (this.state.flip) {
            return DIV(
                SPAN(`flip: ${this.state.flip}`),
                BUTTON({onclick:this.toggleFlip}, "Toggle Flip"),
                HR(),
                City({key: "SF",  initValue: 1, name: "San Francisco!"}),
                City({key: "SEA", initValue: 2, name: "Seattle!"})
            );   
        } else {
            return DIV(
                SPAN(`flip: ${this.state.flip}`),
                BUTTON({onclick:this.toggleFlip}, "Toggle Flip"),
                HR(),
                City({key: "SEA", initValue: 2, name: "Seattle!"}),
                City({key: "SF",  initValue: 1, name: "San Francisco!"})
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
