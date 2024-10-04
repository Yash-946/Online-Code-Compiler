"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Github, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInData, signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import OauthTemplate from "./OauthTemplate";
import IconCloud from "@/components/magicui/icon-cloud";

const IconWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {children}
  </motion.div>
);

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

const Signin = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        toast.error(`${error}`);
      }, 600);

      // Cleanup to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [error])


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInData> = async (data) => {
    console.log(data);
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password
    });
    console.log("Sign-in Result", result);

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast.error(`Login Failed`)
      } else {
        toast.error(`${result?.error}`)
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 ">
        <div className="flex items-center justify-center mt-10 bg-background">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-xl"
          >
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-foreground">
                &lt; Sign In /&gt;
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <IconWrapper>
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </IconWrapper>
                    <input
                      id="email"
                      type="text"
                      required
                      className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <IconWrapper>
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </IconWrapper>
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                  </div>
                  {errors.password && (
                    <span className="text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.button>
              </div>
            </form>

            {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handleGoogleSignIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-muted rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted/50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  Google
                </motion.button>

                <motion.button
                  onClick={handleGithubSignIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-muted rounded-md shadow-sm bg-background text-sm font-medium text-muted-foreground hover:bg-muted/50"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </motion.button>
              </div>
            </div> */}

            <OauthTemplate />

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <motion.a
                  href="/sign-up"
                  className="font-medium text-primary hover:text-primary/80"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  &lt; Sign Up /&gt;
                </motion.a>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-10  ">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>
    </>
  );
};

export default Signin;
