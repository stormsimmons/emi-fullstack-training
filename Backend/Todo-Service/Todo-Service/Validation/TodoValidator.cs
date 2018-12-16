using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo_Service.Dtos;

namespace Todo_Service.Validation
{
	public class TodoValidator : AbstractValidator<TodoDto>
	{
		public TodoValidator()
		{
			RuleFor(x => x.Name).NotNull();
			RuleFor(x => x.UserName).NotNull();
			RuleFor(x => x.Status).NotNull();
		}
	}
}
