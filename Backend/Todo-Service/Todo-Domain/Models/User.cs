using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Todo_Domain.Models
{
	public class User
	{
		public User(string firstName, string lastName, string userName, string password)
		{
			FirstName = firstName;
			LastName = lastName;
			UserName = userName;
			Password = password;
		}

		[BsonElement("_id")]
		public ObjectId? Id { get; set; }
		[BsonElement("firstName")]
		public string FirstName { get; set; }
		[BsonElement("lastName")]
		public string LastName { get; set; }
		[BsonElement("userName")]
		public string UserName { get; set; }
		[BsonElement("password")]
		public string Password { get; set; }
	}
}
