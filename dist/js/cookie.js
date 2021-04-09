let datos = {
    token: ""
}

function createCookie(token) {
    document.cookie = "token=" + token
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            datos.token = c.substring(name.length, c.length)
            console.log(datos)
            return JSON.stringify(datos);
        }
    }
    return "";
}