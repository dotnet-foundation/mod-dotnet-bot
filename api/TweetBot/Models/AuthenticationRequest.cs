using Tweetinvi.Models;

namespace TweetBot
{
    public class AuthenticationRequest : IAuthenticationRequest
    {
        public string ConsumerKey { get; set; }
        public string ConsumerSecret { get; set; }
        public string AuthorizationKey { get; set; }
        public string AuthorizationSecret { get; set; }
        public string VerifierCode { get; set; }
        public string AuthorizationURL { get; set; }
    }
}
