import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Crown, Star, Target, CheckCircle } from "lucide-react";

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("tasks");

  const dailyTasks = [
    {
      title: "Check Soil Moisture",
      description: "Monitor soil moisture levels in 3 different plots",
      xpReward: 25,
      progress: 100,
      isCompleted: true,
    },
    {
      title: "Water Plants",
      description: "Ensure all crops receive adequate water",
      xpReward: 20,
      progress: 75,
      isCompleted: false,
    },
    {
      title: "Record Weather Data",
      description: "Log temperature, humidity, and rainfall",
      xpReward: 15,
      progress: 40,
      isCompleted: false,
    },
  ];

  const weeklyTasks = [
    {
      title: "Pest Inspection",
      description: "Inspect all crops for signs of pest damage",
      xpReward: 100,
      progress: 60,
      isCompleted: false,
    },
    {
      title: "Soil pH Testing",
      description: "Test and record soil pH levels across farm",
      xpReward: 80,
      progress: 90,
      isCompleted: false,
    },
    {
      title: "Compost Management",
      description: "Turn compost piles and check temperature",
      xpReward: 75,
      progress: 100,
      isCompleted: true,
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "SC",
      xp: 15420,
      badge: "Farming Master",
      level: 42,
    },
    {
      rank: 2,
      name: "Miguel Rodriguez",
      avatar: "MR",
      xp: 14880,
      badge: "Eco Warrior",
      level: 41,
    },
    {
      rank: 3,
      name: "Emma Thompson",
      avatar: "ET",
      xp: 14250,
      badge: "Soil Scientist",
      level: 39,
    },
    {
      rank: 4,
      name: "David Kim",
      avatar: "DK",
      xp: 13900,
      badge: "Water Guardian",
      level: 38,
    },
    {
      rank: 5,
      name: "Alex Johnson",
      avatar: "AJ",
      xp: 13500,
      badge: "Crop Specialist",
      level: 37,
    },
    {
      rank: 6,
      name: "Lisa Wang",
      avatar: "LW",
      xp: 13200,
      badge: "Green Pioneer",
      level: 36,
    },
    {
      rank: 7,
      name: "Roberto Silva",
      avatar: "RS",
      xp: 12800,
      badge: "Pest Master",
      level: 35,
    },
    {
      rank: 8,
      name: "You",
      avatar: "YU",
      xp: 12450,
      badge: "Rising Farmer",
      level: 34,
      isCurrentUser: true,
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-achievement" />;
      case 2:
        return <Medal className="h-6 w-6 text-muted-foreground" />;
      case 3:
        return <Trophy className="h-6 w-6 text-earth" />;
      default:
        return <Star className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const TaskCard = ({ task, type }: { task: any; type: string }) => (
    <Card className="p-4 hover:shadow-nature transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-card-foreground">{task.title}</h4>
        </div>
        {task.isCompleted && <CheckCircle className="h-5 w-5 text-success" />}
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{task.progress}%</span>
        </div>
        <Progress value={task.progress} className="h-2" />
        
        <div className="flex items-center justify-between pt-2">
          <Badge variant="outline" className="text-xs">
            {task.xpReward} XP
          </Badge>
          <Button
            size="sm"
            variant={task.isCompleted ? "achievement" : "quest"}
            disabled={task.isCompleted}
          >
            {task.isCompleted ? "Completed" : "Continue"}
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tasks & Leaderboard</h1>
          <p className="text-xl text-muted-foreground">
            Complete daily and weekly tasks to earn XP and climb the rankings!
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">Daily Tasks</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Tasks</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyTasks.map((task, index) => (
                <TaskCard key={index} task={task} type="daily" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weeklyTasks.map((task, index) => (
                <TaskCard key={index} task={task} type="weekly" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="h-6 w-6 text-achievement" />
                <h2 className="text-2xl font-bold text-card-foreground">Global Leaderboard</h2>
              </div>
              
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                      player.isCurrentUser
                        ? "bg-gradient-nature text-primary-foreground border-primary"
                        : "bg-card border-border hover:shadow-nature"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(player.rank)}
                        <span className={`font-bold text-lg ${player.isCurrentUser ? "text-primary-foreground" : "text-card-foreground"}`}>
                          #{player.rank}
                        </span>
                      </div>
                      
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        player.isCurrentUser ? "bg-white/20 text-primary-foreground" : "bg-primary text-primary-foreground"
                      }`}>
                        {player.avatar}
                      </div>
                      
                      <div>
                        <h4 className={`font-semibold ${player.isCurrentUser ? "text-primary-foreground" : "text-card-foreground"}`}>
                          {player.name}
                        </h4>
                        <p className={`text-sm ${player.isCurrentUser ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          Level {player.level} • {player.badge}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-bold text-lg ${player.isCurrentUser ? "text-primary-foreground" : "text-card-foreground"}`}>
                        {player.xp.toLocaleString()} XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="quest">
                  View Full Rankings
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks;