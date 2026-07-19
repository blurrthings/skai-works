"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CONTACT_FORM_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

const MAX_SUBMISSIONS_PER_DAY = 3;
const SUBMISSION_LIMIT_STORAGE_KEY = "ap-works-contact-submissions";

type SubmitState = "idle" | "submitting" | "success" | "error";

function todayKey() {
  return new Date().toDateString();
}

function getSubmissionsToday(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(SUBMISSION_LIMIT_STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { date: string; count: number };
    return parsed.date === todayKey() ? parsed.count : 0;
  } catch {
    return 0;
  }
}

function recordSubmission() {
  if (typeof window === "undefined") return;
  const count = getSubmissionsToday() + 1;
  window.localStorage.setItem(
    SUBMISSION_LIMIT_STORAGE_KEY,
    JSON.stringify({ date: todayKey(), count })
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium uppercase tracking-wide text-foreground/80">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-md border border-line bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground"
      />
    </label>
  );
}

export function ContactFormDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setLimitReached(getSubmissionsToday() >= MAX_SUBMISSIONS_PER_DAY);
    } else {
      setStatus("idle");
      setError(null);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (getSubmissionsToday() >= MAX_SUBMISSIONS_PER_DAY) {
      setLimitReached(true);
      return;
    }

    if (!CONTACT_FORM_ENDPOINT) {
      setStatus("error");
      setError("The contact form isn't configured yet.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      subject: data.get("subject"),
      message: data.get("message"),
    };

    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => null);
      if (!res.ok || result?.ok === false) {
        throw new Error(result?.error ?? "Something went wrong. Please try again.");
      }

      recordSubmission();
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>
            Tell me a bit about your project and I&rsquo;ll get back to you soon.
          </DialogDescription>
        </DialogHeader>

        {limitReached ? (
          <div className="flex flex-col gap-4 p-6 pt-2">
            <p className="text-sm text-foreground/80">
              You&rsquo;ve reached today&rsquo;s limit of {MAX_SUBMISSIONS_PER_DAY}{" "}
              messages. Please try again tomorrow, or email me directly at{" "}
              <a
                href="mailto:blurrthings@gmail.com"
                className="font-semibold text-foreground underline"
              >
                blurrthings@gmail.com
              </a>
              .
            </p>
            <DialogClose asChild>
              <Button variant="outline" className="self-start">
                Close
              </Button>
            </DialogClose>
          </div>
        ) : status === "success" ? (
          <div className="flex flex-col gap-4 p-6 pt-2">
            <p className="text-sm text-foreground/80">
              Thanks for reaching out! Your message has been sent — I&rsquo;ll reply by
              email shortly.
            </p>
            <DialogClose asChild>
              <Button variant="outline" className="self-start">
                Close
              </Button>
            </DialogClose>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 pb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone number" name="phone" type="tel" />
              <Field label="Subject" name="subject" required />
            </div>
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium uppercase tracking-wide text-foreground/80">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={4}
                className="rounded-md border border-line bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              />
            </label>

            {status === "error" && error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <DialogFooter className="p-0 pt-2">
              <Button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
