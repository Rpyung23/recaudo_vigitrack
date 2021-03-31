//tbody_tarjeta_trabajadas


function tarjetas_trabajadas_all(fechaI, fechaF) {

    let tabaja_tarjetas_trabajadas = ""


    let select_unidad = document.getElementById("select_buses_global")
    let option_unidad = select_unidad.options[select_unidad.selectedIndex].value

    var url_ = "";

    if (option_unidad == "*") {
        url_ = "http://localhost:3000/tarjetas_trabajadas_all/uambatena1198/" + fechaI + "/" + fechaF
    } else {
        url_ = "http://localhost:3000/tarjetas_trabajadas_unidad/uambatena1198/" + option_unidad + "/" + fechaI + "/" + fechaF
    }

    $.ajax({
        crossDomain: true,
        url: url_,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "GET"
    }).done(function(json_response) {
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

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {
        alert(error)
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
                'Error de datos',
                'El rango de fechas no es válido',
                'error'
            )
        }
    } else {
        Swal.fire(
            'Existen datos vacios',
            'El rango de fechas no es válido',
            'error'
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