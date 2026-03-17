namespace UniversityWebApp.DTOs
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<string> CourseTitles { get; set; }
    }
}