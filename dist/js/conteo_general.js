function api_conteo_general(url, unidad) {
    let th_body = ""
    showSpinner()
        //console.log(url)
    $.ajax({
        crossDomain: true,
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        timeout: 70000,
        data: getCookie("token")
    }).done(function(datos) {
        hideSpinner()

        let json_String = JSON.stringify(datos)
        let json_parse = JSON.parse(json_String)


        if (json_parse.status_code == 200) {
            sweetAlert("Conteo de Pasajeros Unidad " + unidad, "Datos consultados con éxito !", "success")

            for (var i = 0; i < json_parse.datos.length; i++) {

                var subida1 = json_parse.datos[i].subida1
                var subida2 = json_parse.datos[i].subida2 == null ? 0 : json_parse.datos[i].subida2
                var subida3 = json_parse.datos[i].subida3 == null ? 0 : json_parse.datos[i].subida3
                var bajada1 = json_parse.datos[i].bajada1
                var bajada2 = json_parse.datos[i].bajada2 == null ? 0 : json_parse.datos[i].bajada2
                var bajada3 = json_parse.datos[i].bajada3 == null ? 0 : json_parse.datos[i].bajada3

                th_body += `<tr role="row" class="even">
                <td>${json_parse.datos[i].unidad}</td>
                <td>${subida1}</td>
                <td>${subida2}</td>
                <td>${subida3}</td>
                <td>${bajada1}</td>
                <td>${bajada2}</td>
                <td>${bajada3}</td>
                <td><strong>${parseInt(subida1) + parseInt(subida2) + parseInt(subida3)}</strong></td>
                <td><strong>${parseInt(bajada1) + parseInt(bajada2) + parseInt(bajada3)}</strong></td>
                <td>${100 - parseFloat(json_parse.datos[i].error)}</td>
            </tr>`
            }

            document.getElementById("tbody_conteo_general").innerHTML = th_body

        } else if (json_parse.status_code == 300) {
            sweetAlert("Conteo de Pasajeros Unidad " + unidad, "No existen datos disponibles", "info")
        } else if (json_parse.status_code == 400) {
            sweetAlert("Error 400", json_parse.datos, "error")
        } else {
            token_invalited()
        }

    }).fail(function(error) {
        hideSpinner()
        sweetAlert("Error 400", "Api Rest Fail Backend", "error")
    })

}

function clearTable() {

    document.getElementById("tbody_conteo_general").innerHTML = ""
}

$(document).on("click", "#btn_search_conteo_general", function() {
    var select_unidad = document.getElementById("select_buses_global")

    var unidad = select_unidad.options[select_unidad.selectedIndex].value

    var fechaI = document.getElementById("date_ini_conteo_general").value
    var fechaF = document.getElementById("date_fin_conteo_general").value

    if (fechaF.length > 0 && fechaI.length > 0) {

        if (fechaF < fechaI) {
            sweetAlert("Fechas no válidas", "Por favor revisar fechas ingresadas", "warning")
        } else {
            /*console.log(unidad)
            console.log(fechaI.replace("T", " "))
            console.log(fechaF.replace("T", " "))*/

            var url = "http://localhost:3000/conteo_general/" + unidad + "/" + fechaI.replace("T", " ") + "/" + fechaF.replace("T", " ")

            api_conteo_general(url, unidad)
        }
    } else {
        sweetAlert("Fechas no válidas", "Los campos de fechas estan vacíos", "warning")
    }

})

$(document).on("change", "#date_fin_conteo_general", function() {
    clearTable()
})

$(document).on("change", "#date_ini_conteo_general", function() {
    clearTable()
})


$(document).on("change", "#select_buses_global", function() {
    clearTable()
})

$(document).on("click", "#btn_print_tarjetas_unidades", function() {
    window.print()
})

function sweetAlert(title, subtitle, icon) {
    Swal.fire(
        title,
        subtitle,
        icon
    )
}