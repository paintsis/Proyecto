//declaracion de variables
var nombre;
var diaNacimiento;
var mesNacimiento;
var anioNacimiento;

var conyuge;
var hijos;
var cantidadHijos;
const precioBase  = 250;
function calcular(){
    nombre = document.getElementById('nombre').value;
    diaNacimiento = document.getElementById('day').value;
    mesNacimiento = document.getElementById('mont').value;
    anioNacimiento = document.getElementById('year').value;

    conyuge = document.getElementsByName('conyuge');
    for (var i = 0, length = conyuge.length; i < length; i++) {
        if (conyuge[i].checked) {
            conyuge = conyuge[i].value;
        break;
     }
    }
    hijos = document.getElementsByName('hijos');
    for (var i = 0, length = hijos.length; i < length; i++) {
        if (hijos[i].checked) {
            hijos = hijos[i].value;
        break;
     }
    }
    recargo = recargoAsegurado(getEdad(anioNacimiento + '\/' + mesNacimiento + '\/' + diaNacimiento));
}

function recargoAsegurado(edad){
    recargo = 0;
    if((edad <= 18) || (edad > 65)){
        console.log('No se puede asegurar');
    }else if ( (edad > 18) && (edad <21 ) ){
        recargo = 0;
    }else if ((edad >20) && (edad <=25)){
        recargo = precioBase * 0.01;
    }else if((edad >25) && (edad <=30)){
        recargo = precioBase * 0.02;
    }else if((edad >30) && (edad <=40)){
        recargo = precioBase * 0.05;
    }else if((edad > 40) && (edad <=50)){
        recargo = precioBase * 0.08;
    }else if((edad >50) && (edad <=65)){
        recargo = precioBase * 0.12;
    }
    return recargo;
}

function recargoConyuge(edad){
    recargo = 0;
    if(edad < 30){
        recargo = precioBase*0.01;
    }else if((edad >= 30) && (edad < 40)){
        recargo = precioBase * 0.02;
    }else if((edad >= 40) && (edad < 50)){
        recargo = precioBase * 0.03;
    }else if((edad >= 50) && (edad < 70)){
        recargo = precioBase * 0.05;
    }
    return recargo;
}

function getEdad(dateString) {
    var hoy = new Date()
    var fechaNacimiento = new Date(dateString)
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
    var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--
    }
    return edad
  }