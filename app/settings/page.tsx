"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useApp } from "@/contexts/app-context"
import { useLanguage } from "@/contexts/language-context"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Timer, Bell, Globe, Monitor, Sun, Moon, SettingsIcon } from "lucide-react"

export default function SettingsPage() {
  const { state, dispatch } = useApp()
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [tempSettings, setTempSettings] = useState(state.settings)

  const handleSave = () => {
    dispatch({ type: "UPDATE_SETTINGS", payload: tempSettings })
  }

  const handleReset = () => {
    setTempSettings(state.settings)
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="timer" className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            Timer
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Language
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Theme Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={theme === "light" ? "outline" : "outline"}
                  onClick={() => setTheme("light")}
                  className="flex flex-col items-center gap-2 h-auto p-6"
                >
                  <Sun className="w-8 h-8" />
                  <span className="font-medium">Light</span>
                  <span className="text-xs text-muted-foreground">Bright and clean</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="flex flex-col items-center gap-2 h-auto p-6"
                >
                  <Moon className="w-8 h-8" />
                  <span className="font-medium">Dark</span>
                  <span className="text-xs text-muted-foreground">Easy on the eyes</span>
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                  className="flex flex-col items-center gap-2 h-auto p-6"
                >
                  <Monitor className="w-8 h-8" />
                  <span className="font-medium">System</span>
                  <span className="text-xs text-muted-foreground">Follow system</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                {t("settings.timerDurations")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="pomodoro-duration">{t("settings.pomodoroDuration")}</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[tempSettings.pomodoroDuration]}
                      onValueChange={(value) =>
                        setTempSettings({
                          ...tempSettings,
                          pomodoroDuration: value[0],
                        })
                      }
                      max={60}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5 min</span>
                      <span className="font-medium">{tempSettings.pomodoroDuration} min</span>
                      <span>60 min</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Recommended: 25 minutes</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="short-break-duration">{t("settings.shortBreakDuration")}</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[tempSettings.shortBreakDuration]}
                      onValueChange={(value) =>
                        setTempSettings({
                          ...tempSettings,
                          shortBreakDuration: value[0],
                        })
                      }
                      max={30}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>1 min</span>
                      <span className="font-medium">{tempSettings.shortBreakDuration} min</span>
                      <span>30 min</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Recommended: 5 minutes</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="long-break-duration">{t("settings.longBreakDuration")}</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[tempSettings.longBreakDuration]}
                      onValueChange={(value) =>
                        setTempSettings({
                          ...tempSettings,
                          longBreakDuration: value[0],
                        })
                      }
                      max={60}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5 min</span>
                      <span className="font-medium">{tempSettings.longBreakDuration} min</span>
                      <span>60 min</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Recommended: 15 minutes</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="auto-start" className="text-base font-medium">
                      {t("settings.autoStart")}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically start the next session when current one ends
                    </p>
                  </div>
                  <Switch
                    id="auto-start"
                    checked={tempSettings.autoStart}
                    onCheckedChange={(checked) =>
                      setTempSettings({
                        ...tempSettings,
                        autoStart: checked,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="show-in-title" className="text-base font-medium">
                    {t("settings.showInTitle")}
                  </Label>
                  <p className="text-sm text-muted-foreground">Display countdown timer in browser tab title</p>
                </div>
                <Switch
                  id="show-in-title"
                  checked={tempSettings.showInTitle}
                  onCheckedChange={(checked) =>
                    setTempSettings({
                      ...tempSettings,
                      showInTitle: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="sound-enabled" className="text-base font-medium">
                    {t("settings.soundEnabled")}
                  </Label>
                  <p className="text-sm text-muted-foreground">Play sound notification when session ends</p>
                </div>
                <Switch
                  id="sound-enabled"
                  checked={tempSettings.soundEnabled}
                  onCheckedChange={(checked) =>
                    setTempSettings({
                      ...tempSettings,
                      soundEnabled: checked,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={language === "en" ? "default" : "outline"}
                  onClick={() => setLanguage("en")}
                  className="flex flex-col items-center gap-2 h-auto p-6"
                >
                  <span className="text-2xl">🇺🇸</span>
                  <span className="font-medium">English</span>
                </Button>
                <Button
                  variant={language === "bn" ? "default" : "outline"}
                  onClick={() => setLanguage("bn")}
                  className="flex flex-col items-center gap-2 h-auto p-6"
                >
                  <span className="text-2xl">🇧🇩</span>
                  <span className="font-medium">বাংলা</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 pt-6 border-t">
        <Button
          onClick={handleSave}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          {t("common.save")} Changes
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
          {t("common.cancel")}
        </Button>
      </div>
    </div>
  )
}
