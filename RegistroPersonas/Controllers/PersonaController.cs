using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RegistroPersonas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonaController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get()
        {
            using (Models.RegistroPersonasContext db = new Models.RegistroPersonasContext())
            {
                var lst = (from d in db.Personas
                           select d).ToList();

                return Ok(lst);
            }

        }

        [HttpPost]
        public ActionResult Post([FromBody] Models.Request.PersonaRequest model)
        {
            using (Models.RegistroPersonasContext db = new Models.RegistroPersonasContext())
            {
                Models.Persona oPersona = new Models.Persona();
                oPersona.Nombre = model.Nombre;
                oPersona.Direccion = model.Direccion;
                oPersona.Correo = model.Correo;
                oPersona.Edad = model.Edad;
                db.Personas.Add(oPersona);
                db.SaveChanges();
            }

            return Ok();
        }

        [HttpPut]
        public ActionResult Put([FromBody] Models.Request.PersonaEditRequest model)
        {
            using (Models.RegistroPersonasContext db = new Models.RegistroPersonasContext())
            {
                Models.Persona oPersona = db.Personas.Find(model.Id);
                oPersona.Nombre = model.Nombre;
                oPersona.Direccion = model.Direccion;
                oPersona.Correo = model.Correo;
                oPersona.Edad = model.Edad;
                db.Entry(oPersona).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
            }

            return Ok();
        }

        [HttpDelete]
        public ActionResult Delete([FromBody] Models.Request.PersonaEditRequest model)
        {
            using (Models.RegistroPersonasContext db = new Models.RegistroPersonasContext())
            {
                Models.Persona oPersona = db.Personas.Find(model.Id);
                db.Personas.Remove(oPersona);
                db.SaveChanges();
            }

            return Ok();
        }
    }
}