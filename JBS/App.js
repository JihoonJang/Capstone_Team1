import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableHighlight,
  Vibration,
  NativeModules,
  Platform,
  Animated,
  AppState,
  Image,
} from 'react-native';

import { getData, _makeMethod, _getResponse, result, dataVoice } from './Networking.js';
import CameraCaputre from './Cam.js';
import { Intro } from './intro.js';
import Swiper from 'react-native-swiper';
import { FileSystem, Permissions, Audio, Speech, Constants, Asset } from 'expo';
import { createStackNavigator, createAppContainer, SafeAreaView } from 'react-navigation';
if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(-100);
}

const string = ['자 모음 연습', '낱말 연습', '텍스트 변환'];
const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#92BBD9',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    width: 5000,
    height: 5000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }

})

const menu = ['사용법을 들으시려면 화면을 터치하세요', '자음 연습', '모음 연습', '낱말 연습', '음성 텍스트 변환', '사진 텍스트 변환'];
const explain = ['저희가 제공하는 학습 기능은 자음 연습, 모음 연습, 낱말 연습, 텍스트 변환이 있습니다. 각 학습 메뉴로 이동하려면 화면을 스와이프하여 넘기세요. 각 메뉴에서 해당 설명을 들으시려면 화면을 길게 터치하시고, 학습을 시작하려면 화면을 짧게 터치하시면 됩니다.',
  '자음 연습입니다. 한국어의 자음은 총 14개 입니다. 점자판에 기역. 부터 순서대로 표시되며, 자음 하나에 해당하는 점자를 읽으신 후 화면을 터치하시면 계속 안내를 해 드리겠습니다. 자음 연습을 시작하려면 화면을 짧게 터치해주세요.',
  '모음 연습입니다. 한국어의 모음은 총 10개 입니다. 점자판에 아. 부터 순서대로 표시되며, 모음 하나에 해당하는 점자를 읽으신 후 화면을 터치하시면 계속 안내를 해 드리겠습니다. 모음 연습을 시작하려면 화면을 짧게 터치해주세요.',
  '낱말 연습입니다. 한국어 낱말 중 4음절까지의 낱말을 안내해드릴테니 학습해보세요. 낱말 연습을 시작하려면 화면을 짧게 터치해주세요.',
  '음성 텍스트 변환입니다.'
];
const Count = ['', '첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열', '열 한', '열 두', '열 세', '열 네'];
const Consonant = ['', '기역', '니은', '디귿', '리을', '미음', '비읍', '시옷', '이응', '지읃', '치읃', '키윽', '티읃', '피읍', '히읗'];
const Vowel = ['', 'ㅏ.', 'ㅑ.', 'ㅓ.', 'ㅕ.', 'ㅗ.', 'ㅛ.', 'ㅜ.', 'ㅠ.', 'ㅡ.', 'ㅣ.'];

const forRecord = ['녹음을 시작합니다. 화면을 터치하세요. 녹음이 끝나면 화면을 다시 터치해주세요.', '녹음이 종료되었습니다.']


class Home extends Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.state = {
      flagCons: 0,
      consCnt: 0,
      flagVowels: 0,
      vowelCnt: 0,
      flagStart: 0,
      flagWords: 0,
      flagRecording: 0,
      haveRecordingPermissions: false,

