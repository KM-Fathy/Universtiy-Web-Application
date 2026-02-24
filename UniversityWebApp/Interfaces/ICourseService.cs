using System.Collections.Generic;
using UniversityWebApp.Models;

namespace UniversityWebApp.Interfaces
{
    public interface ICourseService
    {
        IEnumerable<Course> GetAll();
        Course GetById(int id);
        void Add(Course course);

        void Delete(int id);
    }
}