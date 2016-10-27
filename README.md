react-savoury
--------------------------

Like `3stack:savoury` but with react.

Usage
================

```
meteor add 3stack:react-savoury
```

Example
================


```jsx
doSomeAction(){
  this.refs.savoury.wrapMethod('myMethod', ['param1', param2], function(err, result){
   / * do something with result */
  })
},
savouryPhaseChange(phase, message){
  this.setState({
    savouryPhase: phase,
    savouryMessage: message
  });
},
render(){
  return <ReactSavoury ref="savoury" onPhaseChange={this.savouryPhaseChange}>
    <ReactSavouryAlert
      phase={this.state.savouryPhase || null}
      message={this.state.savouryMessage || ""}
      />
  </ReactSavoury>
}
```
