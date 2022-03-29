import MemoryContainer from  '../../containers/MemoryContainer.js'

class ProductDAOMemory extends MemoryContainer {
    constructor() {
        super(0, [])
    }
}

export default ProductDAOMemory