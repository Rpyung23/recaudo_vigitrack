let btn_print = document.getElementById("btn_print_tarjetas_unidades")

function report_api_all_sp(url_) {
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

        //console.log(datos)
        if (json_parse.status_code == 200) {
            sweetAlert("Datos consultados", "Datos consultados con exito", "success")

            for (let i = 0; i < json_parse.datos.length; i++) {
                var falta = json_parse.datos[i].falta

                if (falta == null) {
                    falta = "S/N"
                }

                tbody += `<tr role="row" class="even">
                <td>${json_parse.datos[i].salida}</td>
                <td>${json_parse.datos[i].vehiculo}</td>
                <td>${json_parse.datos[i].ruta_detalle}</td>
                <td>${json_parse.datos[i].num_vuelta}</td>
                <td>${json_parse.datos[i].horaSali}</td>
                <td>${json_parse.datos[i].control_detalle}</td>
                <td>${json_parse.datos[i].hora_prog_sali}</td>
                <td>${json_parse.datos[i].hora_marc_sali}</td>
                <td>${falta}</td>
                <td>${parseFloat(json_parse.datos[i].penalidad)}</td>
            </tr>`
            }

            document.getElementById("tbody_tarjetas_unidades").innerHTML = tbody

        } else if (json_parse.status_code == 300) {
            sweetAlert("Datos vacíos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {

            sweetAlert("Error 400", json_parse.datos, "error")

        } else {
            token_invalited()
        }

    }).fail(function(error) {
        hideSpinner()
        alert(error)
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

    if (fechaF.length > 0 && fechaI.length > 0) {

        if (fechaF >= fechaI) {

            if (unidad != null && unidad.length > 0) {
                //*if (unidad == "*") /**Global**/ {
                /*    if (check_penalidad.checked) /**Solo con penalidad**/
                /* {
                            /*        var url_ = "http://localhost:3000/tarjeta_unidad_all_cp/" + fechaI + "/" + fechaF;
                                } else {
                                    var url_ = "http://localhost:3000/tarjeta_unidad_all_sp/" + fechaI + "/" + fechaF;
                                }
                            } else {
                              /*  if (check_penalidad.checked) /**Solo con penalidad**/
                /* {
                              /*      var url_ = "http://localhost:3000/tarjeta_unidad_unidad_cp/" + unidad + "/" + fechaI + "/" + fechaF;
                                } else {
                                    var url_ = "http://localhost:3000/tarjeta_unidad_unidad_sp/" + unidad + "/" + fechaI + "/" + fechaF;
                                }
                            }*/

                if (check_penalidad.checked) {
                    var url_ = "http://localhost:3000/tarjetas_controles_sp/" + fechaI + "/" + fechaF + "/" + unidad;

                } else {
                    var url_ = "http://localhost:3000/tarjetas_controles_all/" + fechaI + "/" + fechaF + "/" + unidad;
                }

                report_api_all_sp(url_)
            } else {
                sweetAlert("Unidad no válida", "Sin unidad seleccionada", "error")
            }
        } else {
            sweetAlert("Rango de Fechas", "Fechas no válidas", "error")
        }


    } else {

        sweetAlert("Fechas no válidas", 'Por favor ingrese unas fechas válidas', "warning")
    }

})

function sweetAlert(title, subtitle, boton) {
    Swal.fire(
        title,
        subtitle,
        boton
    )
}