function consolidado_vueltas(fecha) {
    var th_body = ""
    $.ajax({
        url: "http://localhost:3000/consolidado_vuelta/" + fecha + "/" + fecha,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(datos) {
        let json_string = JSON.stringify(datos)
        let json_parse = JSON.parse(json_string)


        if (json_parse.status_code == 200) {
            for (var i = 0; i < json_parse.datos.length; i++) {
                var valor = json_parse.datos[i].valor
                if (valor == null) {
                    valor = "S/N"
                } else {
                    valor = "$ " + parseFloat(json_parse.datos[i].valor).toFixed(2)
                }
                th_body += `<tr role="row" class="even">
                    <td>${json_parse.datos[i].unidad}</td>
                    <td>${json_parse.datos[i].tarjeta}</td>
                    <td>${json_parse.datos[i].vuelta}</td>
                    <td>${json_parse.datos[i].ruta}</td>
                    <td>${json_parse.datos[i].salida_h}</td>
                    <td><strong>${valor}</strong></td>
                </tr>`
            }

            document.getElementById("tbody_consolidado_vueltas").innerHTML = th_body

        } else if (json_parse.status_code == 300) {
            sweetAlert("Datos vacios", "Lo sentimos no existen datos disponibles", "info")
        } else {
            sweetAlert("Error 400", json_parse.datos, error)
        }


    }).fail(function(error) {
        alert(error)
    })
}


function sweetAlert(title, subtitle, boton) {
    Swal.fire(
        title,
        subtitle,
        boton
    )
}


function clear_table() {
    document.getElementById("tbody_consolidado_vueltas").innerHTML = " "
}

$(document).on("change", "#date_consolidado_vueltas", function() {
    clear_table()
})

$(document).on("click", "#btn_search_consolidado_vueltas", function() {
    var fecha = document.getElementById("date_consolidado_vueltas").value

    console.log(fecha)
    if (fecha.length > 0) {
        clear_table()
        consolidado_vueltas(fecha)
    } else {
        sweetAlert("Error de Fecha", "Fecha no válida", "error")
    }

})



$(document).on("click", "#btn_print_tarjetas_unidades", function() {
    window.print()
})