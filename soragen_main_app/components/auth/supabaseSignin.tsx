"use client";
import React from "react";
import supabase from "@/utils/supabaseClient";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

function SupaSignin() {
  // Set up supabase auth
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // redirecting
  if (session) {
    router.push("/platinum");
  }

  if (!session) {
    return (
      <div className="flex justify-center min-w-full mt-40">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#0063D9",
                  brandAccent: "#0063D9",
                },
              },
            },
          }}
        />
      </div>
    );
  }
}

export default SupaSignin;

// infromation from:https://github.com/supabase/auth-ui/blob/main/packages/shared/src/theming/Themes.ts
// https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#predefined-themes
// https://supabase.com/docs/guides/auth/quickstarts/react
