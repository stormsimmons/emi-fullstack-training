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
	public class TodoMongoRepositoryTests : IDisposable
	{
		private ITodoRepository _todoRepository;
		private const string _connectionString = "mongodb://localhost:27017/";
		private const string _userName = "StormSimmons";
		private Todo _testTodo;

		public TodoMongoRepositoryTests()
		{
			_todoRepository = new TodoMongoRepository(_connectionString);
			_testTodo = new Todo(name: "Build Fontend", status: "Todo", createdAt: DateTime.Now, userName: _userName)
			{
				Id = new ObjectId()
			};

			_todoRepository.Insert(_testTodo);
		}

		[Fact]
		public void Insert_ValidInput_ReturnsResult()
		{
			//Act
			Todo result = _todoRepository.Insert(_testTodo);
			//Assert
			Assert.Equal(_testTodo.UserName, result.UserName);
		}

		[Fact]
		public void GetOne_ValidInput_ReturnsResult()
		{
			//Act
			Todo result = _todoRepository.GetOne(id: (ObjectId)_testTodo.Id);
			//Assert
			Assert.Equal(_userName, result.UserName);
		}

		[Fact]
		public void List_ValidInput_ReturnsResult()
		{
			//Act
			IList<Todo> result = _todoRepository.List();
			//Assert
			Assert.True(result.Count > 0);
		}

		[Fact]
		public void ListByUser_ValidInput_ReturnsResult()
		{
			//Act
			IList<Todo> result = _todoRepository.ListByUser(userName:_userName);
			//Assert
			Assert.True(result.Count > 0);
		}

		[Fact]
		public void Delete_ValidInput_ReturnsResult()
		{
			//Act
			var initial = _todoRepository.GetOne((ObjectId)_testTodo.Id);

			 _todoRepository.Delete(id: (ObjectId)_testTodo.Id);

			var deleted = _todoRepository.GetOne((ObjectId)_testTodo.Id);

			//Assert
			Assert.True(initial != null);
			Assert.True(deleted == null);
		}

		public void Dispose()
		{
			_todoRepository.Delete(id: (ObjectId)_testTodo.Id);
		}
	}
}
