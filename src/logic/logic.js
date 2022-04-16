

const game = {

    //--------------------------
    initializationData(width, height, margin, count, freeHeight) {
        const enemies = []
        const positions = this._generatePosition(width, height, margin, count, freeHeight)

        for (let i = 0; i < 5; i++) {
            enemies[i] = { id: i, x: positions[i].x, y: positions[i].y, strength: this._getRandomNum(1, 3), isActive: true }
        }
        return enemies
    },
    _generatePosition(width, height, margin, count, freeHeight) {
        const positions = []
        const centerX = window.innerWidth / 2 - (width / 2)
        const centerY = window.innerHeight / 2 - (height / 2) - freeHeight

        const dir = width + margin

        const firstX = centerX - (dir * Math.floor(count / 2))

        for (let i = 0; i < count; i++) {
            positions[i] = { x: firstX + (dir * i), y: centerY }
        }
        return positions
    },
    //--------------------------


    inclusionCheck(targets, { x, y }, width, height, freeHeight) {

        let killedTargets = this._killedTargets(targets)

        let arr = targets.map(t => {
            if (x >= t.x && x <= t.x + width && y >= t.y + freeHeight && y <= t.y + freeHeight + height) {
                if (t.strength === 1) {
                    killedTargets++
                    return { ...t, isActive: false }
                }
                else return { ...t, strength: --t.strength }
            }
            else {
                if (killedTargets > this._getRandomNum(1, 3) && !t.isActive && (killedTargets === 5 || Math.random() > 0.5)) {
                    killedTargets--
                    return { ...t, strength: this._getRandomNum(1, 3), isActive: true }
                }
            }
            return t
        })


        return arr
    },

    _killedTargets(targets) {
        let count = 0

        targets.map(t => {
            if (!t.isActive) {
                count++
            }
            return t
        })
        return count
    },

    // _rebirthEnemy = (enemies) => {
    //     return enemies.map(e => {
    //         return e
    //     })
    // }


    _getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

}

export default game