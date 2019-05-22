// uma promise que chama outra promise e na segunda promise se tiver erro dá erro

async function primeira(a, b) {
    try {
        const respostaDaSoma = await segunda(a + b)
        const respostaDaSoma = await segunda(a + b)
        const respostaDaSoma = await segunda(a + b)
        const respostaDaSoma = await segunda(a + b)
        return respostaDaSoma
    } catch (err) {
        return err
    }

}

async function segunda(x) {
    await timeout(5000);
    return Promise.reject('deu erro otário');
}

primeira(4, 5)
    .then((r) => console.log(r))

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}