
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
// import Camera from 'react-native-camera'

export default class BadInstagramCloneApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            focusedScreen : false,
        }

    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () =>
            this.setState({ focusedScreen: true })
        );
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );
    }

    render() {
        const { focusedScreen } = this.state;
        if (PermissionsAndroid.RESULTS.GRANTED === null) {
            return <View />;
        } else if (PermissionsAndroid.RESULTS.GRANTED === false) {
            return <Text>No access to camera</Text>;
        } else if (focusedScreen){
            return (
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        captureAudio={false}
                        type={RNCamera.Constants.Type.back}
                        onBarCodeRead={(e) => this._onBarCodeRead(e)}
                        // flashMode={RNCamera.Constants.FlashMode.on}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                        // onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        //     console.warn(barcodes);}}
                    />
                    {/*<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>*/}
                        {/*<TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>*/}
                            {/*<Text style={{ fontSize: 14 }}> SNAP </Text>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                </View>
            );
        } else {
            return <View />;
        }
    }
    _onBarCodeRead = (e) => {
        // console.warn(e.type);
        // console.warn(e.data);
        this.props.navigation.navigate("Details", {
            id : e.data,
        })
    }

    // takePicture = async function() {
    //     if (this.camera) {
    //         const options = { quality: 0.5, base64: true };
    //         const data = await this.camera.takePictureAsync(options);
    //         console.log(data.uri);
    //     }
    // };
    takePicture = () => { alert('snap!');}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
