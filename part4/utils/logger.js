const info = (...arg) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...arg)
    }
}

const error = (...arg) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(...arg)
    }
}

module.exports = {
    info,
    error
}