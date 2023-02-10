const { loginService, generateOtp } = require('../services/authService');

const login = async (req, res, next) => {
  try {
    const { healthId, yearOfBirth, authMethod } = req.body;

    const data = await loginService({ healthId, yearOfBirth });
    const { txnId } = await generateOtp({ healthId, authMethod });
    console.log(txnId);
    res.status(200).json(data);
  } catch (error) {
    console.log(error.response.data.details);
  }

};


module.exports = {
  login,

};


