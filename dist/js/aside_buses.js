function recorrer_item_inactive_aside_buses() {
    var elementos_children = document.getElementById("ul_aside_buses").children

    for (var i = 0; i < elementos_children.length; i++) {

        var childre_active = elementos_children[i].children[0];
        $(childre_active).removeClass("item-active")

    }


}

$(document).on("click", ".item-bus-global", function() {
    recorrer_item_inactive_aside_buses()
    var element = $(this)[0].children[0]
    $(element).addClass("item-active")
})