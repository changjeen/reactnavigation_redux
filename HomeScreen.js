import React from 'react';
import {View, Text, Button, FlatList, AsyncStorage,StyleSheet, TouchableOpacity, WebView, ScrollView, RefreshControl} from 'react-native';
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
        this._storeData = this._storeData.bind(this);

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
        // this._storeData;
        AsyncStorage.setItem('badgeCount', '5');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource : nextProps.list,
        });
        if(this.props.list.length !== nextProps.list.length) {
            this.props.navigation.setParams({listCount: 8});
            // this.props.navigation.dangerouslyGetParent().setParams({listCount:9});
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.warn(error.message);
    }

    _storeData = async() => {
        try{
            await AsyncStorage.setItem('unReadItemCount', 5);
        }catch (e) {
            // Error saving data
        }
    }
    /*
    renderRow = ({item}) =>
        (
            <ListItem
                title = {item.title}
                onPress={() => this.props.navigation.navigate("Details", {
                    id : item.id,
                })}
            />

        )
    */

    renderRow = ({item}) =>
        (
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Details", {
                id : item.id,
            })}>
                <View style={style.container}>
                    <Text> {item.title}</Text>
                    {/*<Text> {item.description}</Text>*/}
                </View>
            </TouchableOpacity>
        )


    keyExtractor = (item, index) => index;

    separator = () => <View style={style.separator}/>


    render() {
        let WebViewRef;

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
            /*
            <FlatList
                ItemSeparatorComponent={this.separator}
                keyExtractor={this.keyExtractor}
                data={this.state.dataSource}
                renderItem={
                    this.renderRow
                }


            />
            */

            <View style={{flex: 1}}>
                <ScrollView
                    contentContainerStyle={{flex: 1}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={WebViewRef && WebViewRef.reload()}
                        />
                    }
                >
                    <WebView
                        ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
                        source={{uri: 'http://0.0.0.0:443/seatstatus'}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                </ScrollView>
            </View>


        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding:12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    separator: {
        borderBottomColor: '#d1d0d4',
        borderBottomWidth: 1
    },
})

const mapStateToProps = state => ({
    list : state.list,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        getData,
    },dispatch)
);


export default connect (mapStateToProps, mapDispatchToProps)(HomeScreen);
