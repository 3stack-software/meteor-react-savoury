ReactSavoury = React.createClass({
  propTypes: {
    onPhaseChange: React.PropTypes.func.isRequired,
    element: React.PropTypes.any,
    sending: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    complete: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ]),
    autoclear: React.PropTypes.bool,
    autoclearTimer: React.PropTypes.number
  },
  getDefaultProps(){
    return {
      sending: 'Saving...',
      complete: 'Saved!',
      error: 'There was an error processing your request',
      autoclear: true,
      autoclearTimer: 3000
    }
  },
  timeout: null,
  autoclear(){
    if (this.props.autoclear) {
      this.timeout = setTimeout(this.phaseChange, this.props.autoclearTimer);
    }
  },
  clearTimeout(){
    if (this.timeout != null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  },
  componentWillUnmount(){
    this.clearTimeout();
  },
  phaseChange(phase, extra){
    if (phase == null){
      phase = null;
    }
    this.clearTimeout();
    this.props.onPhaseChange(phase, this.message(phase, extra));
  },
  wrapMethod (methodName, args, options, callback){
    if (_.isFunction(options)) {
      callback = options;
      options = {};
    }
    this.phaseChange('sending');
    Meteor.apply(methodName, args, options, function (err, result) {
      if (err != null) {
        console && console.error && console.error(err);
        this.phaseChange('error', err);
      } else {
        this.phaseChange('complete', result);
        this.autoclear();
      }
      if (callback != null) {
        callback(err, result);
      }
    }.bind(this));
  },

  message(phase, extra){
    if (phase == null){
      return null;
    }
    var msg = this.props[phase];
    if (msg == null) {
      return null;
    }
    if (_.isFunction(msg)) {
      return msg(extra);
    } else {
      return msg;
    }
  },

  render(){
    return <div>{this.props.children}</div>;
  }

});

ReactSavouryAlert = React.createClass({
  propTypes: {
    phase: React.PropTypes.string,
    message: React.PropTypes.string
  },
  render(){
    if (this.props.phase == null || this.props.message == null){
      return null;
    }
    if (this.props.phase == 'complete') {
      return <div className="alert alert-success">
        <i className="fa fa-check"></i> {this.props.message}
      </div>
    }
    if (this.props.phase === 'sending') {
      return <div className="alert alert-info">
        <i className="fa fa-refresh fa-spin"></i> {this.props.message}
      </div>
    }
    if (this.props.phase === 'error') {
      return <div className="alert alert-warning">
        <i className="fa fa-exclamation-triangle"></i> {this.props.message}
      </div>;
    }
  }
});
