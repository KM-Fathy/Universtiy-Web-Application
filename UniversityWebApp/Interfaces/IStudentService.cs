using UniversityWebApp.Models;
namespace UniversityWebApp.Interfaces;

public interface IStudentService
{
    IEnumerable<Student> GetAll();
    Student? GetById(int id);
    void Add(Student student); 
    
    void Delete(int id);
}