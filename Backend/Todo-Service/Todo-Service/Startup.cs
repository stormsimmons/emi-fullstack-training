using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Todo_Domain.Interfaces;
using Todo_Domain.Models;
using Todo_Domain.Repositories;
using Todo_Domain.Services;
using Todo_Service.Dtos;
using Swashbuckle.AspNetCore.SwaggerUI;
using Swashbuckle.AspNetCore.Swagger;

namespace Todo_Service
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			string _connectionString = Configuration.GetConnectionString("MongoConnection");

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
			services.AddTransient<IUserService, UserService>();
			services.AddTransient<IUserRepository>(x => new UserMongoRepository(_connectionString));
			services.AddTransient<ITodoRepository>(x => new TodoMongoRepository(_connectionString));

			services.AddCors();

			string secretKey = Configuration.GetSection("Authentication:EncryptionKey").Value;
			var key = Convert.FromBase64String(secretKey);
			services.AddAuthentication(x =>
			{
				x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
		   .AddJwtBearer(x =>
		   {
			   x.RequireHttpsMetadata = false;
			   x.TokenValidationParameters = new TokenValidationParameters
			   {
				   ValidateIssuerSigningKey = true,
				   IssuerSigningKey = new SymmetricSecurityKey(key) ,
				   ValidateIssuer = false,
				   ValidateAudience = false,
				   ValidateLifetime = true
			   };
		   });

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v2", new Info { Title = "TodoService", Version = "v2" });
			});


			Mapper.Initialize(x =>
			{
				x.CreateMap<User, UserDto>().ReverseMap();
				x.CreateMap<Todo, TodoDto>().ReverseMap();
			});

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseHsts();
			}

			app.UseCors(x => x
			 .AllowAnyOrigin()
			 .AllowAnyMethod()
			 .AllowAnyHeader()
			 .AllowCredentials());

			app.UseSwagger();
			app.UseSwaggerUI(x =>
				x.SwaggerEndpoint("../swagger/v2/swagger.json", "TodoService"));

			app.UseHttpsRedirection();
			app.UseAuthentication();
			app.UseMvc();
		}
	}
}
