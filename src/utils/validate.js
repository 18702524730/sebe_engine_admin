const telephoneRule = (rule, value, callback) => {
    let exp = /^1\d{10}$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的手机号'))
    }else {
      callback()
    }
  }
export {
    telephoneRule
}