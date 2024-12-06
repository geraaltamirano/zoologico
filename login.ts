const loginForm = document.getElementById("loginForm") as HTMLFormElement;


loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = (document.getElementById("username") as HTMLInputElement).value;
  const passworddesc = (document.getElementById("password") as HTMLInputElement).value;

  //Cifrar

  let password = '';
  const desplazamiento = 5;
    
    for (let i = 0; i < passworddesc.length; i++) {
        let char = passworddesc[i];
        
        // Si es una letra mayúscula
        if (char >= 'A' && char <= 'Z') {
            // Cifrado con desplazamiento, asegurándonos de que se mantenga dentro del rango de A-Z
            password += String.fromCharCode(((char.charCodeAt(0) - 65 + desplazamiento) % 26) + 65);
        }
        // Si es una letra minúscula
        else if (char >= 'a' && char <= 'z') {
            // Cifrado con desplazamiento, asegurándonos de que se mantenga dentro del rango de a-z
            password += String.fromCharCode(((char.charCodeAt(0) - 97 + desplazamiento) % 26) + 97);
        } else {
            // Si no es una letra, lo dejamos tal cual está
            password += char;
        }
    }

  //fin cifrar

  const response =  await fetch(`http://localhost:3000/auth/login/${username}/${password}`); 

  if (response.ok) {
    const data = await response.json();
    
    var json = JSON.parse(JSON.stringify(data, null, 2));
    var rol = json['rol'];
    localStorage.setItem("token", rol); // Guardar el token en localStorage   
    const token= localStorage.getItem("token");
    if(token == "Administrador"){
        window.location.href = "actualizarUsuario.html";
    }else{
        if(token == "Usuario"){
            window.location.href = "registrarEspecie.html";
        }else{
            alert("No cuenta con un rol asignado, por favor comuniquese con el equipo de soporte");
        }
    }

    
    
  } else {
    alert("Error de autenticación");
  }
});


