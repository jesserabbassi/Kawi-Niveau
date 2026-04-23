namespace KawiNiveauApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        public string PasswordHash { get; set; } = "";
        public string Role { get; set; } = "Student"; // Default role is "Student"
        public List<ProgressRecord> ProgressRecords { get; set; } = new();
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Enrollment> Enrollments { get; set; } = new();

    }
}
