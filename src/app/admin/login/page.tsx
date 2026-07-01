import { Lock } from "lucide-react";
import { signIn } from "@/auth";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#050505]">
      <div className="w-full max-w-sm p-8 rounded-3xl gradient-border relative overflow-hidden text-center">
        <div className="flex items-center justify-center gap-2 mb-3 text-[#00d4ff]">
          <Lock size={18} />
          <h1 className="text-lg font-bold text-white">Admin access</h1>
        </div>
        <p className="text-sm text-[#475569] mb-6">
          Sign in with the owner Google account to continue.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl btn-gradient text-white text-sm font-medium flex items-center justify-center gap-2"
          >
            {/* Google "G" */}
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 34.9 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.9 36 44 30.6 44 24c0-1.3-.1-2.3-.4-3.5z"
              />
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
