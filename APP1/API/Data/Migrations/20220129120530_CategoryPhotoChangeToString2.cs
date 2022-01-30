using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class CategoryPhotoChangeToString2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Photos_PhotoId",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Category_PhotoId",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "PhotoId",
                table: "Category");

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "Category",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "Category");

            migrationBuilder.AddColumn<int>(
                name: "PhotoId",
                table: "Category",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Category_PhotoId",
                table: "Category",
                column: "PhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Photos_PhotoId",
                table: "Category",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
