import MemoryContainer from  '../../containers/MemoryContainer.js'

class CartDAOMemory extends MemoryContainer {
    constructor() {
        super(0, [])
    }
}

export default CartDAOMemory