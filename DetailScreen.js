import React from 'react';
import {View, StatusBar, Text} from 'react-native'
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';


class DetailScreen extends React.Component {
    static navigationOptions = (navigation) =>{
        return {
            headerTitle: 'Details',
        }
    };

    constructor(props){
        super(props);
        const { params } = this.props.navigation.state;
        const id = params ? params.id : null;

        this.state = {
            id: id,
            detailData : props.list && id ? props.list[id-1] : [],
        }


    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.state.detailData.id } Details!</Text>
                <Text>{this.state.detailData.title}</Text>
                <Text>{this.state.detailData.description}</Text>
                <StatusBar barStyle="default" backgroundColor = "#00BCD4" />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    list : state.list,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({

    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)



