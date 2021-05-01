let btn = document.getElementById("btn_cerrar_sesion")


btn.addEventListener("click", function() {

    Swal.fire({
        title: 'Cierre de Sesión',
        text: "Si deseas salir haz clic en Cerar Sesion o en Cancelar para continuar trabajando",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Cerrar Sesión'
    }).then((result) => {
        if (result.isConfirmed) {

            cerrarCookie()

        }
    })

})


function token_invalited() {

    Swal.fire({
        title: 'Sesión Caducada',
        text: "Por favor vuelva a Iniciar Sesión nuevamente",
        icon: 'error',
        showCancelButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonText: 'Ingreso Login'
    }).then((result) => {
        if (result.isConfirmed) {
            cerrarCookie()

        }
    })
}