"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Download,
  ExternalLink,
  BookOpen,
  Play,
  Loader2,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  titleEs: string;
  description?: string | null;
  descriptionEs?: string | null;
  videoUrl?: string | null;
  duration?: string | null;
  order: number;
  moduleId: string;
  resources: { id: string; title: string; url: string; type: string }[];
}

interface LessonData {
  lesson: Lesson;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  isCompleted: boolean;
  courseSlug: string;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { courseSlug, lessonId } = params as {
    courseSlug: string;
    lessonId: string;
  };

  const [data, setData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    fetch(`/api/student/lessons/${lessonId}?courseSlug=${courseSlug}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [lessonId, courseSlug]);

  const markComplete = async () => {
    if (!data) return;
    setMarking(true);
    await fetch(`/api/student/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId }),
    });
    setData((prev) => prev ? { ...prev, isCompleted: true } : prev);
    setMarking(false);

    if (data.nextLesson) {
      router.push(`/student/cursos/${courseSlug}/leccion/${data.nextLesson.id}`);
    } else {
      router.push(`/student/cursos/${courseSlug}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[#FFD700]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 pt-20 lg:pt-8 text-center">
        <p className="text-[#606060] font-mono">Lesson not found.</p>
        <Link href={`/student/cursos/${courseSlug}`}>
          <Button variant="primary" size="md" className="mt-4">Back to Course</Button>
        </Link>
      </div>
    );
  }

  const { lesson, prevLesson, nextLesson, isCompleted } = data;

  // Convert YouTube watch URL to embed
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/embed/")) return url;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
    return url;
  };

  return (
    <div className="pt-20 lg:pt-0 min-h-screen">
      {/* Top navigation bar */}
      <div className="border-b border-[#1A1A1A] bg-[#0A0A0A] px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <Link
          href={`/student/cursos/${courseSlug}`}
          className="flex items-center gap-1.5 text-xs font-mono text-[#606060] hover:text-[#FFD700] transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Course
        </Link>

        {isCompleted && (
          <Badge variant="success" size="sm">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )}
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] lg:h-[calc(100vh-48px)]">
        {/* Video area */}
        <div className="flex-1 flex flex-col bg-black overflow-hidden">
          {/* Video */}
          <div className="flex-1 relative bg-[#050505]">
            {lesson.videoUrl ? (
              <iframe
                src={getEmbedUrl(lesson.videoUrl)}
                className="w-full h-full absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="h-20 w-20 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-[#FFD700]" />
                </div>
                <p className="text-[#606060] font-mono text-sm">No video for this lesson</p>
              </div>
            )}
          </div>

          {/* Lesson info */}
          <div className="bg-[#0A0A0A] border-t border-[#1A1A1A] p-5">
            <div className="max-w-4xl">
              <h1 className="text-xl font-mono font-bold text-white mb-2">{lesson.title}</h1>
              {lesson.description && (
                <p className="text-sm text-[#A0A0A0] font-sans mb-4">{lesson.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {!isCompleted ? (
                  <Button
                    variant="primary"
                    size="md"
                    loading={marking}
                    onClick={markComplete}
                    icon={<CheckCircle className="h-4 w-4" />}
                  >
                    {nextLesson ? "Complete & Next Lesson" : "Complete Lesson"}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Lesson Completed
                  </div>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  {prevLesson && (
                    <Link href={`/student/cursos/${courseSlug}/leccion/${prevLesson.id}`}>
                      <Button variant="outline" size="sm" icon={<ArrowLeft className="h-3.5 w-3.5" />}>
                        Prev
                      </Button>
                    </Link>
                  )}
                  {nextLesson && (
                    <Link href={`/student/cursos/${courseSlug}/leccion/${nextLesson.id}`}>
                      <Button variant="outline" size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
                        Next
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resources sidebar */}
        {lesson.resources.length > 0 && (
          <div className="w-full lg:w-80 bg-[#0A0A0A] border-l border-[#1A1A1A] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[#1A1A1A]">
              <h3 className="text-xs font-mono tracking-widest uppercase text-[#FFD700]">
                Resources
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col gap-2">
                {lesson.resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#141414] border border-[#1A1A1A] hover:border-[#FFD700]/20 transition-all group"
                  >
                    <div className="h-8 w-8 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                      {resource.type === "pdf" ? (
                        <Download className="h-3.5 w-3.5 text-[#FFD700]" />
                      ) : (
                        <ExternalLink className="h-3.5 w-3.5 text-[#FFD700]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-white truncate group-hover:text-[#FFD700] transition-colors">
                        {resource.title}
                      </p>
                      <p className="text-[10px] font-mono text-[#404040] uppercase">
                        {resource.type}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
