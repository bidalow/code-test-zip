function findZipCode(x){
    const zipCode = x.value;

    if(zipCode == "" || zipCode.length < 5){
        hideData();
        hideError();
        return;
    }

    if(zipCode.length > 5){
        showError();
        return;
    }

    const url = `https://api.zippopotam.us/us/${zipCode}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        drawData(data);
    }
    )
    .catch(res => {
        showError();
    })
}

function drawData(data){
    document.getElementById("stateImg").src = `states/${data.places[0]["state abbreviation"]}.svg`;
    document.getElementById("state").innerHTML = `${data.places[0]["state"]} (${data.places[0]["state abbreviation"]})`
    document.getElementById("placeName").innerHTML = `${data.places[0]["place name"]}`
    document.getElementById("info").classList.add("active");
}

function hideData(){
    document.getElementById("info").classList.remove("active");
}

function showError(){
    document.getElementsByTagName("input")[0].classList.add("error");
    hideData();
}

function hideError(){
    document.getElementsByTagName("input")[0].classList.remove("error");
}