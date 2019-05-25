var URL = 'http://52.14.45.47:8000/';

export var result = '';
export function _makeMethod(Method, flag)
{
    var Init = {
        method: Method,
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Language': 'ko-KR'
        },
        body: JSON.stringify({
            param: '윤'
        })
    };

    return Init;

}
export async function _getResponse(flag) {

    var Req = _makeMethod('POST', flag);
    if (flag === 1 || flag === 2 || flag === 3) 
    {
        console.log('here');
        fetch(URL, Req).catch((error) => {
          console.error(error);
        });
        return 0;
    }

    if (flag === 4) 
    {
        var word = '';

        await fetch(URL, Req)
            .then(async function(response) {
                //console.log(response.text())
                response.text().then(await function(text){ console.log('text.length'); result = text;})})
            .catch((error) => {
          console.error(error);
        });

        
    }

    
}

