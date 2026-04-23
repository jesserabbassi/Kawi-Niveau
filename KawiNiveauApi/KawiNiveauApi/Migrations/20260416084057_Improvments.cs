using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KawiNiveauApi.Migrations
{
    /// <inheritdoc />
    public partial class Improvments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Courses",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsPublished",
                table: "Courses",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<float>(
                name: "Price",
                table: "Courses",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "ThumbnailUrl",
                table: "Courses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "IsPublished",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "ThumbnailUrl",
                table: "Courses");
        }
    }
}
