using System;
using System.Collections.Generic;

namespace RegistroPersonas.Models
{
    public partial class Persona
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Direccion { get; set; }
        public string? Correo { get; set; }
        public int? Edad { get; set; }
    }
}
