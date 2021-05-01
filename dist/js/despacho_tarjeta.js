function tabla_despacho() {
    let tabla_salidas = ""
    let fecha = document.getElementById("date_despacho_tarjeta").value

    let select_unidad = document.getElementById("select_buses_global")
    let option_unidad = select_unidad.options[select_unidad.selectedIndex].value

    var url_ = "http://localhost:3000/salidas_unidad_unidad/" + option_unidad + "/" + fecha + "/" + fecha


    if (fecha.length > 0) {
        showSpinner()

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
                Swal.fire(
                    'Unidad ' + option_unidad,
                    'Los datos consultados con exito',
                    'success'
                )


                for (let i = 0; i < json_parse.datos.length; i++) {
                    let span = ""
                    if (json_parse.datos[i].estado == 3) {

                        span = `<span class="label label-success">Finalizado</span>`
                    } else if (json_parse.datos[i].estado == 2) {
                        span = `<span class="label label-primary">Trabajando</span>`
                    } else {
                        span = `<span class="label label-default">Pendiente</span>`
                    }

                    tabla_salidas += `<tr role="row" class="even">
                    <td>${json_parse.datos[i].id_salida}</td>
                    <td>${span}</td>
                    <td>${json_parse.datos[i].num_vuelta}</td>
                    <td>${json_parse.datos[i].salida}</td>
                    <td>${json_parse.datos[i].llegada}</td>
                    <td>${json_parse.datos[i].frecuencia}</td>
                    <td><div class="btn-group" role="group" aria-label="...">
                    <button type="button" class="btn_see_tarjeta btn btn-primary" id_salida=${json_parse.datos[i].id_salida}><i class="fa fa-eye"></i></button>
                  </div></td>
                </tr>`

                    //console.log(tabla_salidas)
                }


                var element = document.getElementById("tbody_salidas")
                element.innerHTML = tabla_salidas

            } else if (json_parse.status_code == 300) {
                Swal.fire(
                    'Unidad ' + option_unidad,
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
                token_invalited()
            }
        }).fail(function(error) {
            hideSpinner()
            Swal.fire(
                'Error server',
                'Error Api Rest BackEnd',
                'error'
            )
        })
    } else {
        Swal.fire(
            'Fecha no válida',
            'Por favor ingrese una fecha válida',
            'info'
        )
    }


}


function vaciar_tabla_salida_m_tarjeta() {
    document.getElementById("tbody_salidas_detalle").innerHTML = ""
}

function vaciar_tabla_despacho() {
    document.getElementById("tbody_salidas").innerHTML = ""
}

function tabla_despacho_salida_m_tarjeta(salida) {
    showSpinner()

    let tabla_salidas = ""
    let contador = 0;
    var url_ = "http://localhost:3000/tarjeta/" + salida

    //console.log(url_)
    $.ajax({
        crossDomain: true,
        url: url_,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)
        hideSpinner()

        if (json_parse.status_code == 200) {


            for (let i = 0; i < json_parse.datos.length; i++) {

                let falta = ""
                if (json_parse.datos[i].falta != null) {
                    falta = json_parse.datos[i].falta
                } else {
                    falta = "S/N"
                }
                tabla_salidas += `<tr role="row" class="even">
                <td>${contador}</td>
                <td>${json_parse.datos[i].cod_control}</td>
                <td>${json_parse.datos[i].detalle_control}</td>
                <td>${json_parse.datos[i].hora_prog_sali}</td>
                <td>${json_parse.datos[i].hora_marc_sali}</td>
                <td>${falta}</td>
            </tr>`

                //console.log(tabla_salidas)
                contador++
            }


            location.href = "#example1"

            Swal.fire(
                'Tarjeta ' + salida,
                'Los datos consultados con exito',
                'success'
            )

            document.getElementById("tbody_salidas_detalle").innerHTML = tabla_salidas

        } else if (json_parse.status_code == 300) {
            Swal.fire(
                'Tarjeta ' + salida,
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
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
        alert(error)
    })
}

$(document).on("click", "#btn_search_despacho_tarjeta", function() {
    console.log("click")
    vaciar_tabla_salida_m_tarjeta()
    tabla_despacho()
})

$(document).on("click", ".btn_see_tarjeta", function() {

    var btn_see_detalle_tarjeta = $(this)[0]
        //console.log("CLICK" + btn_see_detalle_tarjeta.getAttribute("id_salida"))
    tabla_despacho_salida_m_tarjeta(btn_see_detalle_tarjeta.getAttribute("id_salida"))
})

$(document).on("change", "#select_buses_global", function() {
    vaciar_tabla_salida_m_tarjeta()
    vaciar_tabla_despacho()
})

$(document).on("change", "#date_despacho_tarjeta", function() {
    vaciar_tabla_salida_m_tarjeta()
    vaciar_tabla_despacho()
})