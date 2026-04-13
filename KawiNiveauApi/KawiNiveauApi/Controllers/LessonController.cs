using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KawiNiveauApi.Data;
using KawiNiveauApi.Models;
using KawiNiveauApi.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Authorization;


namespace KawiNiveauApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : ControllerBase
    {

        private readonly AppDbContext _appDbContext;

        public LessonController(AppDbContext context)
        {
            _appDbContext = context;
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetLesson()
        {
            var lesson = await _appDbContext.Lessons.ToListAsync();
            return Ok(lesson);
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLesson(int id)
        {
            var lesson = await _appDbContext.Lessons.FindAsync(id);
            if (lesson == null)
                return NotFound();
            return Ok(lesson);
        }
        [Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateLesson(CreateLessonDto dto)
        {
            var courseExists = await _appDbContext.Courses.AnyAsync(_ => _.Id == dto.CourseId);
            if (!courseExists)
                return BadRequest(string.Format("Course With Id = {} Nto Found", dto.CourseId));
            var lesson = new Lesson()
            {
                title = dto.Title,
                content = dto.Content,
                order = dto.Order,
                CourseId = dto.CourseId
            };
            _appDbContext.Lessons.Add(lesson);
            await _appDbContext.SaveChangesAsync();
            return Ok(lesson);
        }
        [Authorize(Roles = "Admin")]

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLesson(int id,CreateLessonDto dto)
        {
            var lesson = await _appDbContext.Lessons.FindAsync(id);
            if(lesson == null)
                return NotFound();

            var courseExists = await _appDbContext.Courses.AnyAsync(_ => _.Id == dto.CourseId);
            if(!courseExists)
                return BadRequest(string.Format("Course With Id = {} Nto Found",dto.CourseId));
            lesson.title = dto.Title;
            lesson.content = dto.Content;
            lesson.order = dto.Order;
            lesson.CourseId = dto.CourseId;
            await _appDbContext.SaveChangesAsync();
            return Ok(lesson);
        }
        [Authorize(Roles = "Admin")]

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLesson(int id)
        {
            var lesson = await _appDbContext.Lessons.FindAsync(id);
            if(lesson==null)
                return NotFound();
            _appDbContext.Lessons.Remove(lesson);
            await _appDbContext.SaveChangesAsync();
            return Ok(lesson);
        }
    }
}
