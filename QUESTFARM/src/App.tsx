import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HomePage from "./pages/Home";
import ChatBot from "./pages/ChatBot";
import Quests from "./pages/Quests";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import QuestWaterSaving from "./pages/QuestWaterSaving";
import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              <Route path="/quests/water-saving" element={<QuestWaterSaving />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/chatbot" element={<ChatBot />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;