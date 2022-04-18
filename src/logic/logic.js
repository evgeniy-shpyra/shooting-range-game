

const game = {
    target: {
        width: null,
        height: null,
        freeHeight: null
    },
    sight: {
        radius: null
    },
    //--------------------------
    initializationData(width, height, margin, count, freeHeight, sightRadius) {

        this.target.width = width
        this.target.height = height
        this.target.freeHeight = freeHeight
        this.sight.radius = sightRadius

        const enemies = []
        const positions = this._generatePosition(margin, count)

        for (let i = 0; i < 5; i++) {
            enemies[i] = { id: i, x: positions[i].x, y: positions[i].y, strength: this._getRandomNum(1, 3), isActive: true }
        }
        return enemies
    },

    _generatePosition(margin, count) {
        const positions = []
        const centerX = window.innerWidth / 2 - (this.target.width / 2)
        const centerY = window.innerHeight / 2 - (this.target.height / 2) - this.target.freeHeight

        const dir = this.target.width + margin

        const firstX = centerX - (dir * Math.floor(count / 2))

        for (let i = 0; i < count; i++) {
            positions[i] = { x: firstX + (dir * i), y: centerY }
        }
        return positions
    },
    //--------------------------


    inclusionCheck(targets, { x, y }) {
        let killedTargets = this._killedTargets(targets)
        x += this.sight.radius
        y += this.sight.radius
        let arr = targets.map(t => {
            if (x >= t.x && x <= t.x + this.target.width && y >= t.y + this.target.freeHeight
                && y <= t.y + this.target.freeHeight + this.target.height) {
                if (t.strength === 1) {
                    killedTargets++
                    return { ...t, strength: 0, isActive: false }
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