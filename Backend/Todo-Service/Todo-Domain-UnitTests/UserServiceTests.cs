using MongoDB.Bson;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Todo_Domain.Enums;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;
using Todo_Domain.Services;
using Xunit;

namespace Todo_Domain_UnitTests
{
	[Trait("Category", "Unit")]
	public class UserServiceTests
	{
		private readonly IUserService _userService;
		private Mock<IUserRepository> _mockUserRepo;
		private readonly User _user;
		private const string password = "password";
		private const string passwordHash = "5f4dcc3b5aa765d61d8327deb882cf99";

		public UserServiceTests()
		{
			_user = new User(firstName: "Storm", lastName: "Simmons", userName: "StormSimmons", password: password)
			{
				Id = new ObjectId()
			};

			_mockUserRepo = new Mock<IUserRepository>();

			_userService = new UserService(userRepository: _mockUserRepo.Object);

		}


		[Fact]
		public void GetUser_ValidInput_ReturnsUser()
		{
			_mockUserRepo.Setup(x => x.GetOne(It.IsAny<string>())).Returns(_user);

			User user = _userService.GetUser(userName: _user.UserName);

			Assert.NotNull(user);
		}

		[Fact]
		public void InsertUser_ValidInput_InsertsUserWithHashedPassword()
		{
			_mockUserRepo.Setup(x => x.Insert(It.IsAny<User>())).Returns(_user);

			var user = _userService.InsertUser(_user);

			Assert.NotNull(user);
		}
		[Fact]
		public void GetAll_ValidInput_ReturnsLostOfUsers()
		{
			_mockUserRepo.Setup(x => x.List()).Returns(new List<User> { _user });

			var users = _userService.GetAll();

			Assert.True(users.Count > 0);
		}

		[Fact]
		public void ValidateCredentials_ValidInput_ReturnsLoginStatusValid()
		{
			_user.Password = passwordHash;
			_mockUserRepo.Setup(x => x.GetOne(It.IsAny<string>())).Returns(_user);

			var status = _userService.VarifyCredentials(_user.UserName, password);

			Assert.Equal(LoginStatus.Valid, status);
		}

		[Fact]
		public void ValidateCredentials_InvalidInput_ReturnsLoginStatusINcorrectPassword()
		{
			_user.Password = passwordHash;
			_mockUserRepo.Setup(x => x.GetOne(It.IsAny<string>())).Returns(_user);

			var status = _userService.VarifyCredentials(_user.UserName, "passwor");

			Assert.Equal(LoginStatus.IncorrectPassword, status);
		}
	}
}
