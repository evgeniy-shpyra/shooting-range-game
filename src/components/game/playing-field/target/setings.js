export const getRandomTime = (level) => {
    if (level === 1)
        return getRandomNum(23, 25)
    else if (level === 2) {
        return getRandomNum(16, 20)
    }
    return getRandomNum(13, 18)
}

const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}