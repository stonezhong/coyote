# Introduction

Coyote is a react-like javascript UI library. It is very lightweight. Here is a brief comparison:

# Compare coyote against react
<table>
<tr>
<td></td>
<td>coyote</td>
<td>React</td>
</tr>

<tr>
<td>Overall</td>
<td>

* Pure javascript code, no jsx!
* Very lightweight, only less than 300 lines of code!
</td>
<td>

* Mixture of jsx and javascript
* Lots of code. see [github](https://github.com/facebook/react)
</td>
</tr>

<tr>
<td>
create element with attributes</td>
<td>

```javascript
MyComponent({x=1, y=2}, 
    child1, 
    child2
)
```
</td>
<td>

```javascript
<MyComponent x={1} y={2}>
    child1
    child2
</MyComponent>
```
</td>
</tr>

<tr>
<td>create element no attributes</td>
<td>

```javascript
MyComponent(
    child1, 
    child2
)
```
</td>
<td>

```javascript
<MyComponent>
    child1
    child2
</MyComponent>
```
</td>
</tr>

<tr>
<td>define component</td>
<td>

```javascript
const MyPage = componentFactory(class extends Component {
    state = {
        count: 0,
    }

    render() {
        return div(,
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
```
</td>
<td>

```javascript
class MyPage extends React.Component {
    state = {
        count: 0,
    }

    render() {
        return <div>
            <p style={'color:red;'}>`Clicked ${this.state.count} times`</p>,
            <button>
                onclick = {() => {
                    this.setState({count: this.state.count+1})
                }}
            </button>
                {">> click me <<"}
            </button>
        </div>;
    }
}
```
</td>
</tr>

<tr>
<td>state management</td>
<td>

```javascript
// use immer producer so you can modify state, while state property is still immutable
this.setState(state => {state.count += 1});
```
</td>
<td>

```javascript
// Create a new state and pass it to setState
this.setState({count:state.count+1});
```
</td>
</tr>

</table>

* [see also](https://betterprogramming.pub/react-18-has-been-released-implement-mini-react-in-400-lines-of-code-837559761758)
