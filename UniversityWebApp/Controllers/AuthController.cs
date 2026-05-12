using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UniversityWebApp.Models;
using UniversityWebApp.DTOs;
using UniversityWebApp.Database; // 1. Added this to access your ApplicationDbContext

namespace UniversityWebApp.Controllers;

[Route("auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context; // 2. Added the Database Context

    // 3. Injected ApplicationDbContext into the constructor
    public AuthController(UserManager<User> userManager, IConfiguration configuration, ApplicationDbContext context)
    {
        _userManager = userManager;
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto model)
    {
        var user = new User
        {
            UserName = model.Email,
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
            PhoneNumber = model.PhoneNumber,
            Role = "Student" // Standard users default to Student role
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            // 4. THE MAGIC: Auto-create the blank Student record!
            var newStudent = new Student
            {
                Name = $"{model.FirstName} {model.LastName}", // Combine first and last name
                UserId = user.Id, // Link this student exactly to the newly created login account
                Major = null, // Leave empty initially
                DepartmentId = null // Leave empty for the Admin to assign later
            };

            _context.Students.Add(newStudent);
            await _context.SaveChangesAsync(); // Save the new student to the database

            var token = GenerateJwtToken(user);
            SetTokenCookie(token);
            return Ok(new { Message = "User and Student Profile registered successfully" });
        }
        return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null) return BadRequest(new { Message = "Invalid email or password" });

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, model.Password);
        if (!isPasswordValid) return BadRequest(new { Message = "Invalid email or password" });

        var token = GenerateJwtToken(user);
        SetTokenCookie(token);
        
        // This sends the Role back to React so we know if they are an Admin or Student!
        return Ok(new { Message = "Login successful", Role = user.Role });
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private void SetTokenCookie(string token)
    {
        Response.Cookies.Append("jwt", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddHours(1)
        });
    }
}