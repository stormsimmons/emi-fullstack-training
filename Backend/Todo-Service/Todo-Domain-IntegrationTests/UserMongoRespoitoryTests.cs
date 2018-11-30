using Todo_Domain.Interfaces;
using Todo_Domain.Models;
using Todo_Domain.Repositories;
using Xunit;

namespace Todo_Domain_IntegrationTests
{
	[Trait("Category", "Integration")]
	public class UserMongoRespoitoryTests
	{
		private IUserRepository _userRepository;
		private const string _connectionString = "mongodb://localhost:27017/";

		public UserMongoRespoitoryTests()
		{
			_userRepository = new UserMongoRepository(_connectionString);

			User user = new User(firstName: "Storm", lastName: "Simmons", userName: "StormSimmons", password: "password");
		}

		[Fact]
		public void GetUser_ValidInput_ReturnsUser()
		{
			
		}
	}
}
