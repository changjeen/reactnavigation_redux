import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
// import {Container, Content, List, ListItem, Text} from "native-base";
import {bindActionCreators} from 'redux';
import {getData} from "./src/actions/MainListAction";
import {connect} from 'react-redux';
import { ListItem } from "react-native-elements";

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            dataSource: props.list || [],
        }


    }

    static navigationOptions = (navigation) => {

        return {
            headerTitle: 'Home',
            // headerLeft: (
            //     <Button title="Info" onPress={()=> navigation.navigation.toggleDrawer()} color="#fff"/>
            // ),
        };
    };

    // componentWillMount(): void {
    //     this.props.getData();
    // }

    componentDidMount(): void {
        this.props.getData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource : nextProps.list,
        });
        if(this.props.list.length !== nextProps.list.length) {
            this.props.navigation.setParams({listCount: 9});
            this.props.navigation.dangerouslyGetParent().setParams({listCount:9});
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.warn(error.message);
    }

    renderRow = ({item}) =>
        (
            <ListItem
                title = {item.title}
                onPress={() => this.props.navigation.navigate("Details", {
                    id : item.id,
                })}
            />

        )


    keyExtractor = (item, index) => index

    render() {

        return (
            /*
            <Container>
                <Content>
                    <List dataArray={this.state.dataSource}
                          renderRow={
                              data => this.renderRow(data)
                          }>
                    </List>
                </Content>
            </Container>
            */
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.dataSource}
                renderItem={
                    this.renderRow
                }


            />
        );
    }
}

const mapStateToProps = state => ({
    list : state.list,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getData,
    },dispatch)
);


export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen);
