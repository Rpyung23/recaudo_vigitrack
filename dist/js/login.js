let selector = document.getElementById("selector")
let options = document.getElementById("options")
let label = document.getElementById("label_compay")
let bandera_visible = false
let objCompany = {
    name: "",
    child: "",
    act: ""
}

/**selector.addEventListener("click", function() {

    if (!bandera_visible) {
        options.className = ("options options-visible")
        bandera_visible = true

    } else {
        removeClass()
        bandera_visible = false
    }
})*/



/**label.addEventListener("click", function() {

    if (!bandera_visible) {
        options.className = ("options options-visible")
        bandera_visible = true

    } else {
        removeClass()
        bandera_visible = false
    }
})*/

function removeClass() {
    options.className = ("options")
    options.classList.remove("options-visible")
}


function loadCompanys() {
    showSpinner()

    let li_ = "";

    $.ajax({
        url: "http://localhost:3000/companys",
        method: "POST"
    }).done(function(datos) {
        var json_string = JSON.stringify(datos)
        var json_parse = JSON.parse(json_string)
        for (var i = 0; i < json_parse.length; i++) {
            //console.log(json_parse[i].name)
            li_ += `<li class="options_item" key = "${json_parse[i].key}" act="${json_parse[i].act}" >${json_parse[i].name}</li>`
        }
        document.getElementById("ul_options").innerHTML = li_

        console.log("done")
        hideSpinner()

    }).fail(function(error) {
        console.log("error")
        hideSpinner()
    })
}


function removeItemActive() {
    var elementos_children = document.getElementById("ul_options").children

    for (var i = 0; i < elementos_children.length; i++) {

        var childre_active = elementos_children[i];
        $(childre_active).removeClass("item-active")

    }
}

$(document).on("click", ".options_item", function() {
    var element = $(this)[0]
    removeItemActive()
    $(element).addClass("item-active")
    objCompany.name = element.innerText
    objCompany.child = element.attributes[1].value
    objCompany.act = element.attributes[2].value

    console.log(objCompany)

    document.getElementById("btnCompany").innerText = objCompany.name.replace("Cooperativa", "")

    //removeClass()

})

$(document).on("click", "#login", function() {

    showSpinner()

    var user = document.getElementById("input_user").value
    var pass = document.getElementById("input_pass").value
    var datos = {
        user: user,
        pass: pass,
        child: objCompany.act
    }

    $.ajax({
        url: "http://localhost:3000/login",
        method: "POST",
        data: datos
    }).done(function(datos) {
        var json_string = JSON.stringify(datos)
        var json_parse = JSON.parse(json_string)


        hideSpinner()

        if (json_parse.code == 200) {
            /**CREATE COOKIES **/

            createCookie(json_parse.token, json_parse.datos_extras)

            location.href = "dashboard.html"

        } else if (json_parse.code == 400) {
            SweertAlert("Login", "Credenciales no validas", "error")
        }
    }).fail(function(error) {
        hideSpinner()
        alert("Lo sentimos Fail")
    })

})

function SweertAlert(title, texto, type) {
    Swal.fire(
        title,
        texto,
        type
    )
}