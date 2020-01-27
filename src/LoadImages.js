import React, {Component} from 'react';
import { ScrollView,Text } from 'react-native';

const axios = require('react-native-axios');
const cheerio = require('react-native-cheerio')

export default class LoadImages extends Component{
    constructor(props){
        super(props);
        this.setState={
            aux:'',
        }
    }

    componentDidMount = () => {
        axios.get('https://www.eso.org/public/images/')
        .then((response) => {
            const $ = cheerio.load(response.data);
            const auxData = $('.container-fluid script').html();
            console.log(auxData)
            this.setState({
                aux:auxData
            })
        })
    }
    
    render(){
        return(
            <ScrollView>
                <Text>
                    {this.state.aux}
                </Text>
            </ScrollView>
        );
    }
}