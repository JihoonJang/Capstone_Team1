import { NativeModules } from 'react-native';

var URL = 'http://3.15.75.68:8000/';
var DNS = 'ec2-3-15-75-68.us-east-2.compute.amazonaws.com';
export var result = '';
export var dataImage = '';
export var dataVoice = '';
export function _makeMethod(Method, flag, Input) {
    var Init = {
        method: Method,
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Language': 'en-US'
        },
        body: JSON.stringify({
            param: flag, data: Input
        })
    };

    return Init;

}
export async function _getResponse(flag, data) {


    if (flag === 1 || flag === 2 || flag === 3) {
        var Req = _makeMethod('POST', flag, null);
        console.log('here');
        fetch(URL, Req).catch((error) => {
            console.error(error);
        });
        return 0;
    }

    if (flag === 4) {
        var Req = _makeMethod('POST', flag, null);

        var word = '';

        await fetch(URL, Req)
            .then(async function (response) {
                //console.log(response.text())
                response.text().then(await function (text) { console.log('text.length'); result = text; })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    if (flag == 5) {
        let Req = data;

        console.log(data);

        await fetch(URL, data)
            .then(async function (response) {
                //console.log(response.text())
                response.text().then(await function (text) { console.log(text); result = text; })
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






