using MongoDB.Bson;
using System;
using System.Collections.Generic;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;
using Todo_Domain.Repositories;
using Xunit;

namespace Todo_Domain_IntegrationTests
{
	[Trait("Category", "Integration")]
	public class UserMongoRespoitoryTests : IDisposable 
	{
		private IUserRepository _userRepository;
		private const string _connectionString = "mongodb://localhost:27017/";
		private User _user;

		public UserMongoRespoitoryTests()
		{
			_userRepository = new UserMongoRepository(_connectionString);

			_user = new User(firstName: "Storm", lastName: "Simmons", userName: "StormSimmons", password: "password")
			{
				 Id = new ObjectId()
			};

			_userRepository.Insert(_user);

		}

		[Fact]
		public void GetOne_ValidInput_ReturnsUser()
		{
			User result = _userRepository.GetOne(userName: _user.UserName);
			//Assert
			Assert.Equal(_user.UserName, result.UserName);
		}

		[Fact]
		public void List_ValidInput_ReturnsUser()
		{
			IList<User> result = _userRepository.List();
			//Assert
			Assert.NotEqual(0, result.Count);
		}

		public void Dispose()
		{
			_userRepository.Delete(_user.Id);
		}
	}
}
