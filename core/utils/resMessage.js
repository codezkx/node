function successMessage(data) {
  return {
    message: 'ok',
    success: true,
    code: 0,
    data
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