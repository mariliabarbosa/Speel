var dayOptions = {
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
var monthOptions = {
    series: [{
        name: "Pessoas",
        data: [0, 0, 0, 0],
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
        categories: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    }
};
var yearOptions = {
    series: [{
        name: "Pessoas",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    }
};

var sensors = "";
const token = 'bearer '+localStorage.getItem("token");
var chart;

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
        if(sensors.length == 0){
            document.querySelector(".content").innerHTML = "<h1>Cadastre um sensor nas configurações</h1>";
        } 
    });
}
function keyPressed(event){
    const keyPressed = event.keyCode;
    let size;
    if(keyPressed == 13){
        size = analyzeInput();
        showChart(size);
    };
}

function analyzeInput(){
    const tamanho = document.querySelector("#data").getAttribute("maxlength");
    return tamanho;
}

function showChart(size){
    document.querySelector("#chart").innerHTML = "";
    if(document.querySelector("#chart p")){
        document.querySelector("#chart p").setAttribute("style", "display:none");
    }
    if(size == 4){
        getReportsByYear();
    } else if (size == 7){
        getReportsByMonth();
    } else if (size == 10){
        getReportsByDay();
    }
}

function getReportsByYear(){
    const yearData = yearOptions.series[0].data;
    const year = document.querySelector("#data").value;
    const sensor = sensors[0].id;
    let reports = "";
    axios({
        method: 'get',
        url: `http://localhost:3030/reports/${sensor}/${year}`,
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        reports = res.data;
        getTotalPeople(reports);
        separateByMonth(reports);
        chart = new ApexCharts(document.querySelector("#chart"), yearOptions);
        chart.render();
        for(var i in yearData){
            yearData[i] = 0;
        }
    });
}
function getReportsByMonth(){
    const monthData = monthOptions.series[0].data;
    const month = document.querySelector("#data").value;
    const sensor = sensors[0].id;
    let reports = "";
    axios({
        method: 'get',
        url: `http://localhost:3030/reports/${sensor}/${month}`,
        headers:{
            'Content-Type': 'application/json',
            'authorization': token,
        }
    }).then((res) => {
        reports = res.data;
        getTotalPeople(reports);
        separateByWeek(reports);
        chart = new ApexCharts(document.querySelector("#chart"), monthOptions);
        chart.render();
        for(var i in monthData){
            monthData[i] = 0;
        }
    });
}
function getReportsByDay(){
    const dayData = dayOptions.series[0].data;
    const day = document.querySelector("#data").value;
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
        getAveragePerDay(reports);
        chart = new ApexCharts(document.querySelector("#chart"), dayOptions);
        chart.render();
        for(var i in dayData){
            dayData[i] = 0;
        }
    });
}
function separateByHour(reports){
    reports.forEach(report => {
        let fullHour = report.hour;
        let hour = Number(fullHour[0]+fullHour[1]);
        if(hour == 0){
            dayOptions.series[0].data[0]++;    
        } else {
            dayOptions.series[0].data[hour]++;
        }
        
    });
}
function separateByWeek(reports){
    reports.forEach(report => {
        if(report.day <= 7){
            monthOptions.series[0].data[0]++;
        } else if (report.day > 7 && report.day <= 14){
            monthOptions.series[0].data[1]++;
        } else if (report.day > 14 && report.day <= 21){
            monthOptions.series[0].data[2]++;
        } else if (report.day > 21){
            monthOptions.series[0].data[3]++;
        }
    });
}

function separateByMonth(reports){
    reports.forEach(report => {
        yearOptions.series[0].data[report.month - 1]++;
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
function dailySelector(){
    document.querySelector("#diario").setAttribute("style", "color:#00E09D");
    document.querySelector("#mensal").setAttribute("style", "color:black");
    document.querySelector("#anual").setAttribute("style", "color:black");

    document.querySelector("#data").setAttribute("maxlength","10");
    document.querySelector("#data").setAttribute("placeholder","DD/MM/AAAA");

    document.querySelector(".average-people").setAttribute("style","display:block");
    document.querySelector(".total-people").setAttribute("style","margin-left: 100px;");
}
function monthSelector(){
    document.querySelector("#diario").setAttribute("style", "color:black");
    document.querySelector("#mensal").setAttribute("style", "color:#00E09D");
    document.querySelector("#anual").setAttribute("style", "color:black");

    document.querySelector("#data").setAttribute("maxlength","7");
    document.querySelector("#data").setAttribute("placeholder","MM/AAAA");

    document.querySelector(".average-people").setAttribute("style","display:none");
    document.querySelector(".total-people").setAttribute("style","margin-left: 420px;");
}
function yearSelector(){
    document.querySelector("#diario").setAttribute("style", "color:black");
    document.querySelector("#mensal").setAttribute("style", "color:black");
    document.querySelector("#anual").setAttribute("style", "color:#00E09D");

    document.querySelector("#data").setAttribute("maxlength","4");
    document.querySelector("#data").setAttribute("placeholder","AAAA");

    document.querySelector(".average-people").setAttribute("style","display:none");
    document.querySelector(".total-people").setAttribute("style","margin-left: 420px;");
}
function logout(){
    localStorage.removeItem("token");
    window.location.href="../pages/login.html";
}