export default class Observer {
  constructor(generator, subscriptionReference) {
    this._generator = generator;
    this._subscriptionReference = subscriptionReference;
  }

  next(value) {
    var iterationResult = this._generator.next(value);
    if(typeof iterationResult !== 'undefined' && iterationResult.done) {
      this._subscriptionReference.value.dispose();
    }
    return iterationResult;
  }

  throw(err) {
    this._subscriptionReference.value.dispose();
    var _throw = this._generator.throw;
    if(_throw) {
      return _throw.call(this, err);
    }
  }

  return(value) {
    this._subscriptionReference.value.dispose();
    var ret = this._generator.ret;
    if(ret) {
      return ret.call(this, value);
    }
  }
}