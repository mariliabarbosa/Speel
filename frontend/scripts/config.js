function changeEmail(){
    const email = document.querySelector("#email").value;

    const id = localStorage.getItem("id");
    const token = 'bearer '+localStorage.getItem("token");

    axios({
        method: 'put',
        url: `http://localhost:8000/users/${id}`,
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
        url: `http://localhost:8000/users/${id}`,
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
        url: `http://localhost:8000/users/${id}`,
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