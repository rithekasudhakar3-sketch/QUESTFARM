import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  HelpCircle,
  Bug,
  Lightbulb
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      content: "support@farmquest.com",
      description: "Get help with technical issues",
    },
    {
      icon: Phone,
      title: "Phone Support",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: MapPin,
      title: "Office Address",
      content: "123 Farming Innovation Blvd, Green Valley, CA 90210",
      description: "Visit our sustainability center",
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "24 hours",
      description: "Average response time",
    },
  ];

  const faqItems = [
    {
      icon: HelpCircle,
      question: "How do I reset my progress?",
      answer: "Go to Profile > Settings > Account > Reset Progress",
    },
    {
      icon: Bug,
      question: "I found a bug, what should I do?",
      answer: "Use the 'Bug Report' category in the contact form below",
    },
    {
      icon: Lightbulb,
      question: "Can I suggest new quests?",
      answer: "Yes! We love community suggestions. Use the 'Feature Request' category",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about sustainable farming or need help with the platform? 
            We're here to help you grow your farming knowledge!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center space-x-2 mb-6">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-card-foreground">Send us a message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="farming">Farming Questions</SelectItem>
                      <SelectItem value="account">Account Issues</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your inquiry"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your question or feedback..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="quest" size="lg" className="w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-card-foreground mb-4">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground">{info.title}</h4>
                      <p className="text-sm font-medium text-primary">{info.content}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick FAQ */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-card-foreground mb-4">Quick Help</h3>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4 text-primary" />
                      <h4 className="font-medium text-card-foreground text-sm">{item.question}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">{item.answer}</p>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View Full FAQ
              </Button>
            </Card>

            {/* Community */}
            <Card className="p-6 bg-gradient-nature text-primary-foreground">
              <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Connect with fellow sustainable farmers, share tips, and learn from experts in our active community.
              </p>
              <Button variant="earth" className="w-full">
                Join Discord Server
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;