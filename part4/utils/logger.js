
const info = (...arg) => {
    console.log(...arg)
}

const error = (...arg) => {
    console.error(...arg)
}

module.exports = {
    info,
    error
}