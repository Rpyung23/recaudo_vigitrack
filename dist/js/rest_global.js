function all_unidades() {
    showSpinner()

    let select_buses = ""

    //console.log(getCookie("token"))

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/unidades",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        hideSpinner()
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {
                var id_unidad = json_parse.datos[i].id_unidad;
                select_buses += `<option value="${id_unidad}">Unidad ${id_unidad}</option>`
            }

            //console.log(select_buses)
            document.getElementById("select_buses_global").innerHTML = select_buses

        } else if (json_parse.status_code == 300) {
            sweetAlert("Sin datos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
    })
}

function all_sub_companys(bandera) {
    showSpinner()
    let select_buses = ""
    if (bandera) {
        select_buses = `<option value="*">TODAS LAS EMPRESAS</option>`
    }

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/sub_companys",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        hideSpinner()
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {
                var company = json_parse.datos[i].company;
                select_buses += `<option value="${company}">${company}</option>`
            }

            //console.log(select_buses)
            document.getElementById("select_sub_companys").innerHTML = select_buses

        } else if (json_parse.status_code == 300) {
            sweetAlert("Sin datos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
    })
}


function fechasMinMax() {

    showSpinner()

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/fechaTarjetasMin",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        hideSpinner()
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        let fechaI = ""
        let fechaF = ""

        if (json_parse.status_code == 200) {
            console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {
                /*var company = json_parse.datos[i].company;
                select_buses += `<option value="${company}">${company}</option>`*/

                fechaI = json_parse.datos[i].fechaI
                fechaF = json_parse.datos[i].fechaF
            }

            //console.log(select_buses)
            document.getElementById("id_fechaI_tarjeta_estados_pagos").value = fechaI
            document.getElementById("id_fechaF_tarjeta_estados_pagos").value = fechaF

        } else if (json_parse.status_code == 300) {
            sweetAlert("Sin datos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
    })
}

function all_unidades_tarjetas() {
    showSpinner()

    let select_buses = `<option value="*">*</option>`

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/unidades",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        hideSpinner()
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            //console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {
                var id_unidad = json_parse.datos[i].id_unidad;
                select_buses += `<option value="${id_unidad}">${id_unidad}</option>`
            }

            //console.log(select_buses)
            document.getElementById("selec_unidades_tarjeta").innerHTML = select_buses

        } else if (json_parse.status_code == 300) {
            sweetAlert("Sin datos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
    })
}

function all_unidades_tarjetas_trabajadas() {
    showSpinner()

    let select_buses = ""

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/unidades",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        hideSpinner()
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            select_buses = `<option value="*">Todas (*)</option>`

            for (let i = 0; i < json_parse.datos.length; i++) {
                var id_unidad = json_parse.datos[i].id_unidad;
                select_buses += `<option value="${id_unidad}">Unidad ${id_unidad}</option>`
            }

            //console.log(select_buses)
            document.getElementById("select_buses_global").innerHTML = select_buses

        } else if (json_parse.status_code == 300) {
            sweetAlert("Sin datos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
    })
}



function all_unidades_nav_aside(bandera) {

    showSpinner()

    let select_buses = ""

    if (!bandera) {
        select_buses = ""
    } else {
        select_buses = `<li class="item-bus item-bus-global" bus="*">

        <div class="sub-item-bus-aside-li">
            <div>
                <i class="fa fa-bus color-icon-right"></i><span class="span_unidad"> General (*)</span>
            </div>

            <div>
                <span class="pull-right-container">
                    <i class="fa fa-angle-right color-icon-right"></i>
                  </span>
            </div>
        </div>

    </li>`
    }

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/unidades",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        hideSpinner()

        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            //console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {
                var id_unidad = json_parse.datos[i].id_unidad;
                var placa = json_parse.datos[i].placa;
                select_buses += `<li class="item-bus item-bus-global" bus=${id_unidad}>

                <div class="sub-item-bus-aside-li">
                    <div>
                        <i class="fa fa-bus color-icon-right"></i><span class="span_unidad"> ${id_unidad} ${placa}</span>
                    </div>

                    <div>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-right color-icon-right"></i>
                          </span>
                    </div>
                </div>

            </li>`
            }

            //console.log(select_buses)
            document.getElementById("ul_aside_buses").innerHTML = select_buses

        } else if (json_parse.status_code == 300) {
            sweetAlert("Sin datos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
    })
}


function velocidad_maxima() {
    showSpinner()
    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/velocidad",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        hideSpinner()

        if (json_parse.status_code == 200) {
            //console.log("ok")
            document.getElementById("input_velocidad_maxima").value = json_parse.datos.velocidad

        } else if (json_parse.status_code == 300) {
            sweetAlert("Sin datos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
    })
}



function sweetAlert(title, subtitle, icon) {
    Swal.fire(
        title,
        subtitle,
        icon
    )
}