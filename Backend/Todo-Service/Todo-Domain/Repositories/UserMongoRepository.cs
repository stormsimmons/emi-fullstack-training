using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;

namespace Todo_Domain.Repositories
{
	public class UserMongoRepository : IUserRepository
	{
		private IMongoClient _client;
		private IMongoDatabase _db;
		private readonly string _connectionString;

		public UserMongoRepository(string connectionString)
		{
			_connectionString = connectionString;
			_client = new MongoClient(_connectionString);

			_db = _client.GetDatabase("UserDB");
		}
		public User GetOne(string userName)
		{
			var collection = _db.GetCollection<User>("User");

			return collection.Find(new FilterDefinitionBuilder<User>()
										   .Eq((x) => x.UserName, userName)).FirstOrDefault();

		}
		public User Insert(User user)
		{
			var collection = _db.GetCollection<User>("User");

			var existing = GetOne(user.UserName);

			if (existing == null)
			{
				user.Id = ObjectId.GenerateNewId();
				collection.InsertOne(user);
			}

			return user;
		}

		public void Delete(ObjectId id)
		{
			var collection = _db.GetCollection<User>("User");

			collection.DeleteOne(new FilterDefinitionBuilder<User>()
										   .Eq((x) => x.Id, id));

		}

		public IList<User> List()
		{
			var collection = _db.GetCollection<User>("User");

			return collection.Find(FilterDefinition<User>.Empty).ToList();
		}
	}
}
