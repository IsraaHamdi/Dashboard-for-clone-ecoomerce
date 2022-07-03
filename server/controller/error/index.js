const clientError = (req, res) => {
  res.status(404).json({ status: 404, message: 'Page Not Found' });
};

// eslint-disable-next-line no-unused-vars
const serverError = (err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.status(err.status).json({ status: err.status, message: err.message });
  } else {
    res.status(500).json({ status: 500, message: 'Server Error' });
  }
};

module.exports = { clientError, serverError };
