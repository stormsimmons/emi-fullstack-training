using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;
using Todo_Domain.Models;

namespace Todo_Domain.Interfaces
{
	public interface ITodoRepository
	{
		Todo Insert(Todo todo);
		Todo GetOne(ObjectId id);
		void Delete(ObjectId id);
		IList<Todo> List();
		IList<Todo> ListByUser(string userName);
	}
}
