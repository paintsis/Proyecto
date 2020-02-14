//declaracion de variables
var nombre;
var diaNacimiento;
var mesNacimiento;
var anioNacimiento;
var conyuge;
var edadConyuge;
var hijos;
var cantidadHijos;
const precioBase  = 250;
const comision = precioBase * 0.3;
var total = 0;
function calcular(){
    total = 0;
    document.getElementById('total').innerHTML = total;

    nombre = document.getElementById('nombre').value;
    diaNacimiento = document.getElementById('day').value;
    mesNacimiento = document.getElementById('mont').value;
    anioNacimiento = document.getElementById('year').value;
    conyuge = document.getElementsByName('conyuge');
    recargo = 0;
    for (var i = 0, length = conyuge.length; i < length; i++) {
        if (conyuge[i].checked) {
            conyuge = conyuge[i].value;
            if(conyuge == 1){
                edadConyuge = document.getElementById('edadConyu').value;
                recargo += recargoConyuge(edadConyuge);
            }
        break;
     }
    }
    hijos = document.getElementsByName('hijos');
    for (var i = 0, length = hijos.length; i < length; i++) {
        if (hijos[i].checked) {
            hijos = hijos[i].value;
            if(hijos == 1){
                cantidadHijos = document.getElementById('numHijos').value;
                recargo += precioBase * 0.01;
                document.getElementById('montoHijos').innerHTML = precioBase * 0.01;
            }
        break;
     }
    }
    recargo += recargoAsegurado(getEdad(anioNacimiento + '\/' + mesNacimiento + '\/' + diaNacimiento));

    total = precioBase + comision + recargo;
    document.getElementById('total').innerHTML = total;
    generatePdf('hola',nombre);
}

function generatePdf(title, contenido){
    var doc = new jsPDF('p', 'pt','letter');
    var res = doc.autoTableHtmlToJson(document.getElementById("tableDetalle"));
    doc.autoTable(res.columns, res.data, {margin: {top: 80}});
  
    var header = function(data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      //doc.text("Aseguradora TK-U", data.settings.margin.left, 50);
    };

    doc.setFontSize(22);
    doc.text(50, 50, 'Aseguradora TK-U');
    doc.setFontSize(14);
    doc.text(50, 75, 'Nombre: ' + contenido); 

      var options = {
      beforePageContent: header,
      margin: {
        top: 150
      },
      startY: doc.autoTableEndPosY() + 50
    };
  
    doc.save("table.pdf");
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
    document.getElementById('montoEdad').innerHTML = recargo;

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
    document.getElementById('montoConyuge').innerHTML = recargo;
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
