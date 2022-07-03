const app = require('./app');

app.listen(process.env.PORT || 5000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running http://localhost:5000');
});
