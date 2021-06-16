import React, { useState } from "react";

export interface Step {
    title: string;
    component: React.ReactNode;
}

type ISteps = [
    currentStep: Step,
    nextStep: Step | undefined,
    previous: () => void,
    next: () => void,
    isStart: boolean,
    isEnd: boolean,
    index: number,
    length: number,
]

export function useSteps(steps: Step[]): ISteps {
    const [index, setIndex] = useState<number>(0);
    const currentStep = steps[index];
    const nextStep = (index < steps.length) ? steps[index+1] : undefined;
    const isStart = index <= 0;
    const isEnd = index >= steps.length - 1;
    const length = steps.length;

    const next = () => {
        if (index < steps.length) setIndex(index + 1);
    }

    const previous = () => {
        if (index > 0) setIndex(index - 1);
    }

    return [currentStep, nextStep, next, previous, isStart, isEnd, index, length];
}