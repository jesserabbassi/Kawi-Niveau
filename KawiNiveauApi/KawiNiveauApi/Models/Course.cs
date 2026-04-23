namespace KawiNiveauApi.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";

        public string ThumbnailUrl { get; set; } = "";
        public decimal Price { get; set; }
        public bool IsFree { get; set; }
        public string Category { get; set; } = "";
        public string Level { get; set; } = "";
        public bool IsPublished { get; set; }

        public List<Lesson> Lessons { get; set; } = new();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<Enrollment> Enrollments { get; set; } = new();
    }
}