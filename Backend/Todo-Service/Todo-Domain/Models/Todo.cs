using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
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
		[BsonElement("_id")]
		public ObjectId? Id{ get; set; }
		[BsonElement("name")]
		public string Name { get; set; }
		[BsonElement("status")]
		public string Status { get; set; }
		[BsonElement("createdAt")]
		public DateTime? CreatedAt { get; set; }
		[BsonElement("userName")]
		public string UserName { get; set; }
		[BsonElement("lastUpdatedAt")]
		public DateTime? LastUpdatedAt { get; set; } = null;
		[BsonElement("completedAt")]
		public DateTime? CompletedAt{ get; set; } = null;
	}
}
