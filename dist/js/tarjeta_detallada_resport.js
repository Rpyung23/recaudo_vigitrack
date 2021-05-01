let btn_print = document.getElementById("btn_print_tarjetas_unidades")

function report_tarjeta_detallada(url_) {
    showSpinner()

    let tbody = " "
    let pagado = 0
    let pendiente = 0

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

        if (json_parse.status_code == 200)

        {

            sweetAlert("Tarjeta Detallada", "Datos consultados con éxito !", "success")


            for (let i = 0; i < json_parse.datos.length; i++) {

                pendiente += parseFloat(json_parse.datos[i].PrecioTarj)

                var cont = i
                tbody += `<tr role="row" class="even">
                  <td>${cont++}</td>
                  <td>${json_parse.datos[i].vehiculo}</td>
                  <td>${json_parse.datos[i].NumRecivo}</td>
                  <td>${json_parse.datos[i].fecha_creacion_tarjeta}</td>
                  <td>${json_parse.datos[i].FechaPagoTarj}</td>
                  <td>${json_parse.datos[i].PrecioTarj}</td>
                  <td>${json_parse.datos[i].Descrip}</td>
                </tr>`
            }

            document.getElementById("tbody_tarjetas_detallada").innerHTML = tbody

            document.getElementById("val_txtpendiente").innerHTML = new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(pendiente) //pendiente.toFixed(2) + " $"

        } else if (json_parse.status_code == 300) {
            sweetAlert("Sin datos", "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
                //alert("SQL" + json_parse.datos)
        } else {
            token_invalited()
        }

    }).fail(function(error) {
        hideSpinner()
        sweetAlert("Error 400", "Error Api Rest BackEnd", "error")
    })
}

function clear_table() {
    document.getElementById("tbody_tarjetas_detallada").innerHTML = " "
    document.getElementById("val_txtpendiente").innerHTML = "$ 0.00"
}


$(document).on("change", "#date_tarjeta_unidades_inicio", function() {
    clear_table()
})


$(document).on("change", "#date_tarjeta_unidades_fin", function() {
    clear_table()
})


btn_print.addEventListener("click", function() {
    window.print()
})


$(document).on("click", "#btn_search_tarjeta_unidades", function() {

    var fechaI = document.getElementById("date_tarjeta_unidades_inicio").value
    var fechaF = document.getElementById("date_tarjeta_unidades_fin").value
        /*var check_penalidad = document.getElementById("check_penalidad")
        var select_unidad = document.getElementById("select_buses_global")*/
        /*var unidad = select_unidad.options[select_unidad.selectedIndex].value*/

    if (fechaF.length > 0 && fechaI.length > 0) {
        if (fechaF >= fechaI) {
            /*if (unidad != null && unidad.length > 0) {
            if (unidad == "*") /**Global**/ //{
            /*   if (check_penalidad.checked) /**Solo con penalidad**/ //{
            /*    var url_ = "http://localhost:3000/tarjeta_unidad_all_cp/" + fechaI + "/" + fechaF;
                    } else {
                        var url_ = "http://localhost:3000/tarjeta_unidad_all_sp/" + fechaI + "/" + fechaF;
                    }
                } else {
                    if (check_penalidad.checked) /**Solo con penalidad**/ //{
            /*var url_ = "http://localhost:3000/tarjeta_unidad_unidad_cp/" + unidad + "/" + fechaI + "/" + fechaF;
                    } else {
                        var url_ = "http://localhost:3000/tarjeta_unidad_unidad_sp/" + unidad + "/" + fechaI + "/" + fechaF;
                    }
                }*/
            var url_ = "http://localhost:3000/tarjeta_detallada/" + fechaI + "/" + fechaF
            report_tarjeta_detallada(url_)
                /*} else {
                    sweetAlert("Unidad no válida", "Sin unidad seleccionada", "error")
                }*/

        } else {
            sweetAlert("Rango de Fechas", "Fechas no válidas", "error")
        }
    } else {

        sweetAlert("Fechas no válidas", "Por favor ingrese unas fechas válidas", "warning")
    }

})

function sweetAlert(title, subtitle, boton) {
    Swal.fire(
        title,
        subtitle,
        boton
    )
}