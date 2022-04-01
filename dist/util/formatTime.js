module.exports = (timestamp) => {
    let str = '';
    str += `${Math.floor(timestamp / 1000 % 60)}s, ${Math.floor(timestamp % 1000)}ms (${timestamp}ms)`
    return str
}