"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function EmailPreferencesForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [preferences, setPreferences] = useState({
    applicationUpdates: true,
    interviewReminders: true,
    marketingEmails: false,
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/user/email-preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update email preferences");
      }

      setSuccess("Email preferences updated successfully");
    } catch (error) {
      console.error("Email preferences update error:", error);
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Application Updates</Label>
            <p className="text-sm text-gray-500">
              Receive updates about your job applications
            </p>
          </div>
          <Switch
            checked={preferences.applicationUpdates}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({
                ...prev,
                applicationUpdates: checked,
              }))
            }
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Interview Reminders</Label>
            <p className="text-sm text-gray-500">
              Get reminders for upcoming interviews
            </p>
          </div>
          <Switch
            checked={preferences.interviewReminders}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({
                ...prev,
                interviewReminders: checked,
              }))
            }
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Marketing Emails</Label>
            <p className="text-sm text-gray-500">
              Receive updates about new features and promotions
            </p>
          </div>
          <Switch
            checked={preferences.marketingEmails}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({
                ...prev,
                marketingEmails: checked,
              }))
            }
            disabled={isLoading}
          />
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-500">
          {success}
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Preferences"}
      </Button>
    </form>
  );
} 