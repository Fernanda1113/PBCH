import FirebaseContainer from  '../../containers/FirebaseContainer.js'
import { getSystemConfigurationParameters } from '../../../config/getSystemConfigurationParameters.js'

const parameters = getSystemConfigurationParameters()

class ProductDAOFirebase extends FirebaseContainer {
    constructor() {
        super(parameters.PATH_FIREBASE_ADMIN_SDK_JSON, 'productos')
    }
}

export default ProductDAOFirebase