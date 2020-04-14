import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet,Alert, Button } from 'react-native'
import {queryFood,insertNewFood,deleteFood} from './databases/allSchemas'
import realm from './databases/allSchemas'

import Header from './components/Header'
import ListItem from './components/ListItem'
import AddItem from './components/AddItem'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        foodLists: []
    }
  }
  
  deleteItem = (id) => {
    console.log("im trying to delete", id)
    deleteFood(id)
    .then(this.reloadData())
    .catch(error => {
      alert(`Failed to delete deleteFood with id = ${id}, error=${error}`);
  });
  }

  addItem = (text) =>{
    const newFood = {
      id: Math.floor(Date.now()/1000),
      text: text,
  }
  insertNewFood(newFood)
  .then(this.reloadData())
  }

  reloadData = () => {
    queryFood()
    .then((foodLists) => {
        this.setState({ foodLists })
    }).catch((error) => {
        this.setState({ foodLists: [] })
    })
  
}
  componentDidMount(){
    this.reloadData()
  }
  render(){
    return (
      <View style ={styles.container}>
        <Header title="My Shopping List"/>
        
        <FlatList 
        data= {this.state.foodLists} 
        renderItem = {({item}) => <ListItem item={item} deleteItem={this.deleteItem}  />} 
        keyExtractor={(item) => `list-item-${item.id}`}
        />
        <AddItem addItem={this.addItem} />
      </View>)
  }
}
'list-item-${index}'
const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }
})