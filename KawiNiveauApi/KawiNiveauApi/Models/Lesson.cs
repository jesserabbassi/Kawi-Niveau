namespace KawiNiveauApi.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string title { get; set; } = "";
        public string content { get; set; } = "";
        public int order { get; set; }

        public int CourseId {  get; set; }
        public Course? Course { get; set; }
        public List<ProgressRecord> ProgressRecords { get; set; } = new();

    }
}
