using backend.Models;
namespace backend.Services{
    public interface IRepozitorijumKlijenata
    {
        void DodajKlijenta(Klijent klijent);
        List<Klijent> VratiSveKlijente();
        Klijent VratiKlijenta(int id);
        void AzurirajKlijenta(int id,Klijent klijent);
        void ObrisiKlijenta(int id);
        void DeaktivirajKlijenta(int id);
    }
}