function tabla_despacho() {
    let tabla_salidas = ""
    let fecha = document.getElementById("date_despacho_tarjeta").value

    let select_unidad = document.getElementById("select_buses_global")
    let option_unidad = select_unidad.options[select_unidad.selectedIndex].value

    var url_ = "http://localhost:3000/salidas_unidad_unidad/uambatena1198/" + option_unidad + "/" + fecha + "/" + fecha

    console.log(url_)
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

            Swal.fire(
                'Unidad ' + option_unidad,
                'Los datos consultados con exito',
                'success'
            )

            var element = document.getElementById("tbody_salidas")
            element.innerHTML = tabla_salidas

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {
        alert(error)
    })
}


function vaciar_tabla_salida_m_tarjeta() {
    document.getElementById("tbody_salidas_detalle").innerHTML = ""
}

function vaciar_tabla_despacho() {
    document.getElementById("tbody_salidas").innerHTML = ""
}

function tabla_despacho_salida_m_tarjeta(salida) {

    let tabla_salidas = ""
    let contador = 0;
    var url_ = "http://localhost:3000/tarjeta/uambatena1198/" + salida

    //console.log(url_)
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

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {
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