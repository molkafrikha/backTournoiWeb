exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.organizerBoard = (req, res) => {
  res.status(200).send("organizer Content.");
};

exports.agentBoard = (req, res) => {
  res.status(200).send("agent Content.");
};