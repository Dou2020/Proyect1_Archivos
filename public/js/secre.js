modificarPaciente = async (id, estado) => {
    $.ajax({
        type: 'GET',
        url: await "/estadoPaciente?usuario="+id+"&estado="+estado,
        success: function () {
            //document.getElementById(id).innerHTML = !estado ;
        }
    }).fail(function () {
        
    });
}