---
title: Meu Segundo Post sobre MEAN
template: posts.hbt
date: 2014-03-01
description: Use MEAN facilmente. Para o RSS Feed.
author: Palmer. Para o RSS Feed.
tags: mongodb, express, angular, nodejs, javascript
---

## Aprenda a usar uma solução fullstack de javascript

### Porque usar MEAN ?

- Porque você usa um única linguagem.
- Divertido.
- É em javascript.
- Eu curti.

```custom

// server.js

...

app.configure(function() {

  // set up our express application
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());

  app.set('view engine', 'ejs');

  // required for passport
  app.use(express.session({ secret: 'mysecret' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

});

...

```