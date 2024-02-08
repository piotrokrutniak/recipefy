"use client";

import { FaPizzaSlice, FaBars, FaPaperPlane } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import Button from "../generic/button";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { useUser } from "@/app/utilities/contexts/user/UserContext";

export default function NavBar() {
  const [showMobile, setShowMobile] = useState(false);
  const { user, signOut } = useUser();

  return (
    <div className="bg-black/80 sticky top-0 z-20 backdrop-blur-xl">
      <div className="w-full flex bg-black">
        <div className="p-2 m-auto w-full flex max-w-7xl justify-between items-center">
          <Link href="/">
            <div
              className="flex gap-1 h-fit select-none cursor-pointer active:opacity-80 active:pb-0 
                            border-opacity-0 border-indigo-400 hover:border-opacity-100 border-b-0 transition-all group"
            >
              <FaPizzaSlice className="h-full w-6 mt-1 fill-white group-hover:fill-indigo-400" />
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-white group-hover:bg-gradient-to-r from-indigo-400 to-indigo-500 transition-all">
                Recipefy
              </h1>
            </div>
          </Link>
          <div className="hidden text-lg gap-4 md:flex">
            <Link href={"/recipes"}>
              <Button
                className="text-white bg-transparent active:bg-slate-100/5 hover:bg-slate-200/10"
                onClick={undefined}
              >
                Recipes
              </Button>
            </Link>
            {user?.isSignedIn &&
            <Link href={"/admin"}>
              <Button
                className="text-white bg-transparent active:bg-slate-100/5 hover:bg-slate-200/10"
                onClick={undefined}
              >
                Admin
              </Button>
            </Link>}
            {user?.isSignedIn ?
              <Button
                className="text-white bg-indigo-500 bg-opacity-80 active:bg-opacity-80 hover:bg-opacity-100"
                onClick={signOut}
              >
                Sign Out
              </Button> :
              <> 
                <Link href={"/auth/signin"}>
                  <Button
                    className="text-white bg-indigo-500 bg-opacity-80 active:bg-opacity-80 hover:bg-opacity-100"
                    onClick={undefined}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href={"/auth/signup"}>
                  <Button
                    className="text-white border-white/60 border-2 border-solid bg-transparent active:bg-slate-100/5 hover:bg-slate-100/10 hover:border-indigo-200/60"
                    onClick={undefined}
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            }
          </div>
          <div className="md:hidden">
            <FaBars
              className="h-8 w-8 fill-white cursor-pointer hover:fill-vermilion-400 active:opacity-80"
              onClick={() => setShowMobile(true)}
            />
          </div>
          <div
            className={`${showMobile ? "" : "translate-x-full"} absolute w-screen h-screen bg-black left-0 top-0 md:hidden transition-all z-50 ease-in-out`}
          >
            <div id="mobile-header" className="flex flex-row-reverse w-full">
              <BsX
                className="fill-white w-14 h-14 cursor-pointer hover:fill-vermilion-400"
                onClick={() => setShowMobile(false)}
              />
            </div>
            <div id="mobile-body" className="p-8 flex flex-col gap-3">
            <Link href={"/recipes"}>
              <Button
                className="text-white bg-transparent active:bg-slate-100/5 hover:bg-slate-200/10 border border-white/60 border-opacity-20 w-full"
                onClick={() => setShowMobile(false)}
              >
                Przepisy
              </Button>
            </Link>
            {user?.isSignedIn &&
            <Link href={"/admin"}>
              <Button
                className="text-white bg-transparent active:bg-slate-100/5 hover:bg-slate-200/10 border border-white/60 border-opacity-20 w-full"
                onClick={() => setShowMobile(false)}
              >
                Admin
              </Button>
            </Link>}
              {user?.isSignedIn ?
              <Button
                className="text-white bg-indigo-500 bg-opacity-80 active:bg-opacity-80 hover:bg-opacity-100"
                onClick={() => {
                  signOut();
                  setShowMobile(false);
                }}
              >
                Sign Out
              </Button> :
              <> 
                <Link href={"/auth/signin"}>
                  <Button
                    className="text-white border-white/60 border-2 border-solid bg-transparent active:bg-slate-100/5 hover:bg-slate-100/10 hover:border-indigo-200/60 w-full"
                    onClick={() => setShowMobile(false)}
                  >
                    Zaloguj
                  </Button>
                </Link>
                <Link href={"/auth/signup"}>
                  <Button
                    className="text-white bg-indigo-500 bg-opacity-80 active:bg-opacity-80 hover:bg-opacity-100 w-full"
                    onClick={() => setShowMobile(false)}
                    disabled={true}
                  >
                    Załóż Konto
                  </Button>
                </Link>
              </>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
