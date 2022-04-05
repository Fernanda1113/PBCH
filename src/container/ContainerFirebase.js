let admin = require('firebase-admin')
const config = require('../configDB')
const { v4:uuid4 } = require("uuid")


admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
});
const db = admin.firestore();
  
class ContainerFirebase {

    constructor(name) {
        this.coleccion = db.collection(name)
    }

    async save(nuevoElem) {
        try{
            let doc = this.coleccion.doc(`${uuid4()}`)
            await doc.set(nuevoElem);
            return { ...nuevoElem, id: doc.id }
        }
        catch(error){
            throw Error("Error en el save");
        }

    }


    async getById(num) {
        try{
            let doc = await this.coleccion.doc(num);
            let item = (await doc.get()).data()
            //Si existe el item se envia, sino retorna falso
            if(item){
                item.id = num
                return item
            }else{
                return false;
            }
        }
        catch(error){
            throw Error("Error en getById");
        }

    }

    async getAll() {
         try{
            const resultado = []
            const data = await this.coleccion.get();
            data.forEach(doc => {
                resultado.push({ id: doc.id, ...doc.data() })
            })
            return resultado
        }
        catch(error){
            console.log(error)
        };

    }

    async deleteById(num) {
        try{
            const item = await this.coleccion.doc(num).delete();
            return item
        }
        catch(error){
            throw Error("Error en el deleteById");
        }

    }

    async deleteAll() {
        try{
            const docs = await this.getAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.deleteById(id))
            return {msg: "Todos los usuarios borrados"}
        }
        catch(error){
            throw Error("Error en el deleteAll()");
        }
    }

    async update(nuevoElem) {
        try {
            let arrayChat = nuevoElem.arrayChat
            const actualizado = await this.coleccion.doc(nuevoElem.id).set({arrayChat});
            return actualizado
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }
    
    
}

module.exports = ContainerFirebase;