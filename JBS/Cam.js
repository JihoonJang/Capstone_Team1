import React from 'react';
import { Vibration, Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FileSystem, Camera, Permissions, Speech } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';

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
        console.log(photo.uri);
        console.log(typeof(photo.uri));
        //const info = await FileSystem.getInfoAsync(photo);
        const read_options = { encoding: FileSystem.EncodingTypes.Base64 };
        const data = await FileSystem.readAsStringAsync(photo.uri, read_options);
        console.log(data);
        await uploadImageAsync(data)
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
        <View style={{ flex: 1, backgroundColor: '#9DD6EB' }}>

          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1, backgroundColor: '#9DD6EB' }} type={this.state.type}>
            <TouchableWithoutFeedback onPress={() => this.snapPhoto()} onLongPress={() => navigate('Home')}>
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

async function uploadImageAsync(data) {
  let apiUrl = 'http://3.15.75.68:8000/';

/*

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
*/
  let options = {
    method: 'POST',
    body: JSON.stringify({
      param: 6, data: data
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  fetch(apiUrl, options).then(async function (response) {
      //console.log(response.text())
      response.text().then(await function (text) { console.log(text);})
    })
    .catch((error) => {
      console.error(error);
    });;
}
