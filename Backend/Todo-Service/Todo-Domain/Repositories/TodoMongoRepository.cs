using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;

namespace Todo_Domain.Repositories
{
	public class TodoMongoRepository : ITodoRepository
	{
		private readonly string _connectionString;
		private IMongoClient _client;
		private IMongoDatabase _db;

		public TodoMongoRepository(string connectionString)
		{
			_connectionString = connectionString;

			_client = new MongoClient(_connectionString);

			_db = _client.GetDatabase("TodoDB");
		}

		public Todo GetOne(ObjectId id)
		{
			var collection = _db.GetCollection<Todo>("Todo");

			return collection.Find(new FilterDefinitionBuilder<Todo>()
										   .Eq((x) => x.Id, id)).FirstOrDefault();

		}

		public void Delete(ObjectId id)
		{
			var collection = _db.GetCollection<Todo>("Todo");

			 collection.DeleteOne(new FilterDefinitionBuilder<Todo>()
											.Eq((x) => x.Id, id));
											
		}

		public Todo Insert(Todo todo)
		{
			var collection = _db.GetCollection<Todo>("Todo");

			var existing = GetOne(todo.Id ?? new ObjectId());

			if (existing == null)
			{
				todo.Id = ObjectId.GenerateNewId();
				todo.CreatedAt = DateTime.Now;
				collection.InsertOne(todo);
			}

			return todo;
		}

		public IList<Todo> List()
		{
			var collection = _db.GetCollection<Todo>("Todo");

			return collection.Find(FilterDefinition<Todo>.Empty).ToList();
		}

		public IList<Todo> ListByUser(string userName)
		{
			var collection = _db.GetCollection<Todo>("Todo");

			return collection.Find(new FilterDefinitionBuilder<Todo>()
										   .Eq((x) => x.UserName, userName)).ToList();
		}

		public Todo Update(Todo todo)
		{
			var collection = _db.GetCollection<Todo>("Todo");

			collection.UpdateOne(new FilterDefinitionBuilder<Todo>()
										   .Eq((x) => x.Id, todo.Id),
										   new UpdateDefinitionBuilder<Todo>()
										   .Set(x => x.Status, todo.Status));
			return GetOne((ObjectId)todo.Id);

		}
	}
}
