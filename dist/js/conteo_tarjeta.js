function api_conteo_tarjetas(url, salida) {
    //console.log(url)

    showSpinner()

    $.ajax({
        crossDomain: true,
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(datos) {
        hideSpinner()
        let json_String = JSON.stringify(datos)
        let json_parse = JSON.parse(json_String)

        if (json_parse.status_code == 200) {


            Swal.fire(
                'Conteo salida ' + salida,
                'Los datos consultados con exito',
                'success'
            )


            let totSubida = 0
            let totBajada = 0
            let Error = 0

            let th_body = ""
            for (var i = 0; i < json_parse.datos.length; i++) {

                var subida1 = json_parse.datos[i].subida1
                var subida2 = json_parse.datos[i].subida2 == null ? 0 : json_parse.datos[i].subida2
                var subida3 = json_parse.datos[i].subida3 == null ? 0 : json_parse.datos[i].subida3
                var bajada1 = json_parse.datos[i].bajada1
                var bajada2 = json_parse.datos[i].bajada2 == null ? 0 : json_parse.datos[i].bajada2
                var bajada3 = json_parse.datos[i].bajada3 == null ? 0 : json_parse.datos[i].bajada3

                th_body += `<tr role="row" class="even">
                <td>${salida}</td>
                <td>${subida1}</td>
                <td>${subida2}</td>
                <td>${subida3}</td>
                <td>${bajada1}</td>
                <td>${bajada2}</td>
                <td>${bajada3}</td>
                </tr>`

                totSubida += (subida1 + subida2 + subida3)
                totBajada += (bajada1 + bajada2 + bajada3)
                Error = json_parse.datos[i].error
            }

            var th_body_conteo_info = `<tr role="row" class="even">
            <td><strong>${totSubida}</strong></td>
            <td><strong>${totBajada}</strong></td>
            <td>${totSubida-totBajada}</td>
            <td><strong>${100-Error}</strong></td>
            <td><strong>${Error}</strong></td>
            </tr>`

            document.getElementById("tbody_conteo").innerHTML = th_body
            document.getElementById("tbody_conteo_detalles_errores").innerHTML = th_body_conteo_info


            location.href = "#table_conteo_result"

        } else if (json_parse.status_code == 300) {
            sweetAlert("Conteo salida " + salida, "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }

    }).fail(function(error) {
        hideSpinner()
        sweetAlert("Error 400", "Fallo Api Rest BackEnd", "error")
    })
}


function tabla_despacho(url, unidad) {

    showSpinner()

    let tabla_salidas = ""
    $.ajax({
        crossDomain: true,
        url: url,
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
                'Unidad ' + unidad,
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
                <td>${json_parse.datos[i].salida}</td>
                <td>${json_parse.datos[i].llegada}</td>
                <td>${json_parse.datos[i].frecuencia}</td>
                <td>${json_parse.datos[i].num_vuelta}</td>
                <td>${span}</td>
                <td><div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn_see_conteo_tarjeta btn btn-primary" id_salida=${json_parse.datos[i].id_salida} unidad=${unidad}><i class="fa fa-eye"></i></button>
              </div></td>
            </tr>`

                //console.log(tabla_salidas)
            }

            var element = document.getElementById("tbody_salidas")
            element.innerHTML = tabla_salidas

        } else if (json_parse.status_code == 300) {
            sweetAlert("Unidad " + unidad, "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }
    }).fail(function(error) {
        hideSpinner()
        sweetAlert("Error 400", "Fallo Api Rest BackEnd", "error")
    })
}


$(document).on("click", ".item-bus", function() {
    var element = $(this)[0].getAttribute("bus")

    document.getElementById("input_unidad_").value = element

    clearTables()
})


$(document).on("click", "#btn_search_tarjetas_conteo", function() {

    var unidad = document.getElementById("input_unidad_").value

    var fechaI = document.getElementById("date_conteo_tarjeta_inicio").value


    var url = "http://localhost:3000/salidas_unidad_unidad/" + unidad + "/" + fechaI + "/" + fechaI


    if (fechaI.length > 0) {
        if (unidad.length > 0) {
            tabla_despacho(url, unidad)

        } else {
            sweetAlert("Sin Unidad", "Por favor seleccione una Unidad en el <strong>Listado de Buses</strong>", "warning")
        }
    } else {
        sweetAlert("Fecha no válida", "Por favor ingrese una fecha válida", "warning")
    }



})


$(document).on("click", ".btn_see_conteo_tarjeta", function() {
    var element = $(this)[0]
    var salida = element.getAttribute("id_salida")
    var unidad = element.getAttribute("unidad")

    var url = "http://localhost:3000/conteo_vueltas/" + salida + "/" + unidad
    api_conteo_tarjetas(url, salida)


})

$(document).on("change", "#date_conteo_tarjeta_inicio", function() {
    clearTables()
})

function clearTables() {
    document.getElementById("tbody_salidas").innerHTML = ""
    document.getElementById("tbody_conteo").innerHTML = ""
    document.getElementById("tbody_conteo_detalles_errores").innerHTML = ""
}

function sweetAlert(title, subtitle, icon) {
    Swal.fire(
        title,
        subtitle,
        icon
    )
}