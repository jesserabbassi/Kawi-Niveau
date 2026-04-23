using System.Security.Claims;
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
    [Authorize]
    public class EnrollmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EnrollmentsController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateEnrollment(CreateEnrollmentDto dto)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == dto.UserId);
            if (!userExists)
                return BadRequest("User does not exist.");

            var courseExists = await _context.Courses.AnyAsync(c => c.Id == dto.CourseId);
            if (!courseExists)
                return BadRequest("Course does not exist.");

            var alreadyEnrolled = await _context.Enrollments
                .AnyAsync(e => e.UserId == dto.UserId && e.CourseId == dto.CourseId);

            if (alreadyEnrolled)
                return BadRequest("User already enrolled in this course.");

            var enrollment = new Enrollment
            {
                UserId = dto.UserId,
                CourseId = dto.CourseId,
                Status = "Active"
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            return Ok(enrollment);
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyEnrollments()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var enrollments = await _context.Enrollments
                
                .Where(e => e.UserId == userId && e.Status == "Active")
                .Select(
                    e => new
                    {
                        e.Id,
                        e.CourseId ,
                        e.UserId,
                        CourseTitle=e.Course!=null?e.Course.Title:null,
                        e.Status,
                        e.EnrolledAt
                    }
                )
                .ToListAsync();

            return Ok(enrollments);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllEnrollments()
        {
            var enrollments = await _context.Enrollments
                .Select(e => new
                {
                    e.Id,
                    e.UserId,
                    e.CourseId,
                    e.EnrolledAt,
                    e.Status,
                    User = e.User == null ? null : new
                    {
                        e.User.Id,
                        e.User.FullName,
                        e.User.Email,
                        e.User.Role,
                        e.User.IsActive,
                        e.User.CreatedAt
                    },
                    Course = e.Course == null ? null : new
                    {
                        e.Course.Id,
                        e.Course.Title,
                        e.Course.Description,
                        e.Course.ThumbnailUrl,
                        e.Course.Price,
                        e.Course.IsFree,
                        e.Course.Category,
                        e.Course.Level,
                        e.Course.IsPublished,
                        e.Course.CreatedAt
                    }
                })
                .ToListAsync();

            return Ok(enrollments);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEnrollment(int id)
        {
            var enrollment = await _context.Enrollments.FindAsync(id);

            if (enrollment == null)
                return NotFound();

            _context.Enrollments.Remove(enrollment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
