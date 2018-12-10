using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Todo_Service.Dtos
{
	public class ErrorDto
	{
		public ErrorDto(string error)
		{
			Error = error;
		}
		public string Error { get; set; }
	}
}
