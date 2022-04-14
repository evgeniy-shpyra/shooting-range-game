

const game = {

    enemies: [],

    generateEnemies() {
        this.enemies.push({
            id: 1,
            x: this._getRandomNum(100, 1000),
            y: this._getRandomNum(100, 400)
        })
    },

    inclusionCheck(x, y) {
        //x={400} y={200}
        
        if (x >= 100 && x <= 100 + 100 && y >= 100 && y <= 100+ 150) return true
        else return false

    },

    _getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

}

export default game