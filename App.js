import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
} from 'react-native';

const axios = require('react-native-axios');
const cheerio = require('react-native-cheerio')

let arrItem=[];

export default class app extends Component{
  state = {
    title:[],
    src:[],
  }

  componentDidMount =()=>{
    axios.get('https://www.eso.org/public/images/')
    .then((response) =>{
      const $ = cheerio.load(response.data);
      const auxData=(($('.container-fluid script').html()).replace('var images =','').trim());
      arrItem=eval(auxData);

      let arrTitle=[]
      let arrSrc=[]

      for (let index = 0; index < arrItem.length; index++) {
       arrTitle.push(arrItem[index].title);
       arrSrc.push(arrItem[index].src)
      }

      this.setState({
        title:arrTitle,
        src: arrSrc
      })

    })
  }

  render(){

    return(
      <ScrollView style={styles.padd}>
        <View style={styles.margin}>

          <Text style={styles.title}>{this.state.title[0]}</Text>
          <Image source={{uri: this.state.src[0]}} style={{width: 300, height: 300}} />

        </View>
      </ScrollView>
    );
  }
}

const styles=StyleSheet.create({
  margin:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  title:{
    fontWeight:'bold',
    color:'blue',
    fontSize:30,
  },
  body:{
    color:'orange',
    fontSize:30,
  },
  img:{
    width:100,
    height:100,
  },
  padd:{
    paddingTop:50,
    paddingLeft:20,
    paddingEnd:50,
    paddingRight:20,
  },
});