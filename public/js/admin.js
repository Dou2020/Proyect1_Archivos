modificarUser = async (id, estado) => {
    $.ajax({
        type: 'GET',
        url: await "/estadoUsuario?usuario="+id+"&estado="+estado,
        success: function () {
            //document.getElementById(id).innerHTML = !estado ;
        }
    }).fail(function () {
        alert("error");
    });
}