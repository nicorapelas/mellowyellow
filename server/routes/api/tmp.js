const axios = require("axios");

const myData = {
  "merchant_id": "10000100",
  "merchant_key": "46f0cd694581a",
  ...
};
const passPhrase = '';

const dataToString = (dataArray) => {
  // Convert your data array to a string
  let pfParamString = "";
  for (let key in dataArray) {
    if(dataArray.hasOwnProperty(key)){pfParamString +=`${key}=${encodeURIComponent(dataArray[key].trim()).replace(/%20/g, "+")}&`;}
  }
  // Remove last ampersand
  return pfParamString.slice(0, -1);
};

const generatePaymentIdentifier = async (pfParamString) => {
  const result = await axios.post(`https://www.payfast.co.za/onsite/process`, pfParamString)
      .then((res) => {
        return res.data.uuid || null;
      })
      .catch((error) => {
        console.error(error)
      });
  console.log("res.data", result);
  return result;
};

// Generate signature (see Custom Integration -> Step 2)
myData["signature"] = generateSignature(myData, passPhrase);

// Convert the data array to a string
const pfParamString = dataToString(myData);

// Generate payment identifier
const identifier = await generatePaymentIdentifier(pfParamString);