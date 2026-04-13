using System.ComponentModel.DataAnnotations;

namespace KawiNiveauApi.DTOs
{
    public class CreateLessonDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = "";

        [Required]
        public string Content { get; set; } = "";

        [Range(1, int.MaxValue)]
        public int Order { get; set; }

        [Range(1, int.MaxValue)]
        public int CourseId { get; set; }
    }
}