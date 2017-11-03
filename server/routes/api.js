var express = require('express');
var jwt = require('jsonwebtoken');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.json({
    message: "api works"
  });
});

router.post('/', (req, res) => {
  const user = {
    id: 3
  };
  const token = jwt.sign({
    user
  }, 'my_secret_key');
  res.json({
    token: token
  })
});

router.get('/protected', ensureToken, (req, res) => {
  jwt.verify(req.token, 'my_secret_key', function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        text: "authorized",
        data: data
      });
    }
  })
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
module.exports = router;
