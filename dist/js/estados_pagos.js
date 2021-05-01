let btn_buscar_tarjetas = document.getElementById("id_btn_consultar")
let empresas = document.getElementById("select_sub_companys")
    //let check_pendientes = document.getElementById("")

// 1 -> company -- 0 ->unidad
let bandera_company_unidad = 1


//showSpinner()

function getCheck() {
    var element = document.getElementById("sin_pagar").checked
    return element == true ? 1 : 0
}

function getSubCompanys() {
    var selecte = document.getElementById("select_sub_companys")
    var option_companys = selecte.options[selecte.selectedIndex].value
    return option_companys
}

function getUnidades() {
    var selecte = document.getElementById("selec_unidades_tarjeta")
    var option_unidad = selecte.options[selecte.selectedIndex].value
    return option_unidad
}

function api_estados_tarjetas(url) {
    showSpinner()

    //console.log(url)
    let tablas_body = " "

    document.getElementById("tbody_tarjetas_estados_pagos").innerHTML = tablas_body

    $.ajax({
        crossDomain: true,
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(datos) {
        hideSpinner()

        var json_string = JSON.stringify(datos)
        var json_parse = JSON.parse(json_string)


        if (json_parse.status_code == 200) {
            sweetAlert("Tarjetas", "Datos consultados con éxito !", "success")

            for (var i = 0; i < json_parse.datos.length; i++) {
                var span = json_parse.datos[i].estado == 2 ? `<span class="label label-success">Pagado</span>` :
                    `<span class="label label-danger">Pendiente</span>`
                tablas_body += json_parse.datos[i].action == 1 ? `<tr role="row" class="even">
                <td>${json_parse.datos[i].id}</td>
                <td>${json_parse.datos[i].unidad}</td>
                <td>${json_parse.datos[i].emision}</td>
                <td>${json_parse.datos[i].monto}</td>
                <td>${json_parse.datos[i].empresa}</td>
                <td>${span}</td>
                <td><div class="btn-group" role="group" aria-label="...">
                <button title="Pagar Tarjeta ${json_parse.datos[i].id}" class="btn_pagar_tarjeta btn btn-primary" id_tarjeta=${json_parse.datos[i].id}><i class="fa fa-bitcoin"></i></button>
              </div></td>
            </tr>` : `<tr role="row" class="even">
            <td>${json_parse.datos[i].id}</td>
            <td>${json_parse.datos[i].unidad}</td>
            <td>${json_parse.datos[i].emision}</td>
            <td>${json_parse.datos[i].monto}</td>
            <td>${json_parse.datos[i].empresa}</td>
            <td>${span}</td>
            <td> ------ </td>
        </tr>`
            }
            document.getElementById("tbody_tarjetas_estados_pagos").innerHTML = tablas_body
        } else if (json_parse.status_code == 300) {
            sweetAlert("Datos vacios", "No existe información", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }

    }).fail(function(error) {
        hideSpinner()

        sweetAlert("Error 400", "Server Error", "error")
    })
}

btn_buscar_tarjetas.addEventListener("click", function() {
    var fechaI = document.getElementById("id_fechaI_tarjeta_estados_pagos").value
    var fechaF = document.getElementById("id_fechaF_tarjeta_estados_pagos").value


    let url = "http://localhost:3000/tarjetas_estados_pagos/" + fechaI + "/" + fechaF

    console.log("SUBCOMPANYS : " + getSubCompanys())
    console.log("UNIDADES : " + getUnidades())
    if (fechaF.length > 0 && fechaI.length > 0 && fechaF >= fechaI) {


        if (bandera_company_unidad == 1) {

            if (getSubCompanys() == "*") {
                url += "/" + getSubCompanys() + "/" + getCheck() + "/1"
                api_estados_tarjetas(url)
            } else {
                url += "/" + getSubCompanys() + "/" + getCheck() + "/2"
                console.log("companys")
                api_estados_tarjetas(url)
            }



        } else {

            if (getUnidades() == "*") {
                url += "/" + getSubCompanys() + "/" + getCheck() + "/1"
                api_estados_tarjetas(url)
            } else {
                url += "/" + getUnidades() + "/" + getCheck() + "/3"
                console.log("unidades")
                api_estados_tarjetas(url)
            }



        }



        /*if (getSubCompanys() == "*" || getUnidades() == "*")
         {
            /**Busqueda por companys o unidad (all)**/
        /* url += "/" + getSubCompanys() + "/" + getCheck() + "/1"
            api_estados_tarjetas(url)
            return 0;

        } else {

            if (getUnidades() != "*") {
                /**busqueda por unidad**/
        /*    url += "/" + getUnidades() + "/" + getCheck() + "/3"
            console.log("unidades")
            api_estados_tarjetas(url)
            return 0;
        }

        if (getSubCompanys() != "*") {

            /**Busqueda por companys especifica**/
        /*    url += "/" + getSubCompanys() + "/" + getCheck() + "/2"
            console.log("companys")
            api_estados_tarjetas(url)
            return 0;
        }*/
        /*}*/

    } else {
        sweetAlert("Error fechas", "Rango de fechas no válidas", "error")
    }


})

function sweetAlert(title, subtitle, icon) {
    Swal.fire(
        title,
        subtitle,
        icon
    )
}


$(document).on("click", ".btn_pagar_tarjeta", function() {

    var element = $(this)
    var tarjeta = element[0].getAttribute("id_tarjeta")


    Swal.fire({
        title: 'Tarjeta N° ' + tarjeta,
        text: "Desea continuar con el pago de la tarjeta ?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Pagar Tarjeta!'
    }).then((result) => {
        if (result.isConfirmed) {
            //console.log("OK")
            api_rest_pago_tarjeta(element, tarjeta)
        }
    })

    //var tarjeta = element
})

$(document).on("change", "#select_sub_companys", function() {
    bandera_company_unidad = 1
})

$(document).on("change", "#selec_unidades_tarjeta", function() {
    bandera_company_unidad = 0
})

function api_rest_pago_tarjeta(element, tarjeta) {

    showSpinner()

    var obj = {
        token: JSON.parse(getCookie("token")).token,
        code_user_tarjeta: JSON.parse(getCookie("codiclieusua")).token,
        idtarjeta: tarjeta
    }

    //console.log("************************")
    //console.log(obj)
    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/pago_tarjeta",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: JSON.stringify(obj)
    }).done(function(datos) {
        hideSpinner()

        var json_string = JSON.stringify(datos)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            sweetAlert("Tarjeta N°" + tarjeta, "Datos consultados con exito!", "success")
            removeElementPago(element, tarjeta)

        } else if (json_parse.status_code == 300) {
            sweetAlert("Tarjeta N°" + tarjeta, "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Tarjeta N°" + tarjeta, json_parse.datos, "error")
        } else {
            /**Error Login (Token Expirado....)**/
            //console.log(json_parse.datos)
            token_invalited()
        }
    }).fail(function(error) {
        console.log(error)
        hideSpinner()
        sweetAlert("Error 400", "Api Rest 400", "error")
    })

}


function removeElementPago(elemet, tarjeta) {
    var parent = elemet[0].parentNode
        //console.log(element)
    parent.parentNode.parentNode.remove()
    sweetAlert("Tarjeta N°" + tarjeta, "Ha sido pagada con exito!", "success")
}