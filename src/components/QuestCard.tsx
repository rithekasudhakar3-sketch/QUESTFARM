import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuestCardProps {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xpReward: number;
  progress: number;
  timeLimit?: string;
  category: string;
  isCompleted?: boolean;
  quizLink?: string; // ✅ added missing prop
}

const QuestCard = ({
  title,
  description,
  difficulty,
  xpReward,
  progress,
  timeLimit,
  category,
  isCompleted = false,
  quizLink,
}: QuestCardProps) => {
  const navigate = useNavigate();

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "bg-success text-success-foreground";
      case "Medium":
        return "bg-achievement text-achievement-foreground";
      case "Hard":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 hover:shadow-nature transition-all duration-300 transform hover:-translate-y-1 bg-card border border-border">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        </div>
        <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
      </div>

      <p className="text-muted-foreground mb-4">{description}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-card-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4" />
              <span>{xpReward} XP</span>
            </div>
            {timeLimit && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{timeLimit}</span>
              </div>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
      </div>

      {/* ✅ Correct placement of button */}
      <Button
        variant={isCompleted ? "achievement" : "quest"}
        className="w-full mt-4"
        disabled={isCompleted}
        onClick={() =>
          !isCompleted && (quizLink ? window.location.href = quizLink : navigate("/quests/water-saving"))
        }
      >
        {isCompleted ? "Completed!" : "Start Quest"}
      </Button>
    </Card>
  );
};

export default QuestCard;
