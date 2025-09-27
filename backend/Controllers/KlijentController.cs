using backend.Services;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
namespace backend.Controllers{
    [ApiController]
    [Route("api/klijenti")]
    public class KlijentController : ControllerBase
    {
        private IRepozitorijumKlijenata _repozitorijumKlijenata;
        public KlijentController(IRepozitorijumKlijenata repozitorijumKlijenata){
            _repozitorijumKlijenata=repozitorijumKlijenata;
        }
        [HttpGet]
        public List<Klijent> VratiSveKlijente(){
            return _repozitorijumKlijenata.VratiSveKlijente();
        }
        [HttpGet("{Id}")]
        public Klijent VratiKlijenta(int Id){
            return _repozitorijumKlijenata.VratiKlijenta(Id);
        }
        [HttpPut("{Id}")]
        public IActionResult AzurirajKlijenta(int Id,[FromBody] Klijent klijent){
            try{
                _repozitorijumKlijenata.AzurirajKlijenta(Id,klijent);
                return NoContent();
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        public IActionResult DodajKlijenta([FromBody]Klijent klijent){
            try{
                _repozitorijumKlijenata.DodajKlijenta(klijent);
                return NoContent();
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpDelete("{Id}")]
        public IActionResult ObrisiKlijenta(int Id){
            try{
                _repozitorijumKlijenata.ObrisiKlijenta(Id);
                return NoContent();
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
        [HttpPut("{Id}/deaktiviraj")]
        public IActionResult DeaktivirajKlijenta(int id)
        {
            var klijent = _repozitorijumKlijenata.VratiKlijenta(id);
            if (klijent == null)
                return NotFound();

            _repozitorijumKlijenata.DeaktivirajKlijenta(id);
            return NoContent();
        }

    }
}