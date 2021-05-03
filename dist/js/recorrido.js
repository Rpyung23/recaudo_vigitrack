let datos_recorrido = []
let url_aux = ""

function recorrido() {
    showSpinner()

    let contador = 1;

    let tabla_recorrido = ""
    let fecha = document.getElementById("date_despacho_tarjeta").value

    let select_unidad = document.getElementById("select_buses_global")
    let option_unidad = select_unidad.options[select_unidad.selectedIndex].value

    let horaI = document.getElementById("time_recorrido_start").value
    let horaF = document.getElementById("time_recorrido_end").value

    if (fecha.length > 0) {
        if (horaF > horaI) {
            var url_ = "http://localhost:3000/recorrido/" + option_unidad + "/" + fecha + "/" + horaI + "/" + horaF
            url_aux = url_
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

                var json_string = JSON.stringify(json_response)
                var json_parse = JSON.parse(json_string)


                if (json_parse.status_code == 200) {

                    datos_recorrido = []

                    for (let i = 0; i < json_parse.datos.length; i++) {

                        tabla_recorrido += `<tr role="row" class="even">
                        <td>${contador}</td>
                        <td>${json_parse.datos[i].id_vehi}</td>
                        <td>${json_parse.datos[i].fecha}</td>
                        <td>${json_parse.datos[i].lat}</td>
                        <td>${json_parse.datos[i].lng}</td>
                        <td>${json_parse.datos[i].grados}</td>
                        <td>${json_parse.datos[i].velocidad}</td>
                    </tr>`


                        var obj = {
                            unidad: json_parse.datos[i].id_vehi,
                            fecha: json_parse.datos[i].fecha,
                            lat: json_parse.datos[i].lat,
                            lng: json_parse.datos[i].lng,
                            vel: json_parse.datos[i].velocidad
                        }
                        datos_recorrido.push(obj)
                        contador++
                    }

                    Swal.fire(
                        'Unidad ' + option_unidad,
                        'Los datos consultados con exito',
                        'success'
                    )

                    var element = document.getElementById("tbody_recorrido")
                    element.innerHTML = tabla_recorrido

                } else if (json_parse.status_code == 300) {

                    Swal.fire(
                        'Unidad ' + option_unidad,
                        'No existen datos disponibles',
                        'info'
                    )

                } else if (json_parse.status_code == 400) {
                    Swal.fire(
                        'Unidad ' + option_unidad,
                        json_parse.datos,
                        'error'
                    )

                } else {
                    token_invalited()
                }
            }).fail(function(error) {
                hideSpinner()

                Swal.fire(
                    'Error 400',
                    'Problemas api-rest',
                    'error'
                )
            })
        } else {
            hideSpinner()
            Swal.fire(
                'Formato de fechas no válido',
                'Por favor verificar el orden de las fechas',
                'warning'
            )
        }
    } else {
        hideSpinner()
        Swal.fire(
            'Fecha no válida',
            'Por favor ingrese un fecha válida',
            'warning'
        )
    }
}


function clear_table_recorrido() {
    document.getElementById("tbody_recorrido").innerHTML = ""
}

$(document).on("click", "#btn_search_despacho_tarjeta", function() {
    recorrido();
})

function clearTable_recorrido() {
    var element = document.getElementById("tbody_recorrido")
    element.innerHTML = ""
}

$(document).on("change", "#date_despacho_tarjeta", function() {
    clearTable_recorrido()
})


$(document).on("change", "#time_recorrido_start", function() {
    clearTable_recorrido()
})

$(document).on("change", "#time_recorrido_end", function() {
    clearTable_recorrido()
})


$(document).on("click", "#btn_draw_on_map", function() {
    /*var crypt = CryptoJS.MD5(JSON.stringify(datos_recorrido))
    var decrypt = CryptoJS.AES.decrypt("MD5", crypt)
    console.log(decrypt)*/
    var locatio_ = window.open("../../pages/map/mapa.html?datos=" + url_aux, "_blank")

    locatio_.focus()
})