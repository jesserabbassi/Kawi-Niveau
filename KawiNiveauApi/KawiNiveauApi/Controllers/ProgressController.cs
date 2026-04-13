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
    public class ProgressController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProgressController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("complete")]
        public async Task<IActionResult> UpdateProgress(UpdateProgressDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var lessonExists = await _context.Lessons.AnyAsync(l => l.Id == dto.LessonId);
            if (!lessonExists)
                return BadRequest("Lesson does not exist.");

            var progress = await _context.ProgressRecords
                .FirstOrDefaultAsync(p => p.UserId == userId && p.LessonId == dto.LessonId);

            if (progress == null)
            {
                progress = new ProgressRecord
                {
                    UserId = userId,
                    LessonId = dto.LessonId,
                    IsCompleted = dto.IsCompleted,
                    CompletedAt = dto.IsCompleted ? DateTime.UtcNow : null
                };

                _context.ProgressRecords.Add(progress);
            }
            else
            {
                progress.IsCompleted = dto.IsCompleted;
                progress.CompletedAt = dto.IsCompleted ? DateTime.UtcNow : null;
            }

            await _context.SaveChangesAsync();

            return Ok(progress);
        }

        [HttpGet("my")]
        public async Task<IActionResult> GetMyProgress()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null)
                return Unauthorized();

            var userId = int.Parse(userIdClaim);

            var progress = await _context.ProgressRecords
                .Include(p => p.Lesson)
                .Where(p => p.UserId == userId)
                .ToListAsync();

            return Ok(progress);
        }
    }
}