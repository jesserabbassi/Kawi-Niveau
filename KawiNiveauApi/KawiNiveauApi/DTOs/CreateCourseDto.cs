using System.ComponentModel.DataAnnotations;

namespace KawiNiveauApi.DTOs
{
    public class CreateCourseDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = "";
        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = "";
    }
}