using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;
using Todo_Service.Dtos;

namespace Todo_Service.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class UserController : Controller
    {
		private readonly IUserService _userService;
		public UserController(IUserService userService)
		{
			_userService = userService;
		}

		[HttpGet]
		public IActionResult GetUsers()
        {
			var users = Mapper.Map<List<UserDto>>(_userService.GetAll());

			if(users.Count == 0)
			{
				return NoContent();
			}

			return Json(users);
        }


		[HttpGet("{username}")]
		public IActionResult GetUser(string username)
		{
			var user = Mapper.Map<UserDto>(_userService.GetUser(username));

			if (user == null)
			{
				return NotFound();
			}

			return Json(user);
		}

		[HttpPost]
		[AllowAnonymous]
		public IActionResult PostUser([FromBody]UserDto user)
		{
			var mappedUser = Mapper.Map<User>(user);

			var validUsername = _userService.CheckUserName(mappedUser.UserName);

			if (!validUsername)
			{
				return Conflict(new ErrorDto("Username already exists"));
			}

			var userReturned = _userService.InsertUser(mappedUser);

			return Json(userReturned);
		}
	}
}