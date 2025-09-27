using System.ComponentModel.DataAnnotations;
namespace backend.Models{
    public class Klijent
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        public bool PoslovnoLice { get; set; }

        public DateTime? DatumKreiranja {get; set; }

        public bool Aktivan { get; set; }
        
        public DateTime? DatumDeaktivacije { get; set; }
    }
}