      meted: false,
      olume: 1.0,
      rate: 1.0,
      shouldCorrectPitch: true
    };

    this.recordingSettings = JSON.parse(JSON.stringify({
      ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      ios: {
        ...Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY.ios,
        extension: '.amr_wb',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_AMR_WB
      }
    }));
  }


  async PlayIntro() {
    await Intro();
  }

  async _Speech(StrToSpeak) {

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

  async _Words() {

    var str = '낱말 연습을 시작합니다. 화면을 터치하세요.';


    await _getResponse(5, null);
    console.log(result.length);

    console.log(typeof (result));
    console.log(result);


    //str = '이 낱말은 ' + result + ' 입니다. 다음 낱말을 연습하시려면 화면을 터치하세요.'


    //this._Speech(str);

  }

  async _playBeep() {
    await Audio.setIsEnabledAsync(true);
    const beep = new Audio.Sound();
    await beep.loadAsync(require('./beep.mp3'));
    await beep.setPositionAsync(6500);
    await beep.playFromPositionAsync();

  }
  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });



  };



  async Record() {

    await this._askForPermissions();



    //console.log(this.recording);
    console.log(this.state.flagRecording);
    //console.log(this.state.haveRecordingPermissions);


    if (this.state.haveRecordingPermissions === true && this.state.flagRecording === 0) {
      this.state.flagRecording = 1;


      await this._Speech(forRecord[0]);

      console.log('Recording Ready');


      if (this.sound !== null) {
        this.sound = null;
      }
      if (this.recording !== null) {
        this.recording.setOnRecordingStatusUpdate(null);
        this.recording = null;
      }




      return;
    }
    if (this.state.haveRecordingPermissions === true && this.state.flagRecording === 1) {
      this.state.flagRecording = 2;

      await this._playBeep();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });

      const recording = new Audio.Recording();

      await recording.prepareToRecordAsync(this.recordingSettings);

      this.recording = recording;

      await this.recording.startAsync();

      console.log('Recording...');
      return;
    }
    if (this.state.haveRecordingPermissions === true && this.state.flagRecording === 2) {

      await this.recording.stopAndUnloadAsync();


      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
      });

      const sound = await this.recording.createNewLoadedSoundAsync(
        {
          isLooping: true,
          isMuted: this.state.muted,
          volume: this.state.volume,
          rate: this.state.rate,
          shouldCorrectPitch: this.state.shouldCorrectPitch,
        },
      );

      console.log('Recording End');
      this.sound = sound.sound;

      console.log(Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_WB);
      //Audio.playAsync = this.sound.playAsync.bind(this);
      //await this.sound.playAsync();
      //await this.sound.stopAsync();

      ///////////////////////텍스트 변환 코드 여기에////////////////////////////

      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      console.log(typeof (info['uri']));



      const options = { encoding: FileSystem.EncodingTypes.Base64 };
      const data = await FileSystem.readAsStringAsync(info['uri'], options);

      await console.log(info['uri']);

      
      //await _getResponse(5, await getData(info['uri']));
      _getResponse(6, data);
      ////////////////////////////////////////////////////////////////////////

      if (this.sound !== null) {
        this.sound = null;
      }
      if (this.recording !== null) {
        this.recording.setOnRecordingStatusUpdate(null);
        this.recording = null;
      }
      //console.log(info);
      //console.log(this.sound);
      
      this._Speech("변환이 완료되었습니다. 점자 기기를 확인해 주세요.");
      this.state.flagRecording = 0;

      //str = '이 낱말은 ' + result + ' 입니다. 다음 낱말을 연습하시려면 화면을 터치하세요.';
      //await this._Speech(str);
      return;
    }
  }

  _Voice_to_Text() {

    this.Record();

  }
  _Vowel() {

    console.log(this.state.flagVowels);
    console.log(this.state.vowelCnt);

    if (this.state.flagVowels === 0 && this.state.vowelCnt === 0) // start
    {
      _getResponse(3, null);

      var str = '모음 연습을 시작합니다. 화면을 터치하세요.';

      this._Speech(str);

      this.setState({
        vowelCnt: this.state.vowelCnt + 1
      });
    }

    if (this.state.flagVowels === 0 && this.state.vowelCnt > 8) {

      _getResponse(4, null);

      this.setState({
        vowelCnt: 1, flagVowels: 1
      });

      this._Speech('점자판의 맨 왼쪽으로 다시 손가락을 대 주세요. 화면을 계속 터치해 주세요.');

    }


    if (this.state.flagVowels === 0 && this.state.vowelCnt > 0 && this.state.vowelCnt <= 8) // 모음
    {

      var str = Count[this.state.vowelCnt] + ' 번째 모음은 ' + Vowel[this.state.vowelCnt] + ' 입니다.';

      this._Speech(str);

      this.setState({
        vowelCnt: this.state.vowelCnt + 1
      });

    }

    if (this.state.flagVowels === 1 && this.state.vowelCnt > 0 && this.state.vowelCnt <= 3) {

      if (this.state.vowelCnt === 3) {
        this.setState({
          vowelCnt: 0, flagVowels: 0
        });

        this._Speech('모음 연습이 끝났습니다. 다른 학습 메뉴로 스와이프 해 주세요.');
        _getResponse(0, null);

        return;
      }

      var str = Count[(this.state.vowelCnt + 8)] + ' 번째 모음은 ' + Vowel[this.state.vowelCnt + 8] + ' 입니다.';

      this._Speech(str);

      this.setState({
        vowelCnt: this.state.vowelCnt + 1
      });

      

    }

  }
  _Cons() {

    if (this.state.flagCons === 0 && this.state.consCnt === 0) // start
    {

      _getResponse(1, null);
      var str = '자음 연습을 시작합니다. 화면을 터치하세요.';

      this._Speech(str);

      this.setState({
        consCnt: this.state.consCnt + 1
      });

    }

    if (this.state.flagCons === 0 && this.state.consCnt > 8) {

      _getResponse(2, null);

      this.setState({
        consCnt: 1, flagCons: 1
      });

      this._Speech('점자판의 맨 왼쪽으로 다시 손가락을 대 주세요. 화면을 계속 터치해 주세요.');

    }

    if (this.state.flagCons === 0 && this.state.consCnt > 0 && this.state.consCnt <= 8) // ㄱ ~ ㅌ
    {



      var str = Count[this.state.consCnt] + ' 번째 자음은 ' + Consonant[this.state.consCnt] + ' 입니다.';

      this._Speech(str);

      this.setState({
        consCnt: this.state.consCnt + 1
      });




    }

    if (this.state.flagCons === 1 && this.state.consCnt > 0 && this.state.consCnt <= 7) {


      if (this.state.consCnt === 7) {
        this.setState({
          consCnt: 0, flagCons: 0
        });

        this._Speech('자음 연습이 끝났습니다. 다른 학습 메뉴로 스와이프 해 주세요.');
        _getResponse(0, null);

        return;
      }

      var str = Count[(this.state.consCnt + 8)] + ' 번째 자음은 ' + Consonant[this.state.consCnt + 8] + ' 입니다.';

      this._Speech(str);

      this.setState({
        consCnt: this.state.consCnt + 1
      });

      

    }

  }

  _onPressButton() {
    Alert.alert('Hello!');
    Vibration.vibrate(DURATION);
  }

  _speakMenu(i) {


    this._Speech(menu[i]);

    this.state.consCnt = 0;
    this.state.flagCons = 0;
    this.state.flagVowels = 0;
    this.state.vowelCnt = 0;
    this.state.flagRecording = 0;


  };

  _speakExplain(i) {

    this._Speech(explain[i]);

    this.setState({ flagCons: 0, consCnt: 0, flagVowels: 0, vowelCnt: 0 })
  };

  _speakIntro() {
    this._Speech('점비스에 오신 것을 환영합니다! ');
  }

  async _callCam() {
    this.props.navigator.push({ id: 'CameraCapture' });
  }



  componentDidMount() {
    if (this.state.flagStart === 0) {

      this._speakIntro();
      this._speakMenu(0);
      _getResponse(0, null);
      const { navigate } = this.props.navigation;


    }
  }

  render() {

    this._speakMenu = this._speakMenu.bind(this);
    this._Cons = this._Cons.bind(this);
    this._Vowel = this._Vowel.bind(this);
    this._Voice_to_Text = this._Voice_to_Text.bind(this);
    const { navigate } = this.props.navigation;


    //console.log(this.props.navigation);
    console.log(AppState.currentState);
    return (

      <Swiper style={styles.wrapper} showsButtons={true} showsPagination={false} onIndexChanged={this._speakMenu.bind(Swiper.index)} loop={true}  >
        <View style={styles.slide1}>
          <TouchableHighlight onPress={() => this._speakExplain(0)}>
            <View style={styles.button} >
              <Text style={styles.text}>사용법</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.slide1}>
          <TouchableHighlight onPress={() => this._Cons()} onLongPress={() => this._speakExplain(1)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.text}>자음 연습</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.slide1}>
          <TouchableHighlight onPress={() => this._Vowel()} onLongPress={() => this._speakExplain(2)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.text}>모음 연습</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.slide1}>
          <TouchableHighlight onPress={() => this._Words()} onLongPress={() => this._speakExplain(3)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.text}>낱말 연습</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.slide1}>
          <TouchableHighlight onPress={() => this._Voice_to_Text()} onLongPress={() => this._speakExplain(4)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.text}>음성 텍스트 변환</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.slide1}>
          <TouchableHighlight onPress={() => navigate('Cam')} onLongPress={() => this._speakExplain(4)} underlayColor="white">
            <View style={styles.button}>
              <Text style={styles.text}>사진 텍스트 변환</Text>
            </View>
          </TouchableHighlight>
        </View>
      </Swiper>
    );
  }

}

const MainNavigator = createStackNavigator({
  Home: Home,
  Cam: CameraCaputre,
});

const JBS = createAppContainer(MainNavigator);
export default JBS;