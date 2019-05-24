var URL = 'http://52.14.45.47:8000/';


export function _makeMethod(Method, flag)
{
    var Init = {
        method: Method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Language': 'ko-KR'
        },
        body: JSON.stringify({
            param: flag
        })
    };

    return Init;

}
export function _getResponse(flag) {

    var Req = _makeMethod('POST', flag);
    if (flag === 1 || flag === 2 || flag === 3) 
    {
        fetch(URL, Req).catch((error) => {
          console.error(error);
        });
        return;
    }

    if (flag === 4) 
    {
        var word = '';

        fetch(URL, Req)
            .then(function(response){ return response.text();})
            .then(function(data) { 
                console.log(data);
                word = data;
                
        }).catch((error) => {
          console.error(error);
        });
    }

    return word;
}

