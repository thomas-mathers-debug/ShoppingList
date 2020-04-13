import Realm from 'realm'
export const FOOD_SCHEMA = "Food"

//Models
export const FoodSchema = {
    name: FOOD_SCHEMA,
    primaryKey: 'id',
    properties:{
        id:'int', //primary key
        text: { type: 'string', indexed: true}
    }
}

const databaseOptions = {
    path: 'shoppingListApp.realm',
    schema: [FoodSchema],
    schemaVersion: 1,
}

//function for inserting Food
export const insertNewFood = newFood => new Promise((resolve,reject) =>{
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            realm.create(FOOD_SCHEMA, newFood)
            resolve(newFood)
        })
    }).catch((error) => reject(error))
}
)

//function for deleting Food
export const deleteFood = foodId => new Promise((resolve,reject) =>{
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let deletingFood = realm.objectForPrimaryKey(FOOD_SCHEMA, foodId)
            realm.delete(deletingFood)
            resolve()
        })
    }).catch((error) => reject(error))
}
)

//function for showing all Food

export const queryFood = () => new Promise((resolve,reject) =>{
    Realm.open(databaseOptions)
    .then(realm => {
        realm.write(() => {
            let allFood = realm.objects(FOOD_SCHEMA)
            resolve(allFood)
        })
    }).catch((error) => reject(error))
})




export default new Realm(databaseOptions)