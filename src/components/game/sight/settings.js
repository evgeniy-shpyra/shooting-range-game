import weaponRevolver from '../../../images/weapon/revolver.png'
import weaponSVD from '../../../images/weapon/svd.png'
import weaponM4 from '../../../images/weapon/M4.png'
import revolverCartridges from '../../../images/weapon/cartridges/revolverCartridges.png'
import m4Cartridges from '../../../images/weapon/cartridges/m4Cartridges.png'
import SVDCartridges from '../../../images/weapon/cartridges/SVDCartridges.png'
import sightM4 from '../../../images/weapon/sights/sightM4.png'
import sightSVD from '../../../images/weapon/sights/sightSVD.png'
import sightRevolver from '../../../images/weapon/sights/sightRevolver.png'

//------------------------img------------------------
export const getWeaponImg = (weaponType) => {
    if (weaponType === 1)
        return weaponRevolver
    else if (weaponType === 2)
        return weaponSVD
    else if (weaponType === 3)
        return weaponM4
}
export const getCartridgesImg = (weaponType) => {
    if (weaponType === 1)
        return revolverCartridges
    else if (weaponType === 2)
        return SVDCartridges
    else if (weaponType === 3)
        return m4Cartridges
}

export const getSightImg = (weaponType) => {
    if (weaponType === 1)
        return sightRevolver
    else if (weaponType === 2)
        return sightSVD
    else if (weaponType === 3)
        return sightM4
}
//---------------------------------------------------

export const getQuantityCartridges = (weaponType) => {
    if (weaponType === 1)
        return 6
    else if (weaponType === 2)
        return 15
    else if (weaponType === 3)
        return 30
}

export const getWeaponType = (points) => {
    if (points <= 1000)
        return {type: 1, timeBetweenShots: 0.2}
    else if (points <= 3000)
        return {type: 2, timeBetweenShots: 0.3}
    return {type: 3, timeBetweenShots: 0.1}
}