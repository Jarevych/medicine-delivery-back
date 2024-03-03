const handleJoiError = (error, res) => {
    res.status(400).json({ message: error.details[0].message });
  };
  
  module.exports = handleJoiError;