using backend.Models;
using backend.Services;
using backend.Data;
using System.Collections.Generic;
using System.Linq;
namespace backend.Services{

    public class RepozitorijumKlijenata:IRepozitorijumKlijenata{
        private readonly KlijentKontekst _kontekst;

        public RepozitorijumKlijenata(KlijentKontekst kontekst){
            _kontekst = kontekst;
        }
        public void DodajKlijenta(Klijent klijent){
            klijent.Aktivan=true;
            _kontekst.Klijenti.Add(klijent);
            _kontekst.SaveChanges();
        }
        public List<Klijent> VratiSveKlijente(){
            return _kontekst.Klijenti.ToList();
        }
        public Klijent VratiKlijenta(int id){
            return _kontekst.Klijenti.Find(id);
        }
        public void AzurirajKlijenta(int id, Klijent klijent){
            var existingKlijent = _kontekst.Klijenti.Find(id);
            if (existingKlijent != null){
                existingKlijent.Name = klijent.Name;
                existingKlijent.Email = klijent.Email;
                existingKlijent.Phone = klijent.Phone;
                _kontekst.Klijenti.Update(existingKlijent);
                _kontekst.SaveChanges();
            }
        }
        public void ObrisiKlijenta(int id){
            var klijent=_kontekst.Klijenti.Find(id);
            if(klijent!=null){
                _kontekst.Klijenti.Remove(klijent);
                _kontekst.SaveChanges();
            }
        }
        public void DeaktivirajKlijenta(int id){
            var klijent=_kontekst.Klijenti.Find(id);
            if(klijent!=null){
                klijent.Aktivan=false;
                klijent.DatumDeaktivacije=DateTime.Now;
                _kontekst.Klijenti.Update(klijent);
                _kontekst.SaveChanges();
            }
        }
    }
}