import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Leaf, 
  MessageSquare,
  RefreshCw,
  HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "suggestion";
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "🌱 Hello! I'm FarmBot, your sustainable farming assistant! I can help you with farming techniques, quest guidance, and eco-friendly practices. What would you like to learn about today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickSuggestions = [
    "How do I improve soil health?",
    "What are the best crops for rotation?", 
    "Water conservation techniques",
    "Organic pest control methods",
    "How to start composting?",
    "Sustainable farming benefits"
  ];

  const farmingResponses = {
    "soil": "🌱 Soil health is crucial! Try these methods:\n\n• Add organic compost regularly\n• Practice crop rotation\n• Avoid over-tilling\n• Plant cover crops\n• Test pH levels monthly\n\nHealthy soil = healthy crops! Complete the 'Soil Health Master' quest to learn more!",
    "water": "💧 Water conservation is essential for sustainable farming:\n\n• Drip irrigation systems\n• Rainwater harvesting\n• Mulching to retain moisture\n• Drought-resistant crops\n• Smart watering schedules\n\nTry the 'Water Conservation Champion' quest for hands-on experience!",
    "pest": "🐛 Organic pest control methods:\n\n• Beneficial insects (ladybugs, lacewings)\n• Companion planting\n• Neem oil spray\n• Crop rotation\n• Physical barriers\n\nCheck out the 'Integrated Pest Management' quest!",
    "compost": "♻️ Composting basics:\n\n• Mix green (nitrogen) and brown (carbon) materials\n• Maintain proper moisture\n• Turn regularly for aeration\n• Keep temperature between 130-160°F\n• Harvest in 3-6 months\n\nComplete the 'Composting Specialist' quest for detailed guidance!",
    "rotation": "🔄 Crop rotation benefits:\n\n• Prevents soil depletion\n• Reduces pest buildup\n• Improves soil structure\n• Increases biodiversity\n• Boosts yields naturally\n\nTry the 'Organic Crop Rotation' quest to design your own plan!",
    "benefits": "🌍 Sustainable farming benefits:\n\n• Environmental protection\n• Better soil health\n• Reduced chemical use\n• Higher long-term profits\n• Climate change mitigation\n• Community support\n\nExplore our quests to experience these benefits firsthand!"
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(farmingResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // Default responses for common patterns
    if (message.includes("quest") || message.includes("mission")) {
      return "🎯 Looking for quest help? I can guide you through any farming quest! Try:\n\n• Visit the Quests page for available missions\n• Start with easier quests to build XP\n• Focus on one category at a time\n• Complete daily tasks for bonus rewards\n\nWhat specific quest are you working on?";
    }

    if (message.includes("xp") || message.includes("level")) {
      return "⭐ Want to level up faster? Here are some tips:\n\n• Complete daily tasks (easy XP)\n• Finish quests in order of difficulty\n• Check the leaderboard for inspiration\n• Focus on your farming strengths\n• Join community challenges\n\nCurrently, you can earn the most XP from the 'Vertical Farming Pioneer' quest!";
    }

    if (message.includes("hello") || message.includes("hi")) {
      return "👋 Hello there, fellow farmer! I'm here to help you master sustainable agriculture. Whether you need quest guidance, farming tips, or just want to chat about eco-friendly practices, I'm your bot! What's growing in your mind today?";
    }

    // Generic helpful response
    return "🤔 That's a great question! While I focus on sustainable farming topics, I'd love to help you with:\n\n• Farming techniques and best practices\n• Quest and task guidance\n• Sustainable agriculture tips\n• Eco-friendly farming methods\n\nCould you ask me something more specific about farming or your quests?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content: "🌱 Hello! I'm FarmBot, your sustainable farming assistant! I can help you with farming techniques, quest guidance, and eco-friendly practices. What would you like to learn about today?",
        sender: "bot",
        timestamp: new Date(),
      }
    ]);
    toast({
      title: "Chat Cleared",
      description: "Starting fresh conversation with FarmBot!",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-nature rounded-full">
                <Bot className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">FarmBot Assistant</h1>
                <p className="text-muted-foreground">Your sustainable farming companion</p>
              </div>
            </div>
            <Button variant="outline" onClick={clearChat}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              {/* Messages */}
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${
                          message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <Avatar className="w-8 h-8">
                          <div
                            className={`w-full h-full flex items-center justify-center rounded-full ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-gradient-nature text-primary-foreground"
                            }`}
                          >
                            {message.sender === "user" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                          </div>
                        </Avatar>
                        
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-card-foreground"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === "user" 
                              ? "text-primary-foreground/70" 
                              : "text-muted-foreground"
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <Avatar className="w-8 h-8">
                          <div className="w-full h-full flex items-center justify-center rounded-full bg-gradient-nature text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </div>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about sustainable farming..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    variant="quest"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Suggestions */}
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-card-foreground">Quick Questions</h3>
              </div>
              <div className="space-y-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs h-auto py-2 px-3"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <HelpCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* Bot Info */}
            <Card className="p-4 bg-gradient-nature text-primary-foreground">
              <div className="flex items-center space-x-2 mb-3">
                <Leaf className="h-5 w-5" />
                <h3 className="font-semibold">About FarmBot</h3>
              </div>
              <p className="text-sm text-primary-foreground/90 mb-4">
                I'm your AI farming companion, specialized in sustainable agriculture practices and quest guidance.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Farming Expert
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-primary-foreground">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Quest Helper
                </Badge>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-4">
              <h3 className="font-semibold text-card-foreground mb-3">💡 Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Ask specific farming questions</li>
                <li>• Mention crops or techniques you're interested in</li>
                <li>• Get quest recommendations</li>
                <li>• Learn about sustainable practices</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;