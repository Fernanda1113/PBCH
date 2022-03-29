import fs from 'fs'

function getSystemConfigurationParameters() {

    // se definen parametros con valores por defecto
    const parameters = {
        ADMIN_USER: true,                      //valores posibles: true o false
        PRODUCT_PERSISTENCE_SUPPORT: 'MONGODB',    //valores posibles: 'FILE' o 'FIREBASE' o 'MONGODB' o 'MEMORY'
        CART_PERSISTENCE_SUPPORT: 'MONGODB',       //valores posibles: 'FILE' o 'FIREBASE' o 'MONGODB' o 'MEMORY'
        PATH_FIREBASE_ADMIN_SDK_JSON: './config/firebase/ecommerce-a5792-firebase-adminsdk-p60x6-0a1836ea74.json',       //ejemplo: './config/firebase/ecommerce-a5793-firebase-adminsdk-p60x6-0a1836ea74.json'
        CONNECTION_STRING_MONGODB: 'mongodb://127.0.0.1:27017/ecommerce'           //ejemplo: 'mongodb://localhost/NOMBRE_DB'
    }

    const parameterBooleanKeys = [ 'ADMIN_USER' ]
    const parameterBooleanValues = [ 'true', 'false' ]

    const parameterPersistenceKeys =  [ 'PRODUCT_PERSISTENCE_SUPPORT', 'CART_PERSISTENCE_SUPPORT' ]
    const parameterPersistenceValues = ['FILE', 'FIREBASE', 'MONGODB', 'MEMORY' ]

    try {
        const cfgData = fs.readFileSync('./config/cfg.properties', 'utf-8')
        const cfgLines = cfgData.split('\r\n')

        for (let i = 0; i < cfgLines.length; i++) {

            if ((cfgLines[i].length > 0) && (cfgLines[i][0] != '#')) {
                const parameterLine = cfgLines[i].split('=')

                if( parameterLine.length >= 2 ) {
                    const parameterKey = parameterLine[0]
                    //const parameterValue = parameterLine[1] -> No contempla que el value contenga un =
                    const parameterValue = parameterLine.slice(1,parameterLine.length).join('=')

                    if ((Object.keys(parameters).includes(parameterKey)) && (parameterValue.length > 0)) {
                        if (parameterBooleanKeys.includes(parameterKey)) {
                            if (parameterBooleanValues.includes(parameterValue)) {
                                parameters[parameterKey] = (parameterValue === 'true')
                            }
                        }
                        else if (parameterPersistenceKeys.includes(parameterKey)) {
                            if (parameterPersistenceValues.includes(parameterValue)) {
                                parameters[parameterKey] = parameterValue
                            }
                        }
                        else {
                            parameters[parameterKey] = parameterValue
                        }
                    }
                }
            }
        }

    } catch (error) {
        throw new Error(`Error al leer archivo de configuracion: ${error.message}`)
    }

    return parameters
}

export { getSystemConfigurationParameters }