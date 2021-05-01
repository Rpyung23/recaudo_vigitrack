let datos = {
    token: ""
}

function createCookie(token, datos_extra) {

    //console.log("CREATE COOKIE")
    var d = new Date()
    d.setTime(d.getTime() + (8 * 60 * 60 * 1000))

    var expe = "expires=" + d

    document.cookie = "token=" + token + ";" + expe + ":path=/"

    document.cookie = "codiusua=" + datos_extra.codiusua + ";" + expe + ":path=/"
    document.cookie = "codiclieusua=" + datos_extra.codiclieusua + ";" + expe + ":path=/"
    document.cookie = "nombapellusua=" + datos_extra.nombapellusua + ";" + expe + ":path=/"
    document.cookie = "nombusua=" + datos_extra.nombusua + ";" + expe + ":path=/"
    document.cookie = "nombemprclie=" + datos_extra.nombemprclie + ";" + expe + ":path=/"
    document.cookie = "tarjtituclie=" + datos_extra.tarjtituclie + ";" + expe + ":path=/"
        //console.log(datos_extra)
        //console.log(getCookie("codiclieusua"))
}


function cerrarCookie() {


    console.log("********************************************************")

    try {
        var d = new Date()
        d.setTime(d.getTime() - (8 * 60 * 60 * 1000))

        var expe = "expires=" + d

        //console.log(expe)

        document.cookie = "token=" + null + ";" + expe + ":path=/"

        document.cookie = "codiusua=" + null + ";" + expe + ":path=/"
        document.cookie = "codiclieusua=" + null + ";" + expe + ":path=/"
        document.cookie = "nombapellusua=" + null + ";" + expe + ":path=/"
        document.cookie = "nombusua=" + null + ";" + expe + ":path=/"
        document.cookie = "nombemprclie=" + null + ";" + expe + ":path=/"
        document.cookie = "tarjtituclie=" + null + ";" + expe + ":path=/"

        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        location.href = "../../index.html"

    } catch (error) {
        console.log(error)
    }

    //console.log(ca)

    console.log("**********************************************************")
}


function getCookie(cname) {
    // console.log(cname)
    //datos.token = "S/N"
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    //console.log(ca)

    var tam = ca.length



    for (let i = 0; i < tam; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        //console.log(c.indexOf(name))
        if (c.indexOf(name) == 0) {
            var aux = c.substring(name.length, c.length)
            datos.token = aux
                //console.log("ENCONTRO " + aux)
            if (aux != null) {
                return JSON.stringify(datos);
            } else {
                //console.log("NO ENCONTRO")
                return JSON.stringify(datos);
            }
        }
    }

    return JSON.stringify(datos);
}


function readCompanyName() {
    var element = document.getElementById("p_name_company")
    var js = getCookie("nombemprclie")
        //console.log(js)
    element.innerHTML = JSON.parse(js).token
}