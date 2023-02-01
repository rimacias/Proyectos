// DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", function(event) {
    selectCliente = document.getElementById("selectCustomer");
    selectCliente.addEventListener("change", function() {
        selectCliente = document.getElementById("selectCustomer");
        if (selectCliente.value != "") {
            document.getElementById("btnReporte").disabled = false;
        } else {
            document.getElementById("btnReporte").disabled = true;
        }
    });
});