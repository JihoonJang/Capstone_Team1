import React from 'react';
import { Vibration, Image, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FileSystem, Camera, Permissions, Speech, Audio } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';

var uriPhoto = '';
var result_text = '';
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
        quality: 0.5, base64: true, fixOrientation: true,
        exif: true
      };
      await this.camera.takePictureAsync(options).then(async photo => {
        photo.exif.Orientation = 1;
        photo.quality = 0.7;
        FileSystem.copyAsync({ from: photo.uri, to: FileSystem.documentDirectory + 'image/capture.jpg' })
        console.log(photo.uri);
        uriPhoto = photo.uri;
        console.log(typeof (photo.uri));
        //const info = await FileSystem.getInfoAsync(photo);
        const read_options = { encoding: FileSystem.EncodingTypes.Base64 };
        const data = await FileSystem.readAsStringAsync(photo.uri, read_options);

        uploadImageAsync(data);


        Vibration.vibrate(200);

        //console.log(result_text);
        

        //this._Speech(str);

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

async function _Speech(StrToSpeak) {

  const start = () => {
    console.log('start');
  };
  const complete = () => {
    console.log('complete');
  };

  Speech.stop();

  Speech.speak(StrToSpeak, {
    language: 'kr',
    pitch: 0.75,
    rate: 1,
    onStart: start,
    onDone: complete,
    onStopped: complete,
    onError: complete
  });
}


function uploadImageAsync(uri) {
  let apiUrl = 'http://3.15.75.68:8000/';


  uriPhoto = FileSystem.documentDirectory + 'image/capture.jpg';

  let uriParts = uriPhoto.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uriPhoto,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  //console.log(uri);
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Language': 'en-US'
    },
    body: JSON.stringify({
      param: 7, data: uri
    })
  };

  fetch(apiUrl, options).then(function (response) {
    //console.log(response.text())
    response.text().then(function (text) {

      result_text = text;
      
      console.log(text);
      
      var str = '이 낱말은 ' + result_text + ' 입니다.';

      _Speech(str);
      /*
      let formData = new FormData();
      formData.append('photo', {
        uriPhoto,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      console.log(formData);
      let opt = {
        method: 'POST',
        body: formData,
      };
      /*fetch('http://3.15.75.68:8000/upload', opt).then(async function (response) {
        //console.log(response.text())
        response.text().then(await function (text) {
          console.log(text);
        });
      })
        .catch((error) => {
          console.error(error);
        });
        */
    });
  });
}
