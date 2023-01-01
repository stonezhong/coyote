# Introduction

Coyote is a react-like javascript UI library. It is very lightweight. Here is a brief comparison. A real example is at [here](https://github.com/stonezhong/coyote/tree/main/examples/basic-01). You can see a live demo at [codesandbox](https://codesandbox.io/s/autumn-darkness-qbx0zh?file=/src/index.js).

# Compare coyote against react
## Overall
### coyote
* Pure javascript code, no jsx!
* Very lightweight, only less than 300 lines of code! Please checkout [github](https://github.com/stonezhong/coyote)
* live demo at [codesandbox](https://codesandbox.io/s/autumn-darkness-qbx0zh?file=/src/index.js).
### reactjs
* Mixture of jsx and javascript
* Lots of code. Please checkout [github](https://github.com/facebook/react)

## create element with no attributes
### coyote
Example:
```javascript
MyComponent(
    child1, 
    child2
)
```
### reactjs
Example:
```javascript
<MyComponent>
    child1
    child2
</MyComponent>
```

## create element with attributes
### coyote
Example:
```javascript
MyComponent({x=1, y=2}, 
    child1, 
    child2
)
```
### reactjs
Example:
```javascript
<MyComponent x={1} y={2}>
    child1
    child2
</MyComponent>
```

## import component
### coyote
Example:
```javascript
import { H1, DIV, P, BUTTON } from "coyote2";
```
### reactjs
Not needed, jsx transpiler import those html tags implicitly.

## define component
### coyote
Example:
```javascript
const MyPage = componentFactory(class MyPage extends Component {
    state = {
        count: 0,
    }

    clickHandler = () => {
        this.setState(state => {state.count +=1;});
    }

    render() {
        return DIV(
            P({style: 'color:red;'}, `Clicked ${this.state.count} times`),
            BUTTON({onclick: this.clickHandler}, 
                ">> click me <<"
            )
        );
    }
});
```

### reactjs
Example:
```javascript
class MyPage extends React.Component {
    state = {
        count: 0,
    }

    clickHandler = () => {
        this.setState({count: this.state.count+1})
    }

    render() {
        return <div>
            <p style={'color:red;'}>`Clicked ${this.state.count} times`</p>,
            <button onclick = {this.clickHandler}>
                {">> click me <<"}
            </button>
        </div>;
    }
}
```

## state management
### coyote
Example:
```javascript
// use immer producer so you can modify state, while state property is still immutable
this.setState(state => {state.count += 1});
```

### reactjs
Example:
```javascript
// Create a new state and pass it to setState
this.setState({count:state.count+1});
```
