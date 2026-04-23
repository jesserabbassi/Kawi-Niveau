using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KawiNiveauApi.Data;

namespace KawiNiveauApi.Controllers
{
    [ApiController]
    [Route("api/admin/analytics")]
    [Authorize(Roles = "Admin")]
    public class AdminAnalyticsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminAnalyticsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAnalytics()
        {
            var totalUsers = await _context.Users.CountAsync();
            var activeUsers = await _context.Users.CountAsync(u => u.IsActive);
            var totalCourses = await _context.Courses.CountAsync();
            var publishedCourses = await _context.Courses.CountAsync(c => c.IsPublished);
            var totalEnrollments = await _context.Enrollments.CountAsync();
            var totalCompletedLessons = await _context.ProgressRecords.CountAsync(p => p.IsCompleted);

            return Ok(new
            {
                totalUsers,
                activeUsers,
                totalCourses,
                publishedCourses,
                totalEnrollments,
                totalCompletedLessons
            });
        }
    }
}