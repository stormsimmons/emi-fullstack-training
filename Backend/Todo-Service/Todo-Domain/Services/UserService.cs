using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;
using System.Security.Cryptography;
using Todo_Domain.Enums;

namespace Todo_Domain.Services
{
	public class UserService : IUserService
	{
		private readonly IUserRepository _userRepository;

		public UserService(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public IList<User> GetAll()
		{
			return _userRepository.List();
		}

		public User GetUser(string userName)
		{
			return _userRepository.GetOne(userName);
		}

		public User InsertUser(User user)
		{
			user.Password = HashPassword(user.Password);

			return _userRepository.Insert(user);
		}

		public LoginStatus VarifyCredentials(string username, string password)
		{
			var user = _userRepository.GetOne(username);
			if(user == null)
			{
				return LoginStatus.IncorrectUserName;
			}

			var hashedPassword = HashPassword(password);

			var comparer = StringComparer.OrdinalIgnoreCase;
			
			if (comparer.Compare(hashedPassword, user.Password) != 0)
			{
				return LoginStatus.IncorrectPassword;
			}

			return LoginStatus.Valid;
		}

		private string HashPassword(string password)
		{
			var hashArr = MD5.Create().
				ComputeHash(Encoding.ASCII.GetBytes(password));

			var sBuilder = new StringBuilder();
			
			for (int i = 0; i < hashArr.Length; i++)
			{
				sBuilder.Append(hashArr[i].ToString("x2"));
			}

			return sBuilder.ToString();
		}
	}
}
