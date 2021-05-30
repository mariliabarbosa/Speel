function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    postSession(email, password);
}

function postSession(email, password){
    axios({
        method: 'post',
        url: 'http://localhost:8000/',
        data: {
            email,
            password
        },
        headers:{
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        localStorage.setItem("token", res.data.token);
        window.location.href="main-page.html";
    }, (error) => {
        document.getElementById('error').innerText = "E-mail ou senha errados";
    });
}