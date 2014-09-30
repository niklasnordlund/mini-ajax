# mini-ajax

Minimalistic Ajax lib –– 0.25 KB minified and gzipped!

## Usage

Simple GET and POST requests:

```
Ajax.get('example.html');
Ajax.post('example.html', {body: 'Hit me!'});
```

With success and error handlers:

```
Ajax.get('example.html', {
  onSuccess: mySuccessHandler,
  onFailure: myFailureHandler
});
```

Custom HTTP requests:

```
Ajax.request('example.html', {
  method: 'PUT'
  body: 'Put it down!'
});
```

## Compatibility
