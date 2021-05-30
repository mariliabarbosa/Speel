var dayOptions = {
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
var monthOptions = {
    series: [{
        name: "Pessoas",
        data: [10, 41, 35, 51],
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
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 223, 232, 11],
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
    var chart;
    if(size == 4){
        chart = new ApexCharts(document.querySelector("#chart"), yearOptions);
        chart.render();
    } else if (size == 7){
        chart = new ApexCharts(document.querySelector("#chart"), monthOptions);
        chart.render();
    } else if (size == 10){
        chart = new ApexCharts(document.querySelector("#chart"), dayOptions);
        chart.render();
    }
}
function dailySelector(){
    document.querySelector("#diario").setAttribute("style", "color:#00E09D");
    document.querySelector("#mensal").setAttribute("style", "color:black");
    document.querySelector("#anual").setAttribute("style", "color:black");

    document.querySelector("#data").setAttribute("maxlength","10");
    document.querySelector("#data").setAttribute("placeholder","DD/MM/AAAA");
}
function monthSelector(){
    document.querySelector("#diario").setAttribute("style", "color:black");
    document.querySelector("#mensal").setAttribute("style", "color:#00E09D");
    document.querySelector("#anual").setAttribute("style", "color:black");

    document.querySelector("#data").setAttribute("maxlength","7");
    document.querySelector("#data").setAttribute("placeholder","MM/AAAA");
}
function yearSelector(){
    document.querySelector("#diario").setAttribute("style", "color:black");
    document.querySelector("#mensal").setAttribute("style", "color:black");
    document.querySelector("#anual").setAttribute("style", "color:#00E09D");

    document.querySelector("#data").setAttribute("maxlength","4");
    document.querySelector("#data").setAttribute("placeholder","AAAA");
}
function logout(){
    localStorage.removeItem("token");
    window.location.href="../pages/login.html";
}