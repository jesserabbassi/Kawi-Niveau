using System.ComponentModel.DataAnnotations;

namespace KawiNiveauApi.DTOs
{
    public class UpdateUserRoleDto
    {
        [Required]
        public string Role { get; set; } = "";
    }
}