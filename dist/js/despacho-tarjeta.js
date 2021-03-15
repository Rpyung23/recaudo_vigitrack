$(document).on("click", ".card-inactive", function() {
    var element = $(this)[0]
    $(element).css("background-color", "#0D6EFD")
    $(element).css("border-color", "#FFFFFF")
    $(element).css("border-style", "solid")

    element.children[0].src = "../../dist/img/nav-bus-active.png"
    element.children[1].style = "color:white"

})