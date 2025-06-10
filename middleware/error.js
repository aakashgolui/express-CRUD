const errorHandler = (err, req, res, next) => {
  const status = err.status;

  if (status) {
    return res.status(status).json({ msg: err.message });
  }

  res.status(500).json({ msg: err.message });
};

export default errorHandler;
