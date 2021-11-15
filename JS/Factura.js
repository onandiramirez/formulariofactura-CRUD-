var UrlGetFacturas = 'http://localhost:90/G6_20/controller/facturas.php?opciones=GetFacturas';
var UrlPostFacturas = 'http://localhost:90/G6_20/controller/facturas.php?opciones=InsertarFactura';
var UrlGetuno = 'http://localhost:90/G6_20/controller/facturas.php?opciones=Getuno';
var urlPutFactura = 'http://localhost:90/G6_20/controller/facturas.php?opciones=ActualizarFactura';
var UrlDeleteFactura = 'http://localhost:90/G6_20/controller/facturas.php?opciones=EliminarFactura';
$(document).ready(function(){
    cargatFacturas();

});
function cargatFacturas(){
    $.ajax({
        url:UrlGetFacturas,
        Type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var valores='';

            for(i=0; i< MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUBTOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="cargarFactura('+MiItems[i].ID +')">Editar</button>'+
                '<button class="btn-dark" onclick="EliminarFactura('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
              ' </tr>';
              $('.FACTURAS').html(valores);
            }
        }
    });
}

function Agregarfactura(){
    var datosfacturas = {
        NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_FACTURA:$('#FECHA_FACTURA').val(),
        DETALLE:$('#DETALLE').val(),
        SUBTOTAL:$('#SUBTOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
        ESTADO:$('#ESTADO').val()


    };

    var datosfacturasjson= JSON.stringify(datosfacturas);

    $.ajax({
        url: UrlPostFacturas,
        type: 'POST',
        data:datosfacturasjson,
        datatype:'JSON',
        contentype: 'application/json',
        success: function(response){
            console.log(response);
        }

    });
    alert("Nueva factura Agregada");

}


function cargarFactura(idfactura){
    var datosfactura = {
        ID:idfactura
    };
    var datosfacturajson= JSON.stringify(datosfactura)

    $.ajax({
        url: UrlGetuno,
        type: 'POST',
        data:datosfacturajson,
        datatype:'JSON',
        contentype: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUBTOTAL').val(MiItems[0].SUBTOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="Actualizarfactura('+ MiItems[0].ID+')"'+
            'value="Actualizar Factura" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}

function Actualizarfactura(idfactura){
    var datosfactura = {
        ID:idfactura,
        NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_FACTURA:$('#FECHA_FACTURA').val(),
        DETALLE:$('#DETALLE').val(),
        SUBTOTAL:$('#SUBTOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
        ESTADO:$('#ESTADO').val()
    };

    var datosfacturajson= JSON.stringify(datosfactura);

    $.ajax({
        url: urlPutFactura,
        type: 'PUT',
        data: datosfacturajson,
        datatype:'JSON',
        contentype: 'application/json',
        success: function(response){
            console.log(response);
        }



    });
    alert("Factura actualizada");

}
    function EliminarFactura(idfacturae){
        var datosfacturae = {
            ID:idfacturae

        };

        var datosfacturaejson=JSON.stringify(datosfacturae)
        $.ajax({
            url: UrlDeleteFactura,
            type: 'DELETE',
            data: datosfacturaejson,
            datatype: 'JSON',
            contentype: 'application/json',
            success:function(response){
                console.log(response);
            }

        });
        alert("Factura Eliminada");
    }