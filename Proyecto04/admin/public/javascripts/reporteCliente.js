
document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    let selectCliente = document.getElementById("selectCustomer");
    selectCliente.addEventListener("change", () => {
        console.log("selectCliente change");
        selectCliente = document.getElementById("selectCustomer");
        let tableSales = document.getElementById("tableSales");
        let idCliente = selectCliente.value;
        
    });
});