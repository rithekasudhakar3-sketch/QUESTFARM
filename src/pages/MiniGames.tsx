import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Sprout, Droplets, Recycle, Trophy, Star, Gamepad2 } from "lucide-react";

// Seed Saver Game Component
const SeedSaverGame = ({ onClose }: { onClose: () => void }) => {
  const [plantedSeeds, setPlantedSeeds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<"positive" | "negative" | null>(null);

  const crops = [
    { id: "corn", name: "Corn", emoji: "🌽", color: "bg-yellow-400" },
    { id: "wheat", name: "Wheat", emoji: "🌾", color: "bg-amber-300" },
    { id: "tomato", name: "Tomato", emoji: "🍅", color: "bg-red-400" },
    { id: "carrot", name: "Carrot", emoji: "🥕", color: "bg-orange-400" },
    { id: "potato", name: "Potato", emoji: "🥔", color: "bg-amber-600" },
    { id: "lettuce", name: "Lettuce", emoji: "🥬", color: "bg-green-400" },
    { id: "pepper", name: "Pepper", emoji: "🫑", color: "bg-green-500" },
    { id: "cucumber", name: "Cucumber", emoji: "🥒", color: "bg-emerald-400" },
  ];

  const plantSeed = (cropId: string) => {
    const newPlantedSeeds = [...plantedSeeds, cropId];
    setPlantedSeeds(newPlantedSeeds);

    // Count unique crops
    const uniqueCrops = new Set(newPlantedSeeds);
    const diversityBonus = uniqueCrops.size * 10;
    
    // Check if this is a repeat
    const cropCount = newPlantedSeeds.filter(id => id === cropId).length;
    
    if (cropCount === 1) {
      // First time planting this crop - diversity bonus!
      const points = 20 + diversityBonus;
      setScore(score + points);
      setFeedback(`🌱 Great! ${crops.find(c => c.id === cropId)?.name} adds biodiversity! +${points} points!`);
      setFeedbackType("positive");
    } else if (cropCount <= 2) {
      // Second time - okay but not ideal
      const points = 10;
      setScore(score + points);
      setFeedback(`⚠️ Planting ${crops.find(c => c.id === cropId)?.name} again. Try more variety! +${points} points`);
      setFeedbackType("negative");
    } else {
      // Too many repeats - minimal points
      const points = 5;
      setScore(score + points);
      setFeedback(`❌ Too much ${crops.find(c => c.id === cropId)?.name}! Biodiversity is important! +${points} points`);
      setFeedbackType("negative");
    }

    // Clear feedback after 3 seconds
    setTimeout(() => {
      setFeedback("");
      setFeedbackType(null);
    }, 3000);
  };

  const resetGame = () => {
    setPlantedSeeds([]);
    setScore(0);
    setFeedback("");
    setFeedbackType(null);
  };

  const uniqueCrops = new Set(plantedSeeds).size;
  const diversityPercentage = crops.length > 0 ? Math.round((uniqueCrops / crops.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Sprout className="h-8 w-8 text-primary" />
              Seed Saver Game
            </h1>
            <p className="text-muted-foreground">
              Plant diverse crops to earn points! Biodiversity is key to sustainable farming.
            </p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
        </div>

        {/* Score and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-achievement" />
                Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{score}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Points</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-achievement" />
                Diversity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{uniqueCrops}/{crops.length}</div>
              <Progress value={diversityPercentage} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-1">{diversityPercentage}% Diverse</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                Planted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{plantedSeeds.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Total Seeds</p>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <Card className={`mb-6 border-2 ${
            feedbackType === "positive" 
              ? "border-success bg-success/10" 
              : "border-destructive bg-destructive/10"
          }`}>
            <CardContent className="pt-6">
              <p className={`text-lg font-medium ${
                feedbackType === "positive" ? "text-success-foreground" : "text-destructive-foreground"
              }`}>
                {feedback}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Game Area */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Plant Your Seeds</CardTitle>
            <CardDescription>
              Click on crops to plant them. Earn more points by planting different types!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {crops.map((crop) => {
                const count = plantedSeeds.filter(id => id === crop.id).length;
                return (
                  <button
                    key={crop.id}
                    onClick={() => plantSeed(crop.id)}
                    className={`${crop.color} p-6 rounded-lg hover:scale-105 transition-transform duration-200 border-2 border-transparent hover:border-primary shadow-md hover:shadow-lg`}
                  >
                    <div className="text-5xl mb-2">{crop.emoji}</div>
                    <div className="font-semibold text-sm text-gray-800">{crop.name}</div>
                    {count > 0 && (
                      <Badge variant="secondary" className="mt-2">
                        {count}x
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Learning Outcome */}
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5" />
              Learning Outcome
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              <strong>Crop Diversity</strong> is essential for sustainable farming! Planting a variety of crops:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Reduces pest and disease risks</li>
              <li>Improves soil health and nutrients</li>
              <li>Increases farm resilience to climate changes</li>
              <li>Supports ecosystem biodiversity</li>
            </ul>
          </CardContent>
        </Card>

        {/* Reset Button */}
        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={resetGame}>
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other games
const WaterWiselyGame = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Droplets className="h-8 w-8 text-primary" />
              Water Wisely Game
            </h1>
            <p className="text-muted-foreground">
              Learn water conservation techniques through interactive challenges.
            </p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon!</CardTitle>
            <CardDescription>
              This game is under development. Check back soon for water conservation challenges!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

const WasteToWealthGame = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Recycle className="h-8 w-8 text-primary" />
              Waste to Wealth Game
            </h1>
            <p className="text-muted-foreground">
              Master recycling and composting to turn waste into valuable resources.
            </p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Games
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon!</CardTitle>
            <CardDescription>
              This game is under development. Check back soon for recycling and composting challenges!
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

// Main MiniGames Page
const MiniGames = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: "seed-saver",
      title: "Seed Saver",
      emoji: "🌾",
      description: "Plant diverse crops and earn points for biodiversity! Learn why crop diversity is essential for sustainable farming.",
      learningOutcome: "Crop Diversity & Biodiversity",
      difficulty: "Easy",
      icon: Sprout,
      color: "bg-green-500",
    },
    {
      id: "water-wisely",
      title: "Water Wisely",
      emoji: "💧",
      description: "Master water conservation techniques through interactive challenges. Every drop counts!",
      learningOutcome: "Water Conservation",
      difficulty: "Medium",
      icon: Droplets,
      color: "bg-blue-500",
    },
    {
      id: "waste-to-wealth",
      title: "Waste to Wealth",
      emoji: "♻️",
      description: "Turn waste into valuable resources! Learn recycling and composting techniques.",
      learningOutcome: "Recycling & Composting",
      difficulty: "Medium",
      icon: Recycle,
      color: "bg-amber-500",
    },
  ];

  const renderGame = () => {
    switch (activeGame) {
      case "seed-saver":
        return <SeedSaverGame onClose={() => setActiveGame(null)} />;
      case "water-wisely":
        return <WaterWiselyGame onClose={() => setActiveGame(null)} />;
      case "waste-to-wealth":
        return <WasteToWealthGame onClose={() => setActiveGame(null)} />;
      default:
        return null;
    }
  };

  if (activeGame) {
    return renderGame();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-nature py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4 flex items-center justify-center gap-3">
            <Gamepad2 className="h-12 w-12" />
            Mini Games
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
            Learn sustainable farming concepts through fun, interactive games! Each game teaches important principles while you play.
          </p>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <Card
                  key={game.id}
                  className="hover:shadow-nature transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-primary"
                  onClick={() => setActiveGame(game.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${game.color} w-16 h-16 rounded-lg flex items-center justify-center text-4xl`}>
                        {game.emoji}
                      </div>
                      <Badge
                        variant={
                          game.difficulty === "Easy"
                            ? "default"
                            : game.difficulty === "Medium"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon className="h-6 w-6 text-primary" />
                      {game.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span className="font-medium">Learn:</span>
                        <span>{game.learningOutcome}</span>
                      </div>
                      <Button
                        variant="quest"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveGame(game.id);
                        }}
                      >
                        Play Game
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Info Section */}
          <Card className="mt-12 bg-muted/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-6 w-6" />
                About Mini Games
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our mini games are designed to make learning about sustainable farming fun and engaging. Each game focuses on a specific concept and provides:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Interactive Learning:</strong> Hands-on experience with farming concepts</li>
                <li><strong>Clear Outcomes:</strong> Each game teaches specific sustainability principles</li>
                <li><strong>Instant Feedback:</strong> Learn from your actions in real-time</li>
                <li><strong>Gamification:</strong> Earn points and track your progress</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MiniGames;

