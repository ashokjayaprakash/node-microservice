const config = require("./../config");
const axios = require("axios");
const axiosRetry = require("axios-retry");
axiosRetry(axios, { retries: parseInt(config.retries) });

exports.requestInterface = (options) => {
  return axios(options)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
};
