var options = {
    series: [{
        name: "Pessoas",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 223, 232, 11, 22, 33],
        colors: ['#00E09D'],
    }],
    chart: {
        height: 350,
        type: 'line',
        zoom: {
        enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight',
        colors: ['#00E09D']
    },
    grid: {
        row: {
            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
        },
    },
    xaxis: {
        categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    }
};

const hoje = new Date();
var currentDate;
var currentTime;
const token = 'bearer '+localStorage.getItem("token");

function getUser(){
    axios({
        method: 'get',
        url: 'http://localhost:8000/currentuser',
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("username", res.data.name);
    });
}

function printDate() {
    var mes = hoje.getMonth()+1;
    var i = 0;
    var dia = hoje.getDate();

    if (mes < 10) {
        i = mes;
        mes = "0"+i;
    }
    if (dia < 10) {
        i = dia;
        dia = "0"+i;        
    }
    currentDate = dia+"/"+mes+"/"+hoje.getFullYear();
    return currentDate;
}

function printHour() {
    var hora = hoje.getHours();
    var minuto = hoje.getMinutes();
    var i;
    
    if (hora < 10) {
        i = hora;
        hora = "0"+i;
    }
    if (minuto < 10) {
        i = minuto;
        minuto = "0"+i;
    }
    currentTime = hora+":"+minuto;
    return currentTime;
}

function start(){
    const verify = localStorage.getItem("token");
    if(!verify){
        window.location.href = "../login.html"
    }

    getUser();
    let userName = localStorage.getItem("username");
    userName = userName.slice(0, userName.indexOf(" "));
    
    renderChart();
    writeDocument(userName);
}

function logout(){
    localStorage.removeItem("token");
    window.location.href="../pages/login.html";
}

function renderChart(){
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}

function writeDocument(userName){
    document.getElementById("introduction").innerHTML = "<h1>Bem-vindo, "+userName+".</h1>";
    document.getElementById("today").innerHTML = "<b>HOJE</b>, " + printDate();
    document.getElementById("current-time").innerText = printHour();
}