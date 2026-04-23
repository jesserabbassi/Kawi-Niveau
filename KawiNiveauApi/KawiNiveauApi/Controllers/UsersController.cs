using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KawiNiveauApi.Data;
using KawiNiveauApi.DTOs;

namespace KawiNiveauApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.FullName,
                    u.Email,
                    u.Role,
                    u.IsActive,
                    u.CreatedAt
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpPut("{id}/role")]
        public async Task<IActionResult> UpdateUserRole(int id, UpdateUserRoleDto dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            user.Role = dto.Role;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Role updated successfully." });
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateUserStatus(int id, UpdateUserStatusDto dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            user.IsActive = dto.IsActive;
            await _context.SaveChangesAsync();

            return Ok(new { message = "User status updated successfully." });
        }
    }
}