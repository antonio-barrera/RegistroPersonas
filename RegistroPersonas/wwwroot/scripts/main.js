var url = "https://formulariopersonas.herokuapp.com/api/Persona";

Get();

function Guardar() {
    if (document.getElementById("Id").value != "") {
        Edit();
    } else {
        Post();
    }
}

function Post() {
    fetch(url, {
        method: "POST",
        body: JSON.stringify({
            Nombre: document.getElementById("Nombre").value,
            Direccion: document.getElementById("Direccion").value,
            Correo: document.getElementById("Correo").value,
            Edad: document.getElementById("Edad").value
        }),
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            return response.text();
        } else {
            alert("Error al ejecutar solicitud");
        }
    }).then(function (Data) {
        console.log(Data);
        Get();
        document.getElementById("Id").value = "";
        document.getElementById("Nombre").value = "";
        document.getElementById("Direccion").value = "";
        document.getElementById("Correo").value = "";
        document.getElementById("Edad").value = "";
    })
}

function Delete(id) {
    fetch(url, {
        method: "DELETE",
        body: JSON.stringify({
            Id: id,
            Nombre: "",
            Direccion: "",
            Correo: "",
            Edad: 0
        }),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            return response.text();
        } else {
            alert("Error al ejecutar solicitud");
        }
    }).then(function (Data) {
        console.log(Data);
        Get();
    })
}

function OpenEdit(Id, Nombre, Direccion, Correo, Edad) {
    document.getElementById("Id").value = Id;
    document.getElementById("Nombre").value = Nombre;
    document.getElementById("Direccion").value = Direccion;
    document.getElementById("Correo").value = Correo;
    document.getElementById("Edad").value = Edad;
}

function Edit() {
    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            Id: document.getElementById("Id").value,
            Nombre: document.getElementById("Nombre").value,
            Direccion: document.getElementById("Direccion").value,
            Correo: document.getElementById("Correo").value,
            Edad: document.getElementById("Edad").value,
        }),
        headers: {
            'Accept': "application/json",
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            return response.text();
        } else {
            alert("Error al ejecutar solicitud");
        }
    }).then(function (Data) {
        console.log(Data);
        Get();
        document.getElementById("Id").value = "";
        document.getElementById("Nombre").value = "";
        document.getElementById("Direccion").value = "";
        document.getElementById("Correo").value = "";
        document.getElementById("Edad").value = "";
    })
}


function Get() {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (Data) {
        document.getElementById("divLista").innerHTML = "";
        for (i = 0; i < Data.length; i++) {
            let divElement = document.createElement("li");
            let divSpan = document.createElement("span");
            let divButtonDelete = document.createElement("button");
            let divButtonEdit = document.createElement("button");
            divSpan.innerHTML = Data[i].nombre;
            divButtonDelete.innerHTML = "Eliminar";
            divButtonDelete.MiId = Data[i].id;
            divButtonDelete.addEventListener("click", function (mibutton) {
                Delete(mibutton.target.MiId);
            })
            divButtonEdit.innerHTML = "Editar";
            divButtonEdit.MiId = Data[i].id;
            divButtonEdit.MiNombre = Data[i].nombre;
            divButtonEdit.MiDireccion = Data[i].direccion;
            divButtonEdit.MiCorreo = Data[i].correo;
            divButtonEdit.MiEdad = Data[i].edad;
            divButtonEdit.addEventListener("click", function (mibutton) {
                OpenEdit(
                    mibutton.target.MiId,
                    mibutton.target.MiNombre,
                    mibutton.target.MiDireccion,
                    mibutton.target.MiCorreo,
                    mibutton.target.MiEdad
                );
            })
            divElement.appendChild(divSpan);
            divElement.appendChild(divButtonDelete);
            divElement.appendChild(divButtonEdit);
            document.getElementById("divLista").appendChild(divElement);
            divElement.classList.add("list-group-item", "row", "px-5");
            divSpan.classList.add("fs-5", "col-md-6", "mb-2");
            divButtonDelete.classList.add("btn", "btn-danger", "col-md-3");
            divButtonEdit.classList.add("btn", "btn-warning", "col-md-3");
        }

    })
}
