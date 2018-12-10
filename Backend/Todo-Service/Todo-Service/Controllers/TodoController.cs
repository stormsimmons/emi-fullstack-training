using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;
using Todo_Service.Dtos;

namespace Todo_Service.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class TodoController : Controller
    {
		private readonly ITodoRepository _todoRepository;
		public TodoController(ITodoRepository todoRepository)
		{
			_todoRepository = todoRepository;
		}

		[HttpGet]
        public IActionResult GetTodos()
        {
			var todos = Mapper.Map<List<TodoDto>>(_todoRepository.List());

			if (todos.Count == 0)
			{
				return NoContent();
			}

			return Json(todos);
		}
		[HttpGet("{id}")]
		public IActionResult GetTodo(string id)
		{
			var todo = Mapper.Map<TodoDto>(_todoRepository.GetOne(new ObjectId(id)));

			if (todo == null)
			{
				return NotFound();
			}

			return Json(todo);
		}

		[HttpGet("user/{userName}")]
		public IActionResult GetTodosByUser([FromRoute]string userName)
		{
			var todos = Mapper.Map<List<TodoDto>>(_todoRepository.ListByUser(userName));

			if (todos.Count == 0)
			{
				return NoContent();
			}

			return Json(todos);
		}

		[HttpPost]
		public IActionResult PostTodo([FromBody]TodoDto todo)
		{
			var mappedTodo= Mapper.Map<Todo>(todo);

			var todoReturned = _todoRepository.Insert(mappedTodo);

			return Json(todoReturned);
		}
		[HttpDelete("{id}")]
		public IActionResult Delete([FromRoute]string id)
		{
			 _todoRepository.Delete(new ObjectId(id));

			return Ok();
		}

		[HttpPut]
		public IActionResult Update([FromBody]TodoDto todo)
		{
			var updated = _todoRepository.Update(Mapper.Map<Todo>(todo));

			return Json(updated);
		}
	}
}