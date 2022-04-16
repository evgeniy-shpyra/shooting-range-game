

const game = {

    //--------------------------
    initializationData(width, height, margin, count) {
        const enemies = []
        const positions = this._generatePosition(width, height, margin, count)

        for (let i = 0; i < 5; i++) {
            enemies[i] = { id: i, x: positions[i].x, y: positions[i].y, strength: this._getRandomNum(1, 3), isActive: true }
        }

        return enemies
    },
    _generatePosition(width, height, margin, count) {
        const positions = []
        const centerX = window.innerWidth / 2 - (width / 2)
        const centerY = window.innerHeight / 2 - (height / 2)

        const dir = width + margin

        const firstX = centerX - (dir * Math.floor(count / 2))

        for (let i = 0; i < count; i++) {
            positions[i] = { x: firstX + (dir * i), y: centerY }
        }
        return positions
    },
    //--------------------------

    

    inclusionCheck(enemies, { x, y }, width, height) {

        return enemies.map(e => {
            debugger
            if(x >= e.x && x <= e.x + width && y >= e.y && y <= e.y + height){
                debugger
                return {...e, isActive: false}
            }
            return e 
        })
    },


    _getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

}

export default game