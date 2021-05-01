function getFecha_dd_mm_yyyy() {

    var fecha_ = new Date()


    var dia = fecha_.getDate();

    var mes = fecha_.getUTCMonth();



    if (dia < 10) {
        dia = "0" + dia;
    }
    if (mes < 10) {
        mes = "0" + mes;
    }

    return (fecha_.getFullYear() + "-" + mes + "-" + dia)
}

function all_historial_velocidad(salida, unidad, velocidad, fecha) {
    showSpinner()

    clearTablaVelocidadHistorial()
    let tbody_salidas = ""

    var url_ = "http://localhost:3000/velocidad_historial/" + salida + "/" + velocidad + "/" + fecha + "/" + unidad
        //console.log(url_)

    $.ajax({
        crossDomain: true,
        url: url_,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {

        hideSpinner()


        Swal.fire(
            'Salida N° ' + salida,
            'Datos consultados con exito!',
            'success'
        )


        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {


                tbody_salidas += `<tr role="row" class="even">
                <td>${salida}</td>
                <td>${json_parse.datos[i].hora}</td>
                <td>${json_parse.datos[i].lat}</td>
                <td>${json_parse.datos[i].lng}</td>
                <td>${json_parse.datos[i].rumbo}</td>
                <td>${json_parse.datos[i].velocidad}</td>
            </tr>`
            }

            //console.log(select_buses)
            document.getElementById("tbody_historial_velocidad").innerHTML = tbody_salidas

        } else if (json_parse.status_code == 300) {
            Swal.fire(
                'Salida N° ' + salida,
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
        console.log(error)
    })
}


function all_salidas_por_unidad(unidad, fecha) {
    let tbody_salidas = ""

    showSpinner()

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/tarjetas_trabajadas_unidad/" + unidad + "/" + fecha + "/" + fecha,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(json_response) {

        hideSpinner()

        Swal.fire(
            'Unidad número ' + unidad,
            'Datos consultados con exito!',
            'success'
        )

        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {


                tbody_salidas += `<tr role="row" class="even tr_velocidad_tarjeta">
                <td>${json_parse.datos[i].salida}</td>
                <td>${json_parse.datos[i].hora_sali}</td>
                <td>${json_parse.datos[i].hora_lleg}</td>
                <td>${json_parse.datos[i].detalle_ruta}</td>
                <td>${0}</td>
                <td><div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn_see_tarjeta btn btn-primary" id_salida=${json_parse.datos[i].salida}><i class="fa fa-eye"></i></button>
              </div></td>
            </tr>`
            }

            //console.log(select_buses)
            document.getElementById("tbody_salidas_velocidad").innerHTML = tbody_salidas

        } else if (json_parse.status_code == 300) {
            Swal.fire(
                'Unidad número' + unidad,
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
    })
}



$(document).on("click", ".item-bus", function() {
    var element = $(this)[0].getAttribute("bus")

    document.getElementById("input_unidad_").value = element

    clearTablaSalidas()
    clearTablaVelocidadHistorial()
})


$(document).on("click", "#btn_search_tarjetas_velocidad", function() {

    var unidad = document.getElementById("input_unidad_").value
    var fecha = document.getElementById("date_despacho_tarjeta").value
    var velocidad = document.getElementById("input_velocidad_maxima").value

    clearTablaSalidas()
    clearTablaVelocidadHistorial()

    if (fecha.length > 0) {
        if (unidad > 0) {


            Swal.fire({
                title: 'Unidad ' + unidad,
                text: "Fecha : " + fecha + " Velocidad : " + velocidad + "",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Buscar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    all_salidas_por_unidad(unidad, fecha)
                }
            })


        } else {
            Swal.fire(
                'Bus vacío',
                'Por favor seleccione una Unidad',
                'warning'
            )
        }
    } else {
        Swal.fire(
            'Fecha no válida',
            'Por favor ingrese una fecha válida',
            'warning'
        )
    }
})



$(document).on("click", ".tr_velocidad_tarjeta", function() {

    var unidad = document.getElementById("input_unidad_").value
    var fecha = document.getElementById("date_despacho_tarjeta").value
    var velocidad = document.getElementById("input_velocidad_maxima").value


    var element = $(this)[0].children
    var salida = element[0].innerHTML

    all_historial_velocidad(salida, unidad, velocidad, fecha)

})


function clearTablaSalidas() {
    document.getElementById("tbody_salidas_velocidad").innerHTML = " "
}

function clearTablaVelocidadHistorial() {
    document.getElementById("tbody_historial_velocidad").innerHTML = " "
}


$(document).on("change", "#date_despacho_tarjeta", function() {
    clearTablaSalidas()
    clearTablaVelocidadHistorial()
})

//localhost:3000/tarjetas_trabajadas_unidad/uambatena1198/3/2021-03-25/2021-03-25