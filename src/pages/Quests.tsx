import { useState } from "react";
import QuestCard from "@/components/QuestCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

const Quests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const quests = [
    {
      title: "Soil Health Master",
      description: "Learn about soil composition, pH testing, and organic matter improvement. Complete soil tests in 3 different locations.",
      difficulty: "Easy" as const,
      xpReward: 100,
      progress: 65,
      timeLimit: "3 days",
      category: "Soil Management",
    },
    {
      title: "Water Conservation Champion",
      description: "Implement water-saving irrigation techniques and measure water usage efficiency across your virtual farm.",
      difficulty: "Medium" as const,
      xpReward: 250,
      progress: 30,
      timeLimit: "5 days",
      category: "Water Management",
      quizLink: "/src/components/camera.html"
    },
    {
      title: "Organic Crop Rotation",
      description: "Design and implement a 4-season crop rotation plan that maximizes soil nutrients and minimizes pest issues.",
      difficulty: "Hard" as const,
      xpReward: 500,
      progress: 10,
      timeLimit: "7 days",
      category: "Crop Management",
    },
    {
      title: "Renewable Energy Integration",
      description: "Set up solar panels and wind turbines to power your farming operations sustainably.",
      difficulty: "Medium" as const,
      xpReward: 300,
      progress: 80,
      timeLimit: "4 days",
      category: "Energy",
    },
    {
      title: "Biodiversity Protector",
      description: "Create wildlife corridors and plant native species to support local ecosystem health.",
      difficulty: "Easy" as const,
      xpReward: 150,
      progress: 100,
      category: "Biodiversity",
      isCompleted: true,
    },
    {
      title: "Precision Agriculture Expert",
      description: "Use GPS technology and data analytics to optimize planting, fertilizing, and harvesting operations.",
      difficulty: "Hard" as const,
      xpReward: 600,
      progress: 20,
      timeLimit: "10 days",
      category: "Technology",
    },
    {
      title: "Composting Specialist",
      description: "Master the art of composting organic waste to create nutrient-rich soil amendments.",
      difficulty: "Easy" as const,
      xpReward: 120,
      progress: 45,
      timeLimit: "2 days",
      category: "Soil Management",
    },
    {
      title: "Integrated Pest Management",
      description: "Develop sustainable pest control strategies using beneficial insects and organic methods.",
      difficulty: "Medium" as const,
      xpReward: 280,
      progress: 55,
      timeLimit: "6 days",
      category: "Pest Control",
    },
    {
      title: "Vertical Farming Pioneer",
      description: "Design and build a vertical farming system to maximize crop yield in minimal space.",
      difficulty: "Hard" as const,
      xpReward: 700,
      progress: 5,
      timeLimit: "14 days",
      category: "Innovation",
    },
  ];

  const categories = ["all", "Soil Management", "Water Management", "Crop Management", "Energy", "Biodiversity", "Technology", "Pest Control", "Innovation"];
  const difficulties = ["all", "Easy", "Medium", "Hard"];

  const filteredQuests = quests.filter((quest) => {
    const matchesSearch = quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || quest.category === filterCategory;
    const matchesDifficulty = filterDifficulty === "all" || quest.difficulty === filterDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Farming Quests</h1>
          <p className="text-xl text-muted-foreground">
            Complete missions to master sustainable farming techniques and earn XP!
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest, index) => (
            <QuestCard key={index} {...quest} />
          ))}
        </div>

        {filteredQuests.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No quests found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quests;