export const signup = (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: true,
    message: "singup success",
    body: req.body,
  });
};

export const login = (req, res) => {
  res.status(201).json({
    status: true,
    message: "login success",
  });
};

export const logout = (req, res) => {
  res.status(201).json({
    status: true,
    message: "logout success",
  });
};
