using backend.Models;
using Microsoft.EntityFrameworkCore;
namespace backend.Data
{
    public class KlijentKontekst : DbContext
    {
        public KlijentKontekst(){}
    public KlijentKontekst(DbContextOptions<KlijentKontekst> options) : base(options) { }
        public DbSet<Klijent> Klijenti { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}