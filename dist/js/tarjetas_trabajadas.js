//tbody_tarjeta_trabajadas


function tarjetas_trabajadas_all(fechaI, fechaF) {
    showSpinner()

    let tabaja_tarjetas_trabajadas = ""


    let select_unidad = document.getElementById("select_buses_global")
    let option_unidad = select_unidad.options[select_unidad.selectedIndex].value

    var url_ = "";

    if (option_unidad == "*") {
        url_ = "http://localhost:3000/tarjetas_trabajadas_all/" + fechaI + "/" + fechaF
    } else {
        url_ = "http://localhost:3000/tarjetas_trabajadas_unidad/" + option_unidad + "/" + fechaI + "/" + fechaF
    }

    $.ajax({
        crossDomain: true,
        url: url_,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        hideSpinner()
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)


        if (json_parse.status_code == 200) {


            for (let i = 0; i < json_parse.datos.length; i++) {

                tabaja_tarjetas_trabajadas += `<tr role="row" class="even">
                <td>${json_parse.datos[i].salida}</td>
                <td>${json_parse.datos[i].vehiculo}</td>
                <td>${json_parse.datos[i].fecha}</td>
                <td>${json_parse.datos[i].ruta}</td>
                <td>${json_parse.datos[i].detalle_ruta}</td>
                <td>${json_parse.datos[i].hora_sali}</td>
                <td>${json_parse.datos[i].hora_lleg}</td>
                <td>${json_parse.datos[i].num_vuelta}</td>
            </tr>`

                //console.log(tabla_salidas)
            }

            Swal.fire(
                'Tarjetas trabajadas',
                'Los datos han sido consultados con exito',
                'success'
            )

            var element = document.getElementById("tbody_tarjeta_trabajadas")
            element.innerHTML = tabaja_tarjetas_trabajadas

        } else if (json_parse.status_code == 300) {
            //alert("SIn datos")

            Swal.fire(
                'Tarjetas',
                'No existen datos disponibles',
                'info'
            )

        } else if (json_parse.status_code == 400) {

            Swal.fire(
                'Error 400',
                json_parse.datos,
                'error'
            )

        } else {

            console.log("Code : " + json_parse.status_code)
                /*****ERROR 500*****/
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
        Swal.fire(
            'Error server 400',
            'Api Rest Fail BackEnd',
            'error'
        )
    })


}


$(document).on("click", "#btn_search_tarjeta_trabajadas", function() {
    let fechaI = document.getElementById("date_tarjeta_trabajadas_inicio").value
    let fechaF = document.getElementById("date_tarjeta_trabajadas_fin").value

    clear_table_tarjetas_trabajadas()

    if (fechaI.length > 0 && fechaF.length > 0) {
        if (fechaI <= fechaF) {
            tarjetas_trabajadas_all(fechaI, fechaF)
        } else {
            Swal.fire(
                'Rango de fechas no válidas',
                'El rango de fechas no es válido',
                'warning'
            )
        }
    } else {
        Swal.fire(
            'Fechas no válida',
            'Por favor ingrese un fecha válida',
            'warning'
        )
    }
})

function clear_table_tarjetas_trabajadas() {
    document.getElementById("tbody_tarjeta_trabajadas").innerHTML = ""
}

$(document).on("change", "#select_buses_global", function() {
    clear_table_tarjetas_trabajadas()
})

$(document).on("change", "#date_tarjeta_trabajadas_inicio", function() {
    clear_table_tarjetas_trabajadas()
})


$(document).on("change", "#date_tarjeta_trabajadas_fin", function() {
    clear_table_tarjetas_trabajadas()
})


$(document).on("click", "#btn_print_tarjetas", function() {
    window.print();
})