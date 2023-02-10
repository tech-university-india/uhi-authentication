const axios = require('axios');
const abdm = require('../util/abdm');


const loginService = async ({ healthId, yearOfBirth }) => {
  const { token } = await abdm.getJWTToken();

  const { data } = await axios.post('https://healthidsbx.abdm.gov.in/api/v2/search/searchHealthIdToLogin', {
    healthId,
    yearOfBirth
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return data;
};

const generateOtp = async ({ healthId, authMethod }) => {
  const { token } = await abdm.getJWTToken();

  const { data } = await axios.post('https://healthidsbx.abdm.gov.in/api/v2/auth/init', {
    healthid: healthId,
    authMethod
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  // console.log(data.details);

  return data;
};

module.exports = {
  loginService,
  generateOtp
};
