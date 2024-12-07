$(document).ready(function() {
    const token= localStorage.getItem("token");
    console.log(window.location.href);
    console.log(token);
    const text=window.location.href;
    if(token != null){
        if(token != "Administrador"){
            document.getElementById( 'menuusuario' ).style.display = 'none';
            if(text.includes("Usuario")){
                window.location.href = "login.html";
            } 
        }else{
            console.log("Eres todo poderoso");
        }
    }else{
        console.log("Undefined");
        window.location.href = "login.html";
    }
});