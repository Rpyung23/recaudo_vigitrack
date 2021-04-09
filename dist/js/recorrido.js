function recorrido() {
    let contador = 1;

    let tabla_recorrido = ""
    let fecha = document.getElementById("date_despacho_tarjeta").value

    let select_unidad = document.getElementById("select_buses_global")
    let option_unidad = select_unidad.options[select_unidad.selectedIndex].value

    let horaI = document.getElementById("time_recorrido_start").value
    let horaF = document.getElementById("time_recorrido_end").value

    if (horaF > horaI) {
        var url_ = "http://localhost:3000/recorrido/" + option_unidad + "/" + fecha + "/" + horaI + "/" + horaF

        console.log(url_)
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


            if (json_parse.status_code == 200) {


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

                    contador++
                }

                Swal.fire(
                    'Unidad ' + option_unidad,
                    'Los datos consultados con exito',
                    'success'
                )

                var element = document.getElementById("tbody_recorrido")
                element.innerHTML = tabla_recorrido

            } else {
                console.log("No se puede cargar el recorrido")
            }
        }).fail(function(error) {
            alert(error)
        })
    } else {
        alert("INTERVALO DE HORAS NO VALIDOS")
    }
}


function clear_table_recorrido() {
    document.getElementById("tbody_recorrido").innerHTML = ""
}

$(document).on("click", "#btn_search_despacho_tarjeta", function() {
    recorrido();
})