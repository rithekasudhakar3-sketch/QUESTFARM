import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StatsCard from "@/components/StatsCard";
import { Gamepad2, Trophy, Target, Users, Sprout, Recycle, Sun, Droplets } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/farming-hero.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-earth/70"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-float">
            Master Sustainable Farming
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Level up your farming skills through engaging quests, complete challenges, and become a sustainable agriculture champion!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quests">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                <Target className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/tasks">
              <Button variant="earth" size="lg" className="text-lg px-8 py-6">
                <Trophy className="mr-2 h-5 w-5" />
                View Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Active Players"
              value="2,547"
              icon={Users}
              description="+12% this week"
              trend="up"
            />
            <StatsCard
              title="Quests Completed"
              value="8,923"
              icon={Target}
              description="+156 today"
              trend="up"
              gradient
            />
            <StatsCard
              title="XP Earned"
              value="45.2K"
              icon={Trophy}
              description="Total community XP"
              trend="neutral"
            />
            <StatsCard
              title="Achievements"
              value="234"
              icon={Gamepad2}
              description="Unlocked by players"
              trend="up"
            />
          </div>
        </div>
      </section>

      {/* Detailed Farming Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Learn Sustainable Farming Practices
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the principles and techniques that make farming environmentally friendly, 
              economically viable, and socially responsible through our gamified learning platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">
                What is Sustainable Farming?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Sustainable farming is an integrated system of plant and animal production practices 
                that will satisfy human food and fiber needs, enhance environmental quality, make 
                efficient use of non-renewable resources, and improve the quality of life for farmers and society.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Sprout className="h-6 w-6 text-success mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Soil Health</h4>
                    <p className="text-muted-foreground">Maintaining and improving soil fertility through organic matter and crop rotation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Droplets className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Water Conservation</h4>
                    <p className="text-muted-foreground">Efficient irrigation systems and water management techniques.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Recycle className="h-6 w-6 text-earth mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Resource Efficiency</h4>
                    <p className="text-muted-foreground">Minimizing waste and maximizing the use of renewable resources.</p>
                  </div>
                </div>
              </div>
            </div>
            <Card className="p-8 bg-gradient-nature text-primary-foreground">
              <h4 className="text-2xl font-bold mb-4">Key Benefits</h4>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <Sun className="h-5 w-5" />
                  <span>Reduces environmental impact</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Increases long-term profitability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Supports rural communities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sprout className="h-5 w-5" />
                  <span>Preserves biodiversity</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Farming Techniques Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Crop Rotation",
                description: "Rotating different crops to maintain soil health and prevent pest buildup.",
                icon: Recycle,
              },
              {
                title: "Organic Farming",
                description: "Using natural methods to grow crops without synthetic pesticides or fertilizers.",
                icon: Sprout,
              },
              {
                title: "Water Management",
                description: "Implementing efficient irrigation and rainwater harvesting systems.",
                icon: Droplets,
              },
              {
                title: "Solar Integration",
                description: "Using renewable energy sources to power farming operations.",
                icon: Sun,
              },
              {
                title: "Precision Agriculture",
                description: "Technology-driven farming for optimal resource utilization.",
                icon: Target,
              },
              {
                title: "Community Farming",
                description: "Collaborative approaches that benefit entire farming communities.",
                icon: Users,
              },
            ].map((technique, index) => (
              <Card key={index} className="p-6 hover:shadow-nature transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <technique.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">{technique.title}</h4>
                </div>
                <p className="text-muted-foreground">{technique.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Farming Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of players learning sustainable farming through fun, interactive quests and challenges.
          </p>
          <Link to="/quests">
            <Button variant="earth" size="lg" className="text-lg px-8 py-6">
              <Gamepad2 className="mr-2 h-5 w-5" />
              Begin Your Quest
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;