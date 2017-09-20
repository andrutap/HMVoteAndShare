export function Omer(uri, qs) {
    //Private QueryString Handler
    function queryString(data) {
        return Object.keys(data).map(function (key) {
            return [key, data[key]].map(encodeURIComponent).join('=');
        }).join('&');
    }
    return new Promise(function(resolve, reject) {
        var tmstp = Date.now(),
            fn = 'ajpRsp_' + tmstp,
            scpe = document.createElement('script'),
            query = qs && typeof qs === 'object' ? '&' + queryString(qs) : '',
            elIDpre = uri.split('//')[1].split('/')[0].split('.')[1],
            url = uri.replace(/callback=\w+/i, 'callback=' + fn);
        url = query ? url + query : url;
        //Private Generic "Callback" method resolves/rejects Promise
        function ajpRsp (tm) {
            return function (data) {
                var ajpCk = false,
                    dtype = typeof data,
                    tid = '#'+tm,
                    rmscr = document.querySelector(tid);
                switch (dtype) {
                    case 'string':
                        ajpCk = JSON.parse(data);
                        break;
                    case 'object':
                        ajpCk = data;
                        break;
                }
                document.querySelector('head').removeChild(rmscr);
                delete window[fn];
                if (ajpCk) {
                    resolve(ajpCk);
                } else {
                    reject(Error('invalid request or empty jsonp object',ajpCk));
                }
            };
        }
        window[fn] = ajpRsp(elIDpre+'_'+tmstp);
        scpe.type = 'text/javascript';
        scpe.src = url;
        scpe.id = elIDpre+'_'+tmstp;
        document.querySelector('head').appendChild(scpe);
    });
}

export function statusChangeCallback(response) {
  console.log(response)
    if (response.status === 'connected') {
      FB.api('/me', {fields: 'id, link, picture, first_name, last_name, email'}, (resp) => {
        resp.picture = resp.picture.data.url
        resp.profile = resp.link
        resp.login_type = 'fb'
      })
    } else if (response.status === 'not_authorized') {

    } else {

    }
}

export function checkLoginState() {
  FB.getLoginStatus((response) => {
    statusChangeCallback(response)
  })
}

export function loginToFacebook () {
  FB.login(statusChangeCallback, {scope: 'public_profile,email'});
}

//FB.getLoginStatus((response) => {
  //statusChangeCallback(response)
//})
