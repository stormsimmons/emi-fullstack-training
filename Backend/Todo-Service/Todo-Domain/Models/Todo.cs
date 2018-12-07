using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace Todo_Domain.Models
{
	public class Todo
	{
		public Todo(string name, string status, DateTime createdAt, string userName)
		{
			Name = name;
			Status = status;
			CreatedAt = createdAt;
			UserName = userName;
		}

		public ObjectId? Id{ get; set; }
		public string Name { get; set; }
		public string Status { get; set; }
		public DateTime? CreatedAt { get; set; }
		public string UserName { get; set; }
		public DateTime? LastUpdatedAt { get; set; } = null;
		public DateTime? CompletedAt{ get; set; } = null;
	}
}
