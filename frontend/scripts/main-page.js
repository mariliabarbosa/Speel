var options = {
    series: [{
        name: "Pessoas",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
var sensors = "";

function getSensors(){
    axios({
        method: 'get',
        url: `http://localhost:3030/sensors/`,
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        sensors = res.data;
        start();
    });
}

function getUser(){
    if(localStorage.getItem("token") === null){
        window.location.href = "./login.html"
    }
    axios({
        method: 'get',
        url: 'http://localhost:3030/currentuser',
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("username", res.data.name);
        getSensors();
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
    if(sensors.length == 0){
        let userName = localStorage.getItem("username");
        userName = userName.slice(0, userName.indexOf(" "));
        document.getElementById("introduction").innerHTML = "<h1>Bem-vindo, "+userName+".</h1>";
        document.querySelector(".top-items").innerHTML = "<h1>Cadastre um sensor nas configurações</h1>";
    } else {
        let userName = localStorage.getItem("username");
        userName = userName.slice(0, userName.indexOf(" "));
        
        getReportsByDay();
        writeDocument(userName);        
    }
}
function getReportsByDay(){
    const dayData = options.series[0].data;
    const day = printDate();
    const sensor = sensors[0].id;
    let reports = "";
    axios({
        method: 'get',
        url: `http://localhost:3030/reports/${sensor}/${day}`,
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        reports = res.data;
        separateByHour(reports);
        getTotalPeople(reports);
        separateByHour(reports);
        chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
        for(var i in dayData){
            dayData[i] = 0;
        }
    });
}
function getTotalPeople(reports){
    const total = reports.length;
    document.querySelector("#total-people").innerText =total;
}

function getAveragePerDay(reports){
    const total = reports.length;
    const average = total/24;

    document.querySelector("#average-people").innerText = average.toFixed(2);
}
function separateByHour(reports){
    reports.forEach(report => {
        let hour = report.hour;
        if(hour == 0){
            options.series[0].data[0]++;    
        } else {
            options.series[0].data[hour]++;
        }
        
    });
}
function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    window.location.href="../pages/login.html";
}

function writeDocument(userName){
    document.getElementById("introduction").innerHTML = "<h1>Bem-vindo, "+userName+".</h1>";
    document.getElementById("today").innerHTML = "<b>HOJE</b>, " + printDate();
    document.getElementById("current-time").innerText = printHour();
}