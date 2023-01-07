const healthController = (_req, res, _next) => {
  res.status(200).json({
    message: "Server health is ok!",
  });
};

module.exports = healthController;
