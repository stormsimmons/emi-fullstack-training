using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using Todo_Domain.Models;

namespace Todo_Domain.Interfaces
{
	public interface IUserRepository
	{
		User Insert(User user);
		User GetOne(string userName);
		void Delete(ObjectId id);
		IList<User> List();
	}
}
