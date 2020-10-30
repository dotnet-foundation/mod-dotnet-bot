using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace TweetBot
{
    public class TweetResponse
    {
        [JsonPropertyName("success")]
        public bool Success { get; set; }
        [JsonPropertyName("msg")]
        public string Msg { get; set; }
    }
}