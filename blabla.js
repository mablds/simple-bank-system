function generateAccount() {
    let num = ''
    while (num.length < 4) {
        num += Math.floor(Math.random() * 10)
    }
    return num
}
console.log(generateAccount())