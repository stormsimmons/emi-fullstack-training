using MongoDB.Bson;
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
		public ObjectId? Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string UserName { get; set; }
		public string Password { get; set; }
	}
}
