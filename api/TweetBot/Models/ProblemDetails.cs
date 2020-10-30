using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace TweetBot
{
    public class ProblemDetails
    {
        public string Type { get; set; }
        public string Title { get; set; }
        public int? Status { get; set; }
        public string Detail { get; set; }
        public bool Success { get; set; }
    }

    public class ProblemObjectResult : ObjectResult
    {
        public ProblemObjectResult(ProblemDetails value) : base(value)
        {
            StatusCode = (int)value.Status;
        }
    }

    public class ErrorResponse
    {
        public static ObjectResult CreateResponse(
            HttpStatusCode statusCode,
            string type,
            string title = "",
            string detail = "",
            bool success = true)
        {
            var problem = new ProblemDetails()
            {
                Status = (int)statusCode,
                Type = type,
                Title = title,
                Success = success,
                Detail = detail
            };

            return new ProblemObjectResult(problem);
        }

        public static ObjectResult BadRequest(
            string type,
            string title = "",
            string detail = "",
            bool success = true)
        {
            return CreateResponse(HttpStatusCode.BadRequest, type, title, detail, success);
        }

        public static ObjectResult InternalServerError(
            string type = "unexpected-error",
            string title = "",
            string detail = "",
            bool success = true)
        {
            return CreateResponse(HttpStatusCode.InternalServerError, type, title, detail, success);
        }

        public static ObjectResult NotFound(
            string type,
            string title = "",
            string detail = "",
            bool success = true)
        {
            return CreateResponse(HttpStatusCode.NotFound, type, title, detail, success);
        }
    }
}
