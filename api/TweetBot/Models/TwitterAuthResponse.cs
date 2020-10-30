using System.Text.Json.Serialization;

namespace TweetBot
{
    public class TwitterAuthResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }
        [JsonPropertyName("tokenresponse")]
        public TokenResponse TokenResponse { get; set; }
    }

    public class TokenResponse
    {
        [JsonPropertyName("oauth_token")]
        public string OAuthToken { get; set; }
        [JsonPropertyName("oauth_token_secret")]
        public string OAuthTokenSecret { get; set; }
    }
}
