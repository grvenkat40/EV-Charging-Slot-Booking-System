BASE_URL = "http://127.0.0.1:8000"

function showToast(message){
    const toastContainer = document.getElementById("notification-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;

    toastContainer.appendChild(toast);

    setTimeout(
        () => {
            toast.style.opacity = '0';
            setTimeout(() => {toast.remove();}, 500);
        }, 3000
    );
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginBtn = document.getElementById("Loginbtn");
    

    if(!email.trim() || !password.trim()){
        showToast("Please enter both email and password!");
        return;
    }

    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    loginBtn.innerText = "Processing...";

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body:formData
    });

    const data = await response.json();
    console.log("Response:", data);
    if (response.ok){
        const token = data.access_token;
        localStorage.setItem("token", token);

        const decoded = parseJwt(token);
        console.log("TOKEN:", token);
        console.log("DECODED:", parseJwt(token));
        if (decoded.role === "admin"){
            window.location.href = "admin.html";
        }else{
            window.location.href = "dashboard.html";
        }
        }else{
        alert("Login failed!" + data.detail)
    }
}

function parseJwt(token){
    try{
        const base64Url = token.split('.')[1];
        const base64 = atob(base64Url);
        return JSON.parse(base64)
    }catch(e){
        return null;
    }
}

async function register() {
    window.location.href = "register.html";
}