"use client";
import React from "react";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Send } from "lucide-react";

type Props = {};

export default function GPTView({}: Props) {
  const [prompt, setPrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState("");

  const handlePromptRequest = async () => {
    setLoading(true);
    const res = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({ recipe: prompt }),
    });
    const responseJson = await res.json();
    console.log("responseJson", responseJson);

    setResponse(responseJson.gpt);
    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full lg:w-[70%]">
        <CardHeader>
          <Textarea
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
          />
          <div className="w-full flex justify-end py-2">
            {prompt.length > 0 ? (
              <Button onClick={handlePromptRequest}>
                <Send size={15} className="mr-2" /> Send
              </Button>
            ) : (
              <Button onClick={handlePromptRequest} disabled>
                <Send size={15} className="mr-2" /> Send
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex justify-center items-center p-6">
          {loading ? (
            <Loader2 size={28} className="animate-spin"/>
          ) : (
            <div className="flex justify-start w-full">
              {response.length > 0 && (
                <div className="py-3 px-6 bg-slate-100 w-full rounded-md shadow-md">
                  <h1 className="text-xl text-center py-3 font-semibold">
                    Nutrition Facts
                  </h1>
                  <div className="text-left">
                    {response.split("\n").map((item, index) => {
                      return (
                        <p key={index} className="py-1 text-[14px]">
                          {item}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
