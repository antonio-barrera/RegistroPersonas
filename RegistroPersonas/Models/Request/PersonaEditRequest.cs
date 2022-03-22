using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegistroPersonas.Models.Request
{
    public class PersonaEditRequest
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Direccion { get; set; }
        public string Correo { get; set; }

        public int Edad { get; set; }
    }
}
