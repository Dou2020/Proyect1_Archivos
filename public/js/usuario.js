function validarForma(forma){
    let nombre = forma.nombre;
    let apellido = forma.apellido;
    let email = forma.email;
    let edad = forma.edad;

    if(nombre.value != "" || apellido.value != "" || email.value != "" || edad.value != ""){
        alert("Ingreso el usuario "+nombre.value+" apellido "+apellido.value+" correo " +email.value);
        console.log("Ingreso el usuario "+nombre.value+" apellido "+apellido.value+" correo " +email.value);
        return true;
    }else{
        alert("Hay datos que no han sido ingresados");
        console.log("Hay datos que no han sido ingresados");
        Usuario.focus();
        Usuario.select();
        return false;
    }
}
function validarForma2(forma){
    let nombre = forma.nombre;
    let apellido = forma.apellido;
    let cui = forma.cui;
    let departamento = forma.departamento;

    if(nombre.value != "" || apellido.value != "" || cui.value != "" || departamento.value != ""){
        alert("Ingreso al usuario "+nombre.value+" apellido "+apellido.value+" cui "+cui.value+" departamento "+departamento.value);
        console.log("Ingreso al usuario "+nombre.value+" apellido "+apellido.value+" cui "+cui.value+" departamento "+departamento.value);
        return true;   
    }else{
        alert("Hay espacios donde no a ingresado datos");
        console.log("hay espacios donde no a ingresado datos");
        Usuario.focus();
        Usuario.select();
        return false;
    }
}