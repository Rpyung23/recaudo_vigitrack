function llenar_tbody_conteo_marcaciones(date) {
    let tbody_conteo_marcaciones = ""

    let contador = 1
    showSpinner()

    let url_ = "http://localhost:3000/conteo_marcaciones_tabla/" + date;
    //console.log(url_)

    $.ajax({
        crossDomain: true,
        url: url_,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")

    }).done(function(datos) {
        hideSpinner()


        document.getElementById("tbody_conteo_marcaciones").innerHTML = ""

        var json_string = JSON.stringify(datos)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            for (let i = 0; i < json_parse.datos.length; i++) {
                tbody_conteo_marcaciones += `<tr role="row"  ruta="${json_parse.datos[i].detalle_ruta}" vuelta=${json_parse.datos[i].vuelta} date_time="${json_parse.datos[i].fecha_hora}" class="td_body_conteo_marcacion even"  data-toggle="modal" data-target="#exampleModalCenter">
                    <td>${contador}</td>
                    <td>${json_parse.datos[i].vehiculo}</td>
                    <td>${json_parse.datos[i].salida}</td>
                    <td>${json_parse.datos[i].hora}</td>
                    <td>${json_parse.datos[i].conteo_control}</td>
                    <td>${json_parse.datos[i].sin_marcar}</td>
                    <td><div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn_see_tarjeta btn btn-primary" id_salida=${json_parse.datos[i].id_salida}><i class="far fa-file-pdf"></i></button>
              </div></td>
                </tr>`
                contador++
            }

            document.getElementById("tbody_conteo_marcaciones").innerHTML = tbody_conteo_marcaciones

            Swal.fire(
                'Conteo Marcaciones',
                'Los datos consultados con exito',
                'success'
            )


        } else if (json_parse.status_code == 300) {
            //alert("SIn datos")

            Swal.fire(
                'Conteo Marcaciones',
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

            //console.log("Code : " + json_parse.status_code)
            /*****ERROR 500*****/
            token_invalited()
        }


    }).fail(function(error) {
        hideSpinner()

        Swal.fire(
            'Error 400',
            'Problemas api-rest BackEnd',
            'error'
        )

    })
}

function llenar_tbody_conteo_marcaciones_pdf(salida) {
    showSpinner()

    let tbody_conteo_marcaciones = ""
    document.getElementById("tbody_conteo_marcaciones_pdf").innerHTML = tbody_conteo_marcaciones
    let contador = 1


    let url_ = "http://localhost:3000/conteo_marcaciones_pdf/" + salida;
    //console.log(url_)

    $.ajax({
        crossDomain: true,
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
            Swal.fire(
                'Salida #' + salida,
                'Datos consultados con éxito !',
                'success'
            )

            for (let i = 0; i < json_parse.datos.length; i++) {
                let falta = "S/N"
                if (json_parse.datos[i].falta != null) {
                    falta = json_parse.datos[i].falta
                }
                tbody_conteo_marcaciones += `<tr role="row" class="even">
                    <td>${contador}</td>
                    <td>${json_parse.datos[i].relog}</td>
                    <td>${json_parse.datos[i].hora_prog}</td>
                    <td>${json_parse.datos[i].hora_marc}</td>
                    <td>${falta}</td>
                    <td>${parseFloat(json_parse.datos[i].valor)}</td>
                </tr>`
                contador++
            }

            document.getElementById("tbody_conteo_marcaciones_pdf").innerHTML = tbody_conteo_marcaciones


        } else if (json_parse.status_code == 300) {
            //alert("SIn datos")

            Swal.fire(
                'Salida ' + salida,
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

            console.log("Code : " + json_parse.status_code)
                /*****ERROR 500*****/
            token_invalited()
        }

    }).fail(function(error) {
        hideSpinner()
        Swal.fire(
            'Error server 400',
            'Api Rest Fail BackEnd',
            'error'
        )
    })
}



$(document).on("click", "#btn_search_conteo_marcaciones", function() {
    let date = document.getElementById("date_conteo_marcaiones").value
        //console.log("FECHA : " + date)
    if (date != null && date.length > 0) {
        llenar_tbody_conteo_marcaciones(date)
    } else {
        Swal.fire(
            'Error de datos',
            'Fecha no válida',
            'error'
        )
    }
})


$(document).on("click", ".td_body_conteo_marcacion", function() {
    var element_global = $(this)[0]
    var element = element_global.children

    //var ruta = element[1].innerHTML
    var unidad = element[1].innerHTML
    var salida = element[2].innerHTML
        //var vuelta = element[4].innerHTML
        //var fecha_hora = element[5].innerHTML

    document.getElementById("title_modal_ruta").innerHTML = element_global.getAttribute("ruta")
    document.getElementById("title_modal_unidad").innerHTML = "#" + unidad
    document.getElementById("title_modal_salida").innerHTML = "#" + salida
    document.getElementById("title_modal_vuelta").innerHTML = element_global.getAttribute("vuelta")
    document.getElementById("title_modal_fecha_hora").innerHTML = element_global.getAttribute("date_time")

    llenar_tbody_conteo_marcaciones_pdf(salida)
        //console.log(element)

})


$(document).on("change", "#date_conteo_marcaiones", function() {
    document.getElementById("tbody_conteo_marcaciones").innerHTML = ""
})