using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UniversityWebApp.Migrations
{
    /// <inheritdoc />
    public partial class RemoveMajorColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Major",
                table: "Students");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Major",
                table: "Students",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
