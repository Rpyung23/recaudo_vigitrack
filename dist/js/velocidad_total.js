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

function all_historial_velocidad(unidad, velocidad, fechaI, fechaF, bandera_all) {

    showSpinner()

    clearTablaSalidas()


    let tbody_salidas = ""

    let url_ = ""

    if (bandera_all) {
        url_ = "http://localhost:3000/velocidad_total_all/" + velocidad + "/" + fechaI + "/" + fechaF ///todas los buses 
    } else {
        url_ = "http://localhost:3000/velocidad_total_unidad/" + unidad + "/" + velocidad + "/" + fechaI + "/" + fechaF
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


        Swal.fire(
            'Bus numero ' + unidad,
            'Datos consultados con exito!',
            'success'
        )


        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {

                tbody_salidas += `<tr role="row" class="even">
                <td>${json_parse.datos[i].unidad}</td>
                <td>${json_parse.datos[i].tarjeta}</td>
                <td>${json_parse.datos[i].hora}</td>
                <td>${json_parse.datos[i].lat}  ${json_parse.datos[i].lng}</td>
                <td>${json_parse.datos[i].rumbo}</td>
                <td>${json_parse.datos[i].velocidad}</td>
            </tr>`
            }

            //console.log(select_buses)
            document.getElementById("tbody_salidas_velocidad").innerHTML = tbody_salidas

        } else if (json_parse.status_code == 300) {
            Swal.fire(
                'Bus numero ' + unidad,
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



$(document).on("click", ".item-bus", function() {
    var element = $(this)[0].getAttribute("bus")

    document.getElementById("input_unidad_").value = element

    clearTablaSalidas()
})


$(document).on("click", "#btn_search_tarjetas_velocidad", function() {

    var unidad = document.getElementById("input_unidad_").value
    var fecha = document.getElementById("date_despacho_tarjeta").value
    var fechaF = document.getElementById("date_velocidadFechaFinal").value
    var velocidad = document.getElementById("input_velocidad_maxima").value

    clearTablaSalidas()

    if (fecha.length > 0 && fechaF.length > 0) {
        if (fecha <= fechaF) {
            if (unidad > 0 || unidad == "*") {


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
                        if (unidad == "*") {
                            all_historial_velocidad(unidad, velocidad, fecha, fechaF, true)
                        } else {
                            all_historial_velocidad(unidad, velocidad, fecha, fechaF, false)
                        }
                    }
                })





            } else {
                Swal.fire(
                    'Bus numero ' + unidad + ' o campo vacío',
                    'Por favor seleccionar un Bus',
                    'error'
                )
            }
        } else {
            Swal.fire(
                'Fechas no válidas',
                'Rango de fechas no validas',
                'error'
            )
        }
    } else {
        Swal.fire(
            'Sin Fechas',
            'Por favor ingresar las fechas a bucar',
            'warning'
        )
    }
})



function clearTablaSalidas() {
    document.getElementById("tbody_salidas_velocidad").innerHTML = " "
}


$(document).on("change", "#date_despacho_tarjeta", function() {
    clearTablaSalidas()
})

$(document).on("change", "#date_velocidadFechaFinal", function() {
    clearTablaSalidas()
})