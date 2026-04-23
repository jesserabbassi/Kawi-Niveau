using System.ComponentModel.DataAnnotations;

namespace KawiNiveauApi.DTOs
{
    public class CreateCourseDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = "";

        [Required]
        [MaxLength(500)]
        public string Description { get; set; } = "";

        public string ThumbnailUrl { get; set; } = "";

        [Range(0, 999999)]
        public decimal Price { get; set; }

        public bool IsFree { get; set; }

        [MaxLength(50)]
        public string Category { get; set; } = "";

        [MaxLength(30)]
        public string Level { get; set; } = "";

        public bool IsPublished { get; set; }
    }
}