using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Tweetinvi;
using Tweetinvi.Logic.QueryParameters;
using Tweetinvi.Models;
using Tweetinvi.Parameters;

namespace TweetBot
{
    public static class Function1
    {
        [FunctionName("auth")]
        public static async Task<IActionResult> TwitterAuth(
          [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
          ILogger log)
        {
            try
            {
                var appClient = new TwitterClient(Environment.GetEnvironmentVariable("TwitterConsumerKey"), Environment.GetEnvironmentVariable("TwitterConsumerSecret"));

                var authenticationRequestId = Guid.NewGuid().ToString();
                var redirectPath = Environment.GetEnvironmentVariable("RedirectUri");
                var redirectURL = $"{redirectPath}";
                var authenticationRequestToken = await appClient.Auth.RequestAuthenticationUrlAsync(redirectURL);

                var tokenRepsonse = new TwitterAuthResponse
                {
                    Success = true,
                    TokenResponse = new TokenResponse
                    {
                        OAuthToken = authenticationRequestToken.AuthorizationKey,
                        OAuthTokenSecret = authenticationRequestToken.AuthorizationSecret
                    }
                };

                return new OkObjectResult(tokenRepsonse);
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return ErrorResponse.InternalServerError(detail: "Authentication Issue", success: false);
            }
        }

        [FunctionName("tweet")]
        public static async Task<IActionResult> ValidateTwitterAuth(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                TweetRequest tweet = JsonSerializer.Deserialize<TweetRequest>(requestBody);

                if (tweet.MediaId == null || tweet.MediaId.Length == 0)
                {
                    return ErrorResponse.InternalServerError(detail: "No Image Data", success: false);
                }

                if (string.IsNullOrEmpty(tweet.OAuthToken) || string.IsNullOrEmpty(tweet.OAuthTokenSecret) || string.IsNullOrEmpty(tweet.OAuthVerifier))
                {
                    return ErrorResponse.InternalServerError(detail: "No Tokens Supplied", success: false);
                }

                
                var appClient = new TwitterClient(Environment.GetEnvironmentVariable("TwitterConsumerKey"), Environment.GetEnvironmentVariable("TwitterConsumerSecret"));

                RequestCredentialsParameters requestParameters = new RequestCredentialsParameters(tweet.OAuthVerifier, new AuthenticationRequest
                {
                    ConsumerKey = Environment.GetEnvironmentVariable("TwitterConsumerKey"),
                    ConsumerSecret = Environment.GetEnvironmentVariable("TwitterConsumerSecret"),
                    AuthorizationKey = tweet.OAuthToken,
                    AuthorizationSecret = tweet.OAuthTokenSecret,
                    VerifierCode = null,
                    AuthorizationURL = $"{Environment.GetEnvironmentVariable("TwitterAuthorizationUrl")}={tweet.OAuthToken}"
                });

                ITwitterCredentials userCreds;
                TwitterClient userClient;

                try
                {

                    userCreds = await appClient.Auth.RequestCredentialsAsync(requestParameters);
                    userClient = new TwitterClient(userCreds);
                    var user = await userClient.Users.GetAuthenticatedUserAsync();
                }

                catch (Exception ex)
                {
                    log.LogError(ex.Message);
                    return ErrorResponse.InternalServerError(detail: "oAuth Fail", success : false);
                }
                var uploadedImage = await userClient.Upload.UploadTweetImageAsync(tweet.MediaId);
                await userClient.Upload.AddMediaMetadataAsync(new MediaMetadata(uploadedImage)
                {
                    AltText = "My .NET Bot",
                });
                var tweetWithImage = await userClient.Tweets.PublishTweetAsync(new PublishTweetParameters(tweet.TweetText)
                {
                    Medias = { uploadedImage }
                });

                var tweetResponse = new TweetResponse
                {
                    Success = true
                };

                return new OkObjectResult(tweetResponse);
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);

                return ErrorResponse.InternalServerError(detail: "Posting Issue", success: false);
            }
        }
    }
}
