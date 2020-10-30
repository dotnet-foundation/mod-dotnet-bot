using System.Text.Json.Serialization;

namespace TweetBot
{
    public class TweetRequest
    {
        [JsonPropertyName("oauth_token")]
        public string OAuthToken { get; set; }

        [JsonPropertyName("oauth_token_secret")]
        public string OAuthTokenSecret { get; set; }

        [JsonPropertyName("oauth_verifier")]
        public string OAuthVerifier { get; set; }

        [JsonPropertyName("media_id")]
        public byte[] MediaId { get; set; }

        [JsonPropertyName("tweetText")]
        public string TweetText { get; set; }
    }
}
