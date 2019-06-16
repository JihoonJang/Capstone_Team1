import { NativeModules } from 'react-native';
import { FileSystem, Camera, Permissions, Speech, Audio } from 'expo';
var URL = 'http://3.15.75.68:8000/';
var DNS = 'ec2-3-15-75-68.us-east-2.compute.amazonaws.com';
export var result = '';
export var dataImage = '';
export var dataVoice = '';
export function _makeMethod(Method, flag, Input) {
    var Init = {
        method: Method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Language': 'en-US'
        },
        body: JSON.stringify({
            param: flag, data: Input
        })
    };

    return Init;

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


export async function _getResponse(flag, data) {


    if (flag === 1 || flag === 2 || flag === 3 || flag === 4) {
        var Req = _makeMethod('POST', flag, null);
        console.log('here');
        fetch(URL, Req)
            .then(async function (response) {
                //console.log(response.text())
                response.text().then(function (text) { console.log(text); })
            })
            .catch((error) => {
                console.error(error);
            });
        return 0;
    }

    if (flag === 5) {
        var Req = {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Language': 'en-US'
            },
            body: JSON.stringify({
                param: flag, data: null
            })
        };
        var word = '';

        fetch(URL, Req)
            .then(async function (response) {
                //console.log(response.text())
                response.text().then(await function (text) { 

                    //console.log("11111111111111111111111"); 
                    
                    result = text;
                    var str = '이 낱말은 ' + result + ' 입니다.';
                    console.log(str);
                    _Speech(str);
                 })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    if (flag === 6) {
        var Req = {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Language': 'en-US'
            },
            body: JSON.stringify({
                param: flag, data: data
            })
        };
        //console.log(data);
        //URL = URL + 'upload';
        fetch(URL, data)
            .then(async function (response) {
                //console.log(response.text())
                response.text().then(function (text) {
                    //console.log("11111111111111111111111"); 
                    
                    //result = text;
                    //var str = '이 낱말은 ' + result + ' 입니다.';
                    //console.log(str);
                    //_Speech(str);
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }
}

export async function getData(uri) {

    console.log("Uploading " + uri);
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];


    const formData = new FormData();

    await formData.append('file', {
        uri,
        name: `recording.${fileType}`,
        type: `audio/x-${fileType}`,
    });


    let options = {
        method: 'POST',
        body: formData,
    }

    return options;
}






