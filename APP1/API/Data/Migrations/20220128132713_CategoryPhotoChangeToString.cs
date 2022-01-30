using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class CategoryPhotoChangeToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Category_CategoryName",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_CategoryName",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "Photos");

            migrationBuilder.AddColumn<string>(
                name: "PhotoPublicId",
                table: "Category",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoPublicId",
                table: "Category");

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "Photos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CategoryName",
                table: "Photos",
                column: "CategoryName");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Category_CategoryName",
                table: "Photos",
                column: "CategoryName",
                principalTable: "Category",
                principalColumn: "CategoryName",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
