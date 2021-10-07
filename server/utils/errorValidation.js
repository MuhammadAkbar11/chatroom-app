const errorValidation = (errors = []) => {
  let errorObj = {};
  const newArrError = [...errors];

  /*
  "name": "ValidatorError",
        "message": "masukan nama anda",
        "properties": {
          "message": "masukan nama anda",
          "type": "required",
          "path": "name",
          "value": ""
        },
        "kind": "required",
        "path": "name",
        "value": ""
  */

  for (var i = 0, len = newArrError.length; i < len; i++) {
    const messageArr = errors
      .filter(item => item.param == newArrError[i]["param"])
      .map(el => el.msg);
    errorObj[newArrError[i]["param"]] = {
      name: "ValidatorError",
      message: messageArr[0],
      properties: {
        message: messageArr[0],
        path: newArrError[i]["param"],
        value: newArrError[i]["value"],
      },
    };
  }

  for (var key in errorObj) newArrError.push(errorObj[key]);

  return errorObj;
};

export default errorValidation;
