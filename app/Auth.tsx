"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js"; // for supabase's function
import { Auth } from "@supabase/auth-ui-react"; // for Auth UI
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from "next/navigation";


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'default_url';
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'default_key';

const supabase = createClient(SUPABASE_URL, ANON_KEY);


const AuthUI = () => {
    const router = useRouter();
    useEffect(() => {
      const checkSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.push("/dashboard");
        }
      };
      checkSession();
    });

    supabase.auth.onAuthStateChange((event) => {
      if (event == "SIGNED_IN") {
        router.push("/dashboard");
      }
    });

    return (
      <div className="auth">
        <Auth
          supabaseClient={supabase}
          theme="light"
          appearance={{theme: ThemeSupa}}
          providers={["github", "twitter"]}
          view="sign_in"
        />
      </div>
    );
  };

  export default AuthUI;