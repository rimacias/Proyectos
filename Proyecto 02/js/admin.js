let API_MAIN_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?";
let API_OWNED_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=D%2FD";
let API_WISH_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes";
let IMG_URL = "https://images.ygoprodeck.com/images/cards/";
let all_data = [];
let owned_amount = 0;
let wishlisted_amount = 0;
let offset = Math.floor(Math.random() * (5000 - 1500) + 1500);
let toc = document.getElementById("total_owned_counter");
let twc = document.getElementById("total_wishlist_counter");
let tcc = document.getElementById("total_cards_counter");
this.addEventListener('DOMContentLoaded', function () {
    loadAllData();
    let select_attr_owned = document.getElementById("atrr-filter");
    let results_owned = document.getElementById("results");
    results_owned.addEventListener("change", () => {
        let attr = select_attr_owned.value;
        loadOwnedCards(attr);
    });
    select_attr_owned.addEventListener("change", () => {
        loadOwnedCards(select_attr_owned.value);
    });
    let select_attr_wished = document.getElementById("type_filter_wish");
    let results_wished = document.getElementById("results_wish");
    results_wished.addEventListener("change", () => {
        let attr = select_attr_wished.value;
        loadWishedCards(attr);
    });
    select_attr_wished.addEventListener("change", () => {
        loadWishedCards(select_attr_wished.value);
    });
    loadOwnedCards("all");
    loadWishedCards("all");

});


loadWishedCards = (attribute) => {
    url = API_MAIN_URL;
    let cc = document.getElementById("wished_cards_container");
    cc.innerHTML = "";
    if (attribute != "all") {
        url = API_MAIN_URL + "attribute=" + attribute;
    }
    
    let quantity = document.getElementById("results_wish").value
    fetch(url + "&offset="+offset+"&num="+offset)
        .then(async (response) => response.json())
        .then(async data => data = data.data)
        .then(async data => {
            wishlisted_amount = data.length;
            total = quantity;
            let cols = 6;
            var div = ~~(total / cols); var r = total % cols;
            for (var i = 0; i < div; i++) {
                var row = document.createElement("div");
                row.className = "row";
                for (var j = 0; j < cols; j++) {
                    index = i * cols + j;
                    row.innerHTML += `<div class="col-2 grow">
                        <img src="${IMG_URL + data[index].id + ".jpg"}" class="card-img-top" alt="${data[index].name}">
                </div>`;
                }
                cc.appendChild(row);
            }
            if (r != 0) {
                var row = document.createElement("div");
                row.className = "row";
                for (var i = 0; i < r; i++) {
                    index = div * cols + i;
                    row.innerHTML += `<div class="col-2 grow">
                        <img src="${IMG_URL + data[index].id + ".jpg"}" class="card-img-top" alt="${data[index].name}">
                </div>`;
                }
                cc.appendChild(row);
            }

        }).catch((error) => {
            let div = document.createElement("div");
            div.innerHTML = "No cards found";
            cc.appendChild(div);
        }
        );
}
loadOwnedCards = (attribute) => {
    url = API_OWNED_URL;
    let cc = document.getElementById("owned_cards_container");
    cc.innerHTML = "";
    if (attribute != "all") {
        url = API_OWNED_URL + "&attribute=" + attribute;
    }
    let quantity = document.getElementById("results").value
    fetch(url)
        .then(async (response) => response.json())
        .then(async data => data = data.data)
        .then(async data => {
            owned_amount = data.length;
            total = quantity;
            let cols = 6;
            var div = ~~(total / cols); var r = total % cols;
            for (var i = 0; i < div; i++) {
                var row = document.createElement("div");
                row.className = "row";
                for (var j = 0; j < cols; j++) {
                    index = i * cols + j;
                    row.innerHTML += `<div class="col-2 grow">
                        <img src="${IMG_URL + data[index].id + ".jpg"}" class="card-img-top" alt="${data[index].name}">
                </div>`;
                }
                cc.appendChild(row);
            }
            if (r != 0) {
                var row = document.createElement("div");
                row.className = "row";
                for (var i = 0; i < r; i++) {
                    index = div * cols + i;
                    row.innerHTML += `<div class="col-2 grow">
                        <img src="${IMG_URL + data[index].id + ".jpg"}" class="card-img-top" alt="${data[index].name}">
                </div>`;
                }
                cc.appendChild(row);
            }

        }).catch((error) => {
            let div = document.createElement("div");
            div.innerHTML = "No cards found";
            cc.appendChild(div);
        }
        );
}
loadAllData = async () => {
    fetch(API_MAIN_URL)
        .then(async (response) => response.json())
        .then(async data => data = data.data)
        .then(async data => {
            all_data = data;
            console.log(all_data);
            loadQuantityChart().then(() => {
                tcc.innerText = all_data.length;
                toc.innerText = owned_amount;
                twc.innerText = wishlisted_amount;
            });
        });
}
loadQuantityChart = async () => {
    var quantity_chart = document.getElementById("quantity_chart").getContext('2d');
    let labels = ["Owned", "Wishlisted"];
    let data = [owned_amount, wishlisted_amount];
    barChartTo(quantity_chart, data, labels);
}
barChartTo = (chart, data, labels) => {
    var myChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Cards',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}