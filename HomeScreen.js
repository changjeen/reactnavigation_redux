import React from 'react';
// import {View, Text, Button} from 'react-native';
import {Container, Content, List, ListItem, Text} from "native-base";
import {bindActionCreators} from 'redux';
import {getData} from "./src/actions/MainListAction";
import {connect} from 'react-redux';

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

    componentWillMount(): void {
        this.props.getData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource : nextProps.list,
        });
    }

    render() {

        return (
            <Container>
                <Content>
                    <List dataArray={this.state.dataSource}
                          renderRow={(item) =>
                              <ListItem>
                                  <Text>{item.title}</Text>
                              </ListItem>
                          }>
                    </List>
                </Content>
            </Container>
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
