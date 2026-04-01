function getToken(){
    return localStorage.getItem("token");
}

function getHeaders(){
    return {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+getToken()
    };
}