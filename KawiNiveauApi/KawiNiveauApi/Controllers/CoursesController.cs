using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KawiNiveauApi.Data;
using KawiNiveauApi.DTOs;
using KawiNiveauApi.Models;

namespace KawiNiveauApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CoursesController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetCourses()
        {
            var role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

            IQueryable<Course> query = _context.Courses;

            if (role != "Admin")
                query = query.Where(c => c.IsPublished);

            var courses = await query.ToListAsync();
            return Ok(courses);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourse(int id)
        {
            var role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            var course = await _context.Courses
                .Where(c => c.Id == id)
                .Select(c => new
                {
                    c.Id,
                    c.Title,
                    c.Description,
                    c.ThumbnailUrl,
                    c.Price,
                    c.IsFree,
                    c.Category,
                    c.Level,
                    c.IsPublished,
                    c.CreatedAt,
                    Lessons = c.Lessons
                        .OrderBy(l => l.order)
                        .Select(l => new
                        {
                            l.Id,
                            l.title,
                            l.content,
                            l.order,
                            l.CourseId
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (course == null)
                return NotFound();

            if (role != "Admin")
            {
                if (!course.IsPublished)
                    return Forbid();

                if (userIdClaim == null)
                    return Unauthorized();

                var userId = int.Parse(userIdClaim);

                var enrolled = await _context.Enrollments.AnyAsync(e =>
                    e.UserId == userId &&
                    e.CourseId == id &&
                    e.Status == "Active");

                if (!enrolled)
                    return Forbid();
            }

            return Ok(course);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateCourse(CreateCourseDto dto)
        {
            var course = new Course
            {
                Title = dto.Title,
                Description = dto.Description,
                ThumbnailUrl = dto.ThumbnailUrl,
                Price = dto.IsFree ? 0 : dto.Price,
                IsFree = dto.IsFree,
                Category = dto.Category,
                Level = dto.Level,
                IsPublished = dto.IsPublished
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            return Ok(course);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCourse(int id, CreateCourseDto dto)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                return NotFound();

            course.Title = dto.Title;
            course.Description = dto.Description;
            course.ThumbnailUrl = dto.ThumbnailUrl;
            course.Price = dto.IsFree ? 0 : dto.Price;
            course.IsFree = dto.IsFree;
            course.Category = dto.Category;
            course.Level = dto.Level;
            course.IsPublished = dto.IsPublished;

            await _context.SaveChangesAsync();

            return Ok(course);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
                return NotFound();

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
