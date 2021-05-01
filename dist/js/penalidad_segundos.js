let btn_print = document.getElementById("btn_print_tarjetas_unidades")

function report_api_all_sp(url_, unidad) {
    showSpinner()

    let tbody = " "

    //console.log(url_)

    $.ajax({
        url: url_,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(datos) {
        hideSpinner()

        var json_string = JSON.stringify(datos)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            sweetAlert('Penalidad por segundos Unidad ' + unidad, 'Datos consultados con éxito', 'success')

            for (let i = 0; i < json_parse.datos.length; i++) {

                var min = "S/N"
                var seg = "S/N"

                if (json_parse.datos[i].min != null) { min = json_parse.datos[i].min }

                if (json_parse.datos[i].seg != null) { seg = json_parse.datos[i].seg }

                tbody += `<tr role="row" class="even">
                <td>${json_parse.datos[i].salida}</td>
                <td>${json_parse.datos[i].unidad}</td>
                <td>${json_parse.datos[i].ruta}</td>
                <td>${json_parse.datos[i].vuelta}</td>
                <td>${json_parse.datos[i].fecha_hora}</td>
                <td>${json_parse.datos[i].control}</td>
                <td>${json_parse.datos[i].horaProg}</td>
                <td>${json_parse.datos[i].horaMarc}</td>
                <td><strong>${min}</strong></td>
                <td><strong>${seg}</strong></td>
            </tr>`
            }

            document.getElementById("tbody_tarjetas_unidades").innerHTML = tbody

        } else if (json_parse.status_code == 300) {
            sweetAlert('Penalidad por segundos Unidad ' + unidad, 'No existen datos disponibles', 'info')
        } else if (json_parse.status_code == 400) {
            sweetAlert('Error 400', json_parse.datos, 'error')
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
        sweetAlert('Error 400', 'Error ApiRest BackEnd', 'error')
            //alert(error)
    })
}

function clear_table() {
    document.getElementById("tbody_tarjetas_unidades").innerHTML = " "
}


$(document).on("change", "#date_tarjeta_unidades_inicio", function() {
    clear_table()
})


$(document).on("change", "#date_tarjeta_unidades_fin", function() {
    clear_table()
})

$(document).on("change", "#check_penalidad", function() {
    clear_table()
})

$(document).on("change", "#select_buses_global", function() {
    clear_table()
})

btn_print.addEventListener("click", function() {
    window.print()
})


$(document).on("click", "#btn_search_tarjeta_unidades", function() {
    var fechaI = document.getElementById("date_tarjeta_unidades_inicio").value
    var fechaF = document.getElementById("date_tarjeta_unidades_fin").value
    var check_penalidad = document.getElementById("check_penalidad")
    var select_unidad = document.getElementById("select_buses_global")
    var unidad = select_unidad.options[select_unidad.selectedIndex].value

    if (fechaF.length > 0 && fechaI.length > 0 && fechaF >= fechaI) {
        if (unidad != null && unidad.length > 0) {
            if (unidad == "*") /**Global**/ {
                if (check_penalidad.checked) /**Solo con penalidad**/ {
                    var url_ = "http://localhost:3000/penalidad_segundos_all/" + fechaI + "/" + fechaF + "/1";
                } else {
                    var url_ = "http://localhost:3000/penalidad_segundos_all/" + fechaI + "/" + fechaF + "/0";
                }
            } else {
                if (check_penalidad.checked) /**Solo con penalidad**/ {
                    var url_ = "http://localhost:3000/penalidad_segundos_unidad/" + unidad + "/" + fechaI + "/" + fechaF + "/1"
                } else {
                    var url_ = "http://localhost:3000/penalidad_segundos_unidad/" + unidad + "/" + fechaI + "/" + fechaF + "/0"
                }
            }

            report_api_all_sp(url_, unidad)
        } else {
            sweetAlert("Unidad no válida", "Sin unidad seleccionada", "error")
        }
    } else {

        sweetAlert("Rango de Fechas", "Fechas no válidas", "error")
    }

})

function sweetAlert(title, subtitle, boton) {
    Swal.fire(
        title,
        subtitle,
        boton
    )
}