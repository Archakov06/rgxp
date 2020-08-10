import express from 'express';
import path from 'path';
import validator from 'validator';
import util from 'util';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import config from './config';

const app = express();
const db = config.db;

app.set('config', config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, '..')));
app.use(bodyParser.json());

app.use(expressValidator({

  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
          root = namespace.shift(),
          formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param : formParam,
      msg   : msg,
      value : value
    }

  }

}));

app.get('/', function(req, res) {
  return res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});

app.get('/patterns/:tag?/:limit?/:offset?', function(req, res) {

  let limit = req.params.limit ? parseInt(req.params.limit) : 50;
  let offset = req.params.offset ? parseInt(req.params.offset) : 0;
  let tag = req.params.tag ? `%${req.params.tag}%` : '%';

  db('patterns')
    .where('approved', '=', 1)
    .andWhere('tags', 'like', tag)
    .limit(limit)
    .offset(offset)
    .orderBy('rating', 'desc')
    .then((rows) => res.send(resp(rows, 'GET_PATTERNS')))
    .catch((err) => res.send(resp(err, 'GET_PATTERNS_FAIL')));

});

app.get('/rating/:id/:rating', (req, res) => {

  let id = req.params.id;
  let rating = req.params.rating;
  var query = db('patterns').where('id', '=', id);

  query.select('rating').then((rows) => {

    var count = rows[0].rating;
    var result;

    if (rating == 'up') {
      count++;
      result = query.increment('rating', 1);
    } else {
      count--;
      result = query.decrement('rating', 1);
    }

    result
      .then(() => res.send(resp(count, 'SET_RATING')))
      .catch((err) => res.send(resp(err, 'SET_RATING_FAIL')));

  }).catch((err) => res.send(resp(err, 'SET_RATING_FAIL')));

});

app.post('/patterns/add', (req, res) => {

  req.checkBody({
    'title': {
      notEmpty: true,
      isLength: {
        options: [{ min: 3, max: 150 }],
        errorMessage: 'Must be between 3 and 40 chars long'
      },
      errorMessage: 'Invalid Title'
    },
    'pattern': {
      notEmpty: true,
      isLength: {
        options: [{ min: 3, max: 1500 }],
        errorMessage: 'Must be between 3 and 1500 chars long'
      },
      errorMessage: 'Invalid Pattern'
    },
    'placeholder': {
      notEmpty: true,
      isLength: {
        options: [{ min: 3, max: 200 }],
        errorMessage: 'Must be between 1 and 30 chars long'
      },
      errorMessage: 'Invalid Placeholder'
    },
    'description': {
      optional: true,
      isLength: {
        options: [{ min: 5, max: 400 }],
        errorMessage: 'Must be between 5 and 400 chars long'
      },
      errorMessage: 'Invalid Description'
    },
    'tags': {
      notEmpty: true,
      errorMessage: 'Invalid Tags'
    },
  });

  req.getValidationResult().then((result) => {

    if (!result.isEmpty()) return res.send(resp(result.array(), 'VALIDATOR_ERROR'));

    let title = req.body.title;
    let pattern = req.body.pattern;
    let placeholder = req.body.placeholder;
    let description = req.body.description ? req.body.description : '';
    let tags = req.body.tags ? req.body.tags.join(',') : [];
    //let nickname = req.body.nickname ? req.body.nickname : '';
    //let url_type = req.body.url_type ? req.body.url_type : 0;

    db('patterns')
      .insert({
        "title": title,
        "pattern": pattern,
        "placeholder": placeholder,
        "description": description,
        "tags": tags,
        "rating": 0,
        "approved": 0,
      })
      .then((rows) => res.json(resp({}, 'PATTERN_ADDED')))
      .catch((err) => res.json(resp(err, 'ADD_PATTERN_ERROR')));

  });

});

function resp(payload, status = 'OK'){
  return {
    status: status,
    payload: payload
  }
}

app.listen(3001, () => {
  console.log(`App listening on port ${config.options.PORT}!`);
});
