function toggleCode() {
  const role = document.getElementById("role").value;
  const codeDiv = document.getElementById("codeDiv");
  codeDiv.classList.toggle("hidden", role !== "admin");
}

async function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const code = document.getElementById("code").value;

    const response = await fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            role,
            code
        })
    });

    const data = await response.json();

    console.log("REGISTER RESPONSE:", data);

    if (response.ok) {
        alert("Registration successful!");
        window.location.href = "login.html";
    } else {
        alert(data.detail || "Error occurred");
    }
}