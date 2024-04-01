import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TestCardProps = {
  onClickHandler: () => void;
  title: string;
  description: string;
};

export default function TestCard({
  onClickHandler,
  title,
  description,
}: TestCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 w-full">
          <Button onClick={onClickHandler} className="w-full">
            Run Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
