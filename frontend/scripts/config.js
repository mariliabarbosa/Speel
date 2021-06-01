var sensors = "";
function changeEmail(){
    const email = document.querySelector("#email").value;

    const id = localStorage.getItem("id");
    const token = 'bearer '+localStorage.getItem("token");

    axios({
        method: 'put',
        url: `http://localhost:3030/users/${id}`,
        data: {
            email,
        },
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        console.log(res);
    });
}

function changePassword(){
    const password = document.querySelector("#password").value;

    const id = localStorage.getItem("id");
    const token = 'bearer '+localStorage.getItem("token");

    axios({
        method: 'put',
        url: `http://localhost:3030/users/${id}`,
        data: {
            password,
        },
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        console.log(res);
    });
}
function deleteAccount(){
    const id = localStorage.getItem("id");
    const token = 'bearer '+localStorage.getItem("token");

    window.location.href = "../pages/login.html";

    axios({
        method: 'delete',
        url: `http://localhost:3030/users/${id}`,
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("id");
    });
}
function getSensors(){
    const token = 'bearer '+localStorage.getItem("token");

    axios({
        method: 'get',
        url: `http://localhost:3030/sensors/`,
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        sensors = res.data;
        console.log(sensors);
        if(sensors.length == 0){
            document.querySelector(".sensor-btn").style.display = "block";
        } else{
            displaySensors(sensors);
        }
    });
}

function newSensor(){
    document.querySelector(".sensor-btn").style.display = "none";
    document.querySelector(".sensor-create").innerHTML = "<input class='sensor-input' id='sensor-id' placeholder='ID do sensor'><br>";
    document.querySelector(".sensor-create").innerHTML += "<input class='sensor-input' id='sensor-name' placeholder='Nome do sensor(opcional)'><br>";
    document.querySelector(".sensor-create").innerHTML += "<button class='sensor-btn' onclick='createSensor()'>Criar sensor</button>"
}

function createSensor(){
    const id = document.querySelector("#sensor-id").value;
    const name = document.querySelector("#sensor-name").value;
    const token = 'bearer '+localStorage.getItem("token");

    axios({
        method: 'post',
        url: `http://localhost:3030/sensors/`,
        data: {
            id,
            name
        },
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        document.querySelector(".sensor-create").style.display = "none";
        sensors.push(res.data);
        getSensors();
    });
}

function displaySensors(sensors){
    sensors.forEach(sensor => {
        let newSensor = document.createElement("div").innerHTML = `
        <h3>${sensor.id} ${sensor.name}</h3>
        <button id='delete-sensor' onclick='deleteSensor()'>Deletar sensor</button>`;
        document.querySelector(".sensor-config").innerHTML += newSensor;
    });
}

function deleteSensor(){
    const old_id = sensors[0].id;
    const token = 'bearer '+localStorage.getItem("token");
    
    axios({
        method: 'delete',
        url: `http://localhost:3030/sensors/${old_id}`,
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        console.log(res);
        sensors = "";
        document.querySelector(".sensor-config").style.visibility = "hidden";
        document.querySelector(".sensor-btn").style.display = "block";
    });
}