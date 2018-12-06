﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Todo_Domain.Enums;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;
using Todo_Service.Requests;
using Todo_Service.Responses;

namespace Todo_Service.Controllers
{

	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : Controller
	{
		private readonly IUserService _userService;
		public AccountController(IUserService userService)
		{
			_userService = userService;
		}

		[HttpPost("login")]
		public IActionResult Login([FromBody]LoginRequest request)
		{
			var userStatus = _userService.VarifyCredentials(request.Username, request.Password);
			if (userStatus != LoginStatus.Valid)
			{
				var error = new
				{
					Error = Enum.GetName(typeof(LoginStatus), userStatus)
				};

				if(userStatus == LoginStatus.IncorrectUserName)
				{
					return NotFound(error);
				}
				return BadRequest(error);
			}

			var user = _userService.GetUser(request.Username);

			var response = new TokenResponse
			{
				AccessToken = GetToken(user)
		    };

			return Json(response);
		}

		private string GetToken(User user)
		{
			string secret = "XCAP05H6LoKvbRRa/QkqLNMI7cOHguaRyHzyg7n5qEkGjQmtBhz4SzYh4Fqwjyi3KJHlSXKPwVu2+bXr6CtpgQ==";
			byte[] key = Convert.FromBase64String(secret);
			SymmetricSecurityKey securityKey = new SymmetricSecurityKey(key);
			SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[] {
					new Claim("user_name", user.UserName),
					new Claim("first_name", user.FirstName),
					new Claim("last_name", user.LastName),
					new Claim("sub", user.Id.ToString())}),

				Expires = DateTime.UtcNow.AddMinutes(120),
				SigningCredentials = new SigningCredentials(securityKey,
				SecurityAlgorithms.HmacSha256Signature)
			};

			JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
			JwtSecurityToken token = handler.CreateJwtSecurityToken(descriptor);
			return handler.WriteToken(token);
		}
	}
}