"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { ChevronsDown, Github, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

interface NavBarProps{
  homepage: boolean
}

const routeList: RouteProps[] = [
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#contact",
    label: "Contact",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Showcase Your Value ",
    description: "Highlight how your product solves user problems.",
  },
  {
    title: "Build Trust",
    description:
      "Leverages social proof elements to establish trust and credibility.",
  },
  {
    title: "Capture Leads",
    description:
      "Make your lead capture form visually appealing and strategically.",
  },
];

export const Navbar = ({homepage}:NavBarProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: "/compiler/javascript",
    });
  };

  return (
    <header 
      className={cn(
        !homepage && 'm-6',
        'shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card'
      )}
    >
      <Link href="/" className="font-bold text-lg flex items-center">
        <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        Code Compiler
      </Link>

      {/* Mobile Menu */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <ChevronsDown className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
                    Shadcn
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Menu */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          {homepage && (
             <NavigationMenuItem>
             <NavigationMenuTrigger className="bg-card text-base">
               Features
             </NavigationMenuTrigger>
             <NavigationMenuContent>
               <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                 <Image
                   src="https://avatars.githubusercontent.com/u/75042455?v=4"
                   alt="RadixLogo"
                   className="h-full w-full rounded-md object-cover"
                   width={600}
                   height={600}
                 />
                 <ul className="flex flex-col gap-2">
                   {featureList.map(({ title, description }) => (
                     <li
                       key={title}
                       className="rounded-md p-3 text-sm hover:bg-muted"
                     >
                       <p className="mb-1 font-semibold leading-none text-foreground">
                         {title}
                       </p>
                       <p className="line-clamp-2 text-muted-foreground">
                         {description}
                       </p>
                     </li>
                   ))}
                 </ul>
               </div>
             </NavigationMenuContent>
           </NavigationMenuItem>
          )}
         
          <NavigationMenuItem>
          <NavigationMenuLink  asChild>
                <Link href="/compiler/javascript" className="text-base px-2">
                  Compiler
                </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>


          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex items-center gap-2">
        <ToggleTheme />
        {/* Conditionally render GitHub logo or User Dropdown */}
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
              <div className="h-9 w-9 rounded-full overflow-hidden">
                <Image
                  src={session.user?.profielURL || "/boyavatar.jpg"}
                  alt={session.user?.name || "User"}
                  className="object-cover"
                  width={1000}
                  height={1000}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="p-2">
                <p className="font-bold">{session.user?.name}</p>
                <p className="text-sm">{session.user?.email}</p>
              </div>
              <DropdownMenuItem>
                <p onClick={() => router.push(`/dashboard`)}>
                  Dashboard
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {!session && (
        <motion.button
          onClick={handleGoogleSignIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex text-sm justify-center items-center py-2 px-3 rounded-md shadow-sm bg-inherit font-medium text-muted-foreground hover:bg-muted/50"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          Sign in with Google
        </motion.button>
      )}
    </header>
  );
};
