var Ajax = {
  _method: null,
  POST: 'POST',
  GET: 'GET',

  _bind: function (caller, context) {
    return function () {
      return caller.apply(context, [context]);
    };
  },

  _onStateChange: function () {
    if (this._request.readyState === 4) {
      if (this._request.status >= 200 && this._request.status < 300) {
        this.onSuccess(this._request.responseText);
      } else {
        this.onFailure(this._request.responseText);
      }
    }
  },

  _getRequest: function () {
    return Try.these(
      function () { return new ActiveXObject('Msxml2.XMLHTTP'); },
      function () { return new ActiveXObject('Microsoft.XMLHTTP'); },
      function () { return new XMLHttpRequest(); }
    ) || false;
  },

  post: function () {
    this._method = Ajax.POST;
    this.request.apply(this, arguments);
  },

  get: function () {
    this._method = Ajax.GET;
    this.request.apply(this, arguments);
  },

  request: function (url, options) {
    var request = this._request = this._getRequest();

    this._method = this._method || options.method || 'GET';
    this.onSuccess = options.onSuccess || function() {};
    this.onFailure = options.onFailure || function() {};

    if (request) {
      request.onreadystatechange = this._bind(this._onStateChange, this);
      request.open(this._method, url, true);
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      if (this._method === Ajax.POST) {
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      request.send(this._method === Ajax.POST && options.body || '');
    }
  }
};

var Try = {
  these: function () {
    var returnValue;
    for (var i = 0; i < arguments.length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda(); break;
      } catch (e) {}
    }
    return returnValue;
  }
};