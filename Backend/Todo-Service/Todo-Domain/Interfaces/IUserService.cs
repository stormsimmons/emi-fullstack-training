using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using Todo_Domain.Enums;
using Todo_Domain.Models;

namespace Todo_Domain.Interfaces
{
	public interface IUserService
	{
		User GetUser(string userName);
		User InsertUser(User user);
		IList<User> GetAll();
		LoginStatus VarifyCredentials(string username, string password);
		bool CheckUserName(string userName);
	}
}
