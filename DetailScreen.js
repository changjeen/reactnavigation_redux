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

    getSnapshotBeforeUpdate(prevProps: Readonly<P>, prevState: Readonly<S>): SS | null {
        if(prevProps.navigation.state.id !== this.props.navigation.state.id) {
            this.setState({id : this.props.navigation.state.id});
        }
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.state.id || 'default id'} Details!</Text>
                {/*<Text>{this.state.detailData.title || 'default title' }</Text>*/}
                {/*<Text>{this.state.detailData.description || 'default description' }</Text>*/}
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



