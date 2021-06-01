function signUp(){
    const name = document.getElementById("name").value;
    const cnpj = document.getElementById("cnpj").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    postUser(name, cnpj, email, password);
}
function postUser(name, cnpj, email, password){
    axios({
        method: 'post',
        url: 'http://localhost:3030/users',
        data: {
            name,
            cnpj,
            email,
            password
        },
        headers:{
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        window.location.href = "login.html";
    });
}