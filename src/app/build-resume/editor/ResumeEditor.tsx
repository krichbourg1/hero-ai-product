import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import { useState } from "react";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import ResumePreviewSection from "./ResumePreviewSection";

interface ResumeEditorProps {
  initialData?: ResumeValues;
}

const steps = [
  {
    key: "summary",
    title: "Summary",
    component: SummaryForm,
  },
  {
    key: "work-experience",
    title: "Work Experience",
    component: WorkExperienceForm,
  },
  {
    key: "education",
    title: "Education",
    component: EducationForm,
  },
  {
    key: "skills",
    title: "Skills",
    component: SkillsForm,
  },
] as const;

type StepKey = typeof steps[number]["key"];

export default function ResumeEditor({ initialData = {} }: ResumeEditorProps) {
  const [resumeData, setResumeData] = useState<ResumeValues>(initialData);
  const [currentStep, setCurrentStep] = useState<StepKey>("summary");
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const CurrentForm = steps.find((step) => step.key === currentStep)?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <nav className="flex gap-1 overflow-x-auto">
              {steps.map((step) => (
                <button
                  key={step.key}
                  onClick={() => setCurrentStep(step.key)}
                  className={cn(
                    "flex-none rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                    currentStep === step.key &&
                      "bg-secondary text-secondary-foreground",
                  )}
                >
                  {step.title}
                </button>
              ))}
            </nav>
            {CurrentForm && (
              <CurrentForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <footer className="flex items-center justify-between gap-3 border-t px-3 py-5">
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              const currentIndex = steps.findIndex(
                (step) => step.key === currentStep,
              );
              if (currentIndex > 0) {
                setCurrentStep(steps[currentIndex - 1].key);
              }
            }}
            disabled={currentStep === steps[0].key}
          >
            Previous step
          </Button>
          <Button
            onClick={() => {
              const currentIndex = steps.findIndex(
                (step) => step.key === currentStep,
              );
              if (currentIndex < steps.length - 1) {
                setCurrentStep(steps[currentIndex + 1].key);
              }
            }}
            disabled={currentStep === steps[steps.length - 1].key}
          >
            Next step
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
          className="md:hidden"
          title={
            showSmResumePreview ? "Show input form" : "Show resume preview"
          }
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUserIcon />}
        </Button>
      </footer>
    </div>
  );
} 