using MongoDB.Bson;
using System;

namespace Todo_Service.Dtos
{
	public class TodoDto
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public string Status { get; set; }
		public DateTime? CreatedAt { get; set; }
		public string UserName { get; set; }
		public DateTime? LastUpdatedAt { get; set; }
		public DateTime? CompletedAt { get; set; } 
	}
}
