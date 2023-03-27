const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.json({ send: 'The api is working' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
