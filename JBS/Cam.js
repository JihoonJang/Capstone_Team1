import React from 'react';
import { Vibration, Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FileSystem, Camera, Permissions, Speech } from 'expo';
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class CameraCapture extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

  }
  async snapPhoto() {

    
    if (this.camera) {
      const options = {
        quality: 1, base64: true, fixOrientation: true,
        exif: true
      };
      await this.camera.takePictureAsync(options).then(async photo => {
        photo.exif.Orientation = 1;
        //await FileSystem.copyAsync({from : photo.uri, to : FileSystem.documentDirectory + 'image/capture.png'})
        Vibration.vibrate(200);
        
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>

          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <TouchableWithoutFeedback onPress={() => this.snapPhoto()} onLongPress = {() => navigate('Home')}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
              </View>
            </TouchableWithoutFeedback>
          </Camera>
        </View>
      );
    }
  }
}
