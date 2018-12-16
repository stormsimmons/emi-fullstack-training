using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Todo_Service.Dtos;

namespace Todo_Service.Validation
{
	public class UserValidator : AbstractValidator<UserDto>
	{
		public UserValidator()
		{
			RuleFor(x => x.UserName).NotNull();
		}
	}
}
