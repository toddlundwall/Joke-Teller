const audioElement = document.getElementById('audio');
const button = document.getElementById('button');
const VoiceRSS = { speech: function (e) { this._validate(e), this._request(e); }, _validate: function (e) { if (!e) throw "The settings are undefined"; if (!e.key) throw "The API key is undefined"; if (!e.src) throw "The text is undefined"; if (!e.hl) throw "The language is undefined"; if (e.c && "auto" != e.c.toLowerCase()) { var a = !1; switch (e.c.toLowerCase()) { case "mp3": a = (new Audio).canPlayType("audio/mpeg").replace("no", ""); break; case "wav": a = (new Audio).canPlayType("audio/wav").replace("no", ""); break; case "aac": a = (new Audio).canPlayType("audio/aac").replace("no", ""); break; case "ogg": a = (new Audio).canPlayType("audio/ogg").replace("no", ""); break; case "caf": a = (new Audio).canPlayType("audio/x-caf").replace("no", ""); }if (!a) throw "The browser does not support the audio codec " + e.c; } }, _request: function (e) { var a = this._buildRequest(e), t = this._getXHR(); t.onreadystatechange = function () { if (4 == t.readyState && 200 == t.status) { if (0 == t.responseText.indexOf("ERROR")) throw t.responseText; audioElement.src = t.responseText, audioElement.play(); } }, t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a); }, _buildRequest: function (e) { var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec(); return "key=" + (e.key || "") + "&src=" + (e.src || "") + "&hl=" + (e.hl || "") + "&r=" + (e.r || "") + "&c=" + (a || "") + "&f=" + (e.f || "") + "&ssml=" + (e.ssml || "") + "&b64=true"; }, _detectCodec: function () { var e = new Audio; return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : ""; }, _getXHR: function () { try { return new XMLHttpRequest; } catch (e) { } try { return new ActiveXObject("Msxml3.XMLHTTP"); } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) { } try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) { } throw "The browser does not support HTTP request"; } };
const key = '80180cfbd5624b4a90cd631008b15e27';
const url = `https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun`;
const timeOutSec = 10;
const jokeText = document.getElementById('joketext');


const jokeTellerFunc = function () {

    const jokeTellers = ['Zoe', 'Isla', 'Evie', 'Jack', 'Rose', 'Clara', 'Emma', 'Mason', 'Alice', 'Nancy', 'Lily', 'Harry', 'Eka', 'Jai', 'Ajit', 'Linda', 'Amy', 'Mary', 'John', 'Mike'];

    const randomNumber = Math.floor(Math.random() * jokeTellers.length);

    const jokeTeller = jokeTellers[`${randomNumber}`];
    console.log(jokeTeller);
    return jokeTeller;
};

const toggleButton = function () {
    button.disabled = !button.disabled;
};


const tellJoke = function (jokeTeller, jokeContent) {
    VoiceRSS.speech({
        key: key,
        src: jokeContent,
        hl: 'en-gb',
        v: jokeTeller,
        r: 1,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
};

const content = function (element) {
    data.setup ? element = `${data.setup} ${data.delivery}` : element = data.joke;
};

const timeOut = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(() => reject(new Error('Error in getting Data')), s * 1000);
    });
};
// Get jokes from joke API
const getJoke = async function () {

    try {
        let jokeContent = '';
        toggleButton();

        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeOut(timeOutSec)]);
        const data = await res.json();

        console.log(data);

        data.setup ? jokeContent = `${data.setup} ${data.delivery}` : jokeContent = data.joke;

        tellJoke(jokeTellerFunc(), jokeContent);
        jokeText.textContent = jokeContent;
        
        console.log(jokeContent);

    } catch (err) {
        console.error(err);
    }
};

// hide audio controls and add functionality joke button
audio.hidden = true;

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);