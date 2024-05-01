const conTwoDigitString = (val) => {
    // console.log('val', val)
    let n = parseInt(val)
    let st = ""
    if (n < 10) {
        st = "0" + n.toString()
    } else {
        st = n.toString()
    }
    return st
}
module.exports = { conTwoDigitString }