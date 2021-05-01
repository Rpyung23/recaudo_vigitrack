let spinner = document.getElementById("loading")

function showSpinner() {
    spinner.className = ("loading open")
    console.log("show")
}



function hideSpinner() {
    spinner.classList.remove("showLoading")
    spinner.className = ("loading close")
    console.log("hide")
}