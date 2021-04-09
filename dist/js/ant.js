function consultar_datos_ant(fechaI, fechaF, horaI, horaF) {


    let tb_ant = "";


    $.ajax({
        url: "http://localhost:3000/ant/" + fechaI + "/" + fechaF + "/" + horaI + "/" + horaF,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "POST",
        data: getCookie("token")
    }).done(function(datos) {
        var json_string = JSON.stringify(datos)
        var json_parse = JSON.parse(json_string)


        if (json_parse.status_code == 200) {
            for (var i = 0; i < json_parse.datos.length; i++) {

                var cont = i
                tb_ant += `<tr role="row" class="even">
                <td>${cont++}</td>
                <td>${json_parse.datos[i].codi_vehi}</td>
                <td>${json_parse.datos[i].placa_vehi}</td>
                <td>${json_parse.datos[i].propietario}</td>
                <td>${json_parse.datos[i].ced}</td>
                <td>${json_parse.datos[i].hora_sali}</td>
                <td>${json_parse.datos[i].hora_lleg}</td>
                <td>${json_parse.datos[i].ruta}</td>
                <td>${json_parse.datos[i].vuelta}</td>
                <td>${json_parse.datos[i].monto}</td>
                <td>${json_parse.datos[i].velo}</td>
            </tr>`
            }

            document.getElementById("tbody_ant").innerHTML = tb_ant
        } else if (json_parse.status_code == 300) {
            alert("Datos vacios")
        } else {
            alert("error api rest")
        }

    }).fail(function(error) {
        alert(error)
    })
}

function clearTablaAnt() {
    document.getElementById("tbody_ant").innerHTML = " "
}

$(document).on("click", "#btn_search_ant", function() {
    var fechaI = document.getElementById("date_ini_ant").value
    var fechaF = document.getElementById("date_fin_ant").value
    var horaI = document.getElementById("time_ant_start").value
    var horaF = document.getElementById("time_ant_end").value
    clearTablaAnt()
    consultar_datos_ant(fechaI, fechaF, horaI, horaF)
})