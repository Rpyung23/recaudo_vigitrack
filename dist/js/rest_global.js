function all_unidades() {
    let select_buses = ""

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/unidades",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
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

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {

    })
}


function all_unidades_tarjetas_trabajadas() {
    let select_buses = ""

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/unidades",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
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

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {

    })
}



function all_unidades_nav_aside(bandera) {

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
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            console.log("ok")
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

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {

    })
}


function velocidad_maxima() {

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

        if (json_parse.status_code == 200) {
            console.log("ok")



            document.getElementById("input_velocidad_maxima").value = json_parse.datos.velocidad

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {

    })
}