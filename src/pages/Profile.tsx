import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/StatsCard";
import { 
  User, 
  Trophy, 
  Target, 
  Star, 
  Calendar, 
  Award, 
  TrendingUp,
  Gamepad2,
  Settings
} from "lucide-react";

const Profile = () => {
  const userStats = {
    name: "Alex Farmer",
    level: 34,
    xp: 12450,
    nextLevelXP: 15000,
    joinDate: "March 2024",
    title: "Rising Farmer",
    avatar: "AF",
  };

  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first quest",
      icon: Target,
      unlocked: true,
      date: "March 15, 2024",
    },
    {
      title: "Soil Master",
      description: "Complete 10 soil management quests",
      icon: Award,
      unlocked: true,
      date: "April 2, 2024",
    },
    {
      title: "Water Warrior",
      description: "Save 1000L of water through efficient practices",
      icon: Trophy,
      unlocked: true,
      date: "April 18, 2024",
    },
    {
      title: "Week Streak",
      description: "Complete daily tasks for 7 consecutive days",
      icon: Calendar,
      unlocked: true,
      date: "May 1, 2024",
    },
    {
      title: "Eco Champion",
      description: "Reduce carbon footprint by 50%",
      icon: Star,
      unlocked: false,
      progress: 75,
    },
    {
      title: "Knowledge Seeker",
      description: "Read 25 farming guides",
      icon: Gamepad2,
      unlocked: false,
      progress: 40,
    },
  ];

  const recentActivity = [
    {
      type: "quest_completed",
      title: "Completed: Composting Specialist",
      xp: 120,
      date: "2 hours ago",
    },
    {
      type: "achievement_unlocked",
      title: "Unlocked: Water Warrior",
      xp: 0,
      date: "1 day ago",
    },
    {
      type: "level_up",
      title: "Reached Level 34",
      xp: 500,
      date: "3 days ago",
    },
    {
      type: "task_completed",
      title: "Completed: Daily Soil Check",
      xp: 25,
      date: "5 days ago",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "quest_completed":
        return <Target className="h-4 w-4 text-primary" />;
      case "achievement_unlocked":
        return <Trophy className="h-4 w-4 text-achievement" />;
      case "level_up":
        return <Star className="h-4 w-4 text-success" />;
      case "task_completed":
        return <Calendar className="h-4 w-4 text-earth" />;
      default:
        return <Gamepad2 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="p-8 bg-gradient-nature text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
                {userStats.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{userStats.name}</h1>
                <p className="text-primary-foreground/80 text-lg">{userStats.title}</p>
                <p className="text-primary-foreground/60">Member since {userStats.joinDate}</p>
              </div>
            </div>
            <Button variant="earth" size="lg">
              <Settings className="mr-2 h-5 w-5" />
              Edit Profile
            </Button>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary-foreground/80">Level {userStats.level}</span>
              <span className="text-primary-foreground/80">
                {userStats.xp} / {userStats.nextLevelXP} XP
              </span>
            </div>
            <Progress 
              value={(userStats.xp / userStats.nextLevelXP) * 100} 
              className="h-3 bg-white/20"
            />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total XP"
            value={userStats.xp.toLocaleString()}
            icon={Star}
            description="All time earned"
          />
          <StatsCard
            title="Quests Completed"
            value="47"
            icon={Target}
            description="+3 this week"
            trend="up"
          />
          <StatsCard
            title="Current Level"
            value={userStats.level}
            icon={TrendingUp}
            description="83% to next level"
            gradient
          />
          <StatsCard
            title="Achievements"
            value="14"
            icon={Trophy}
            description="6 unlocked"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Achievements */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Award className="h-6 w-6 text-achievement" />
                <h2 className="text-2xl font-bold text-card-foreground">Achievements</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked
                        ? "bg-achievement/10 border-achievement text-card-foreground"
                        : "bg-muted/50 border-border text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.unlocked ? "bg-achievement/20" : "bg-muted"
                      }`}>
                        <achievement.icon className={`h-5 w-5 ${
                          achievement.unlocked ? "text-achievement" : "text-muted-foreground"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm opacity-80">{achievement.description}</p>
                        {achievement.unlocked ? (
                          <p className="text-xs mt-1 opacity-60">{achievement.date}</p>
                        ) : (
                          <div className="mt-2">
                            <Progress value={achievement.progress || 0} className="h-1" />
                            <p className="text-xs mt-1">{achievement.progress || 0}% complete</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-card-foreground">Recent Activity</h2>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">{activity.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                        {activity.xp > 0 && (
                          <Badge variant="outline" className="text-xs">
                            +{activity.xp} XP
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Activity
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;