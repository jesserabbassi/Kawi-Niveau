namespace KawiNiveauApi.DTOs
{
    public class UpdateProgressDto
    {
        public int UserId { get; set; }
        public int LessonId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
