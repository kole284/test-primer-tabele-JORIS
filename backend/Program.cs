using backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using backend.Data;
namespace backend{
    public class Program{
        public static void Main(string[] args){
      
            var builder=WebApplication.CreateBuilder(args);
            // Registracija DbContext-a
            builder.Services.AddDbContext<KlijentKontekst>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Registracija interfejsa i njegove implementacije
            builder.Services.AddScoped<IRepozitorijumKlijenata, RepozitorijumKlijenata>();
        
            builder.Services.AddControllers();

            const string MyAllowSpecificOrigins="_myAllowSpecificOrigins";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // Use a colon here
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
           var app=builder.Build();
           
           app.UseHttpsRedirection();
           app.UseCors(MyAllowSpecificOrigins);
           app.UseAuthorization();
           app.MapControllers();
           app.Run();
        }
    }

}

