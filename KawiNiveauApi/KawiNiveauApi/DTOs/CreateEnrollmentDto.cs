using System.ComponentModel.DataAnnotations;

namespace KawiNiveauApi.DTOs
{
    public class CreateEnrollmentDto
    {
        [Range(1, int.MaxValue)]
        public int UserId { get; set; }

        [Range(1, int.MaxValue)]
        public int CourseId { get; set; }
    }
}