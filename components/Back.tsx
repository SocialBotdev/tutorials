"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const GoBackButton = () => {
  return (
            <Link href="/">
              <Button
                variant="outline"
                className="hover:bg-coral-1 hover:border-coral-4 hover:text-coral-7 transition-all duration-300 hover:scale-105 active:scale-95 bg-transparent border-coral-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                 articles
              </Button>
            </Link>
  );
};

export default GoBackButton;