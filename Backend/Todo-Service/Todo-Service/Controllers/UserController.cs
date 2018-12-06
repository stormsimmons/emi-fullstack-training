using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Todo_Domain.Interfaces;
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
	}
}