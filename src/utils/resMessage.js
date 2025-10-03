function successMessage(data, success = true, err) {
  return {
    message: 'ok',
    success,
    code: 0,
    data,
    err
  }
}

function errMessage(data, err) {
  return {
    message: 'ok',
    success: false,
    code: -1,
    data,
    err
  }
}

module.exports = {
  successMessage,
  errMessage
}