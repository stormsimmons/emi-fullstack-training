using System;
using System.Collections.Generic;
using System.Text;
using Todo_Domain.Interfaces;

namespace Todo_Domain.Repositories
{
	public class UserMongoRepository : IUserRepository
	{
		private string _connectionString;

		public UserMongoRepository(string connectionString)
		{
			_connectionString = connectionString;
		}
	}
}
