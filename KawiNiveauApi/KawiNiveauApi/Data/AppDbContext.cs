using Microsoft.EntityFrameworkCore;
using KawiNiveauApi.Models;

namespace KawiNiveauApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Lesson> Lessons { get; set; } 
    public DbSet<User> Users { get; set; } 
    public DbSet<ProgressRecord> ProgressRecords { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
}