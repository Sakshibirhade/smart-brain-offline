import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/subjects";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Assistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your offline AI study assistant. Ask me anything about studying, or type keywords like 'programming', 'math', 'physics', or 'writing' to get help!",
    },
  ]);
  const [input, setInput] = useState("");

  const findAnswer = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Find matching FAQ
    const matchedFaq = faqs.find(
      (faq) =>
        faq.question.toLowerCase().includes(lowerQuery) ||
        faq.answer.toLowerCase().includes(lowerQuery) ||
        faq.category.toLowerCase().includes(lowerQuery)
    );

    if (matchedFaq) {
      return matchedFaq.answer;
    }

    // Category-based responses
    if (lowerQuery.includes("program") || lowerQuery.includes("code") || lowerQuery.includes("computer")) {
      return "For programming help, check out our Computer Science section! Focus on variables, functions, loops, and data structures. Practice is key!";
    }
    if (lowerQuery.includes("math") || lowerQuery.includes("algebra") || lowerQuery.includes("calculus")) {
      return "Math can be challenging! Start with the basics and practice regularly. Our Math section covers algebra, geometry, and calculus fundamentals.";
    }
    if (lowerQuery.includes("physics") || lowerQuery.includes("force") || lowerQuery.includes("energy")) {
      return "Physics is all about understanding how the world works! Check out Newton's Laws and energy concepts in our Physics section.";
    }
    if (lowerQuery.includes("english") || lowerQuery.includes("writing") || lowerQuery.includes("grammar")) {
      return "Good writing takes practice! Focus on grammar basics, expand your vocabulary, and read regularly. Our English section has great resources.";
    }
    if (lowerQuery.includes("study") || lowerQuery.includes("learn")) {
      return "Effective studying involves consistency! Break topics into chunks, use active recall with our quizzes, and review regularly. Stay motivated!";
    }
    if (lowerQuery.includes("quiz")) {
      return "Quizzes are a great way to test your knowledge! Review the chapter notes first, then take the quiz. Don't worry about mistakes - they help you learn!";
    }

    return "I'm sorry, I don't have specific information about that. Try asking about programming, math, physics, writing, or study tips!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const answer = findAnswer(input);
    const assistantMessage: Message = { role: "assistant", content: answer };

    setMessages([...messages, userMessage, assistantMessage]);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-hero rounded-xl p-6 border border-border">
          <h2 className="text-3xl font-bold mb-2">AI Study Assistant</h2>
          <p className="text-muted-foreground">
            Ask questions about your studies - works completely offline!
          </p>
        </div>

        <Card className="h-[500px] flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Bot size={18} className="text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="icon">
            <Send size={18} />
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Common Questions:</h3>
            <div className="flex flex-wrap gap-2">
              {["How to study?", "Math help", "Programming basics", "Physics laws", "Writing tips"].map((q) => (
                <Button
                  key={q}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(q)}
                >
                  {q}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Assistant;
