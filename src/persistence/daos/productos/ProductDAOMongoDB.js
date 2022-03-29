import MongoDBContainer from  '../../containers/MongoDBContainer.js'
import { getSystemConfigurationParameters } from '../../../config/getSystemConfigurationParameters.js'

const parameters = getSystemConfigurationParameters()
const schemaSpecification = {
    id: {type: Number, requeri: true, unique: true},
    nombre: {type: String},
    descripcion: {type: String},
    codigo: {type: String, requeri: true, unique: true},
    foto: {type: String},
    precio: {type: String},
    stock: {type: Number}
}

class ProductDAOMongoDB extends MongoDBContainer {
    constructor() {
        super(parameters.CONNECTION_STRING_MONGODB, 'productos', schemaSpecification)
    }
}

export default ProductDAOMongoDB