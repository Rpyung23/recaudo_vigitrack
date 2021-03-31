function all_unidades() {
    let select_buses = ""

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/unidades/uambatena1198",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "GET"
    }).done(function(json_response) {
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            console.log("ok")
            for (let i = 0; i < json_parse.datos.length; i++) {
                var id_unidad = json_parse.datos[i].id_unidad;
                select_buses += `<option value="${id_unidad}">Unidad ${id_unidad}</option>`
            }

            //console.log(select_buses)
            document.getElementById("select_buses_global").innerHTML = select_buses

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {

    })
}


function all_unidades_tarjetas_trabajadas() {
    let select_buses = ""

    $.ajax({
        crossDomain: true,
        url: "http://localhost:3000/unidades/uambatena1198",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "GET"
    }).done(function(json_response) {
        var json_string = JSON.stringify(json_response)
        var json_parse = JSON.parse(json_string)

        if (json_parse.status_code == 200) {
            select_buses = `<option value="*">Todas (*)</option>`

            for (let i = 0; i < json_parse.datos.length; i++) {
                var id_unidad = json_parse.datos[i].id_unidad;
                select_buses += `<option value="${id_unidad}">Unidad ${id_unidad}</option>`
            }

            //console.log(select_buses)
            document.getElementById("select_buses_global").innerHTML = select_buses

        } else {
            console.log("No se puede cargar las unidades")
        }
    }).fail(function(error) {

    })
}