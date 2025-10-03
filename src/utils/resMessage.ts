function successMessage<T extends any>(data: T, success = true, err?: any) {
  return {
    message: 'ok',
    success,
    code: 0,
    data,
    err
  }
}

function errMessage<T extends any>(data: T, err?: any) {
  return {
    message: 'ok',
    success: false,
    code: -1,
    data,
    err
  }
}

export {
  successMessage,
  errMessage
}