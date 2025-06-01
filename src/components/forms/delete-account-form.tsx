"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DeleteAccountForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (confirmation !== "DELETE") {
      setError("Please type DELETE to confirm");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      // Sign out and redirect to home page
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Account deletion error:", error);
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          This action cannot be undone. This will permanently delete your account
          and remove all associated data from our servers.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmation">
          Type DELETE to confirm
        </Label>
        <Input
          id="confirmation"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          placeholder="DELETE"
          required
          disabled={isLoading}
        />
      </div>

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="destructive"
        disabled={isLoading || confirmation !== "DELETE"}
      >
        {isLoading ? "Deleting..." : "Delete Account"}
      </Button>
    </form>
  );
} 