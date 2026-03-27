"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { ArrowLeft, Save } from "lucide-react";

export default function NewCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", titleEs: "", slug: "", description: "", descriptionEs: "",
    price: "0", level: "beginner", duration: "", status: "draft", featured: "false",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseFloat(form.price), featured: form.featured === "true" }),
    });
    if (res.ok) router.push("/admin/cursos");
    else setLoading(false);
  };

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8 max-w-3xl">
      <Link href="/admin/cursos" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#606060] hover:text-[#FFD700] transition-colors mb-6">
        <ArrowLeft className="h-3 w-3" /> Back to Courses
      </Link>
      <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-8">Add New Course</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Title (EN)" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          <Input label="Title (ES)" value={form.titleEs} onChange={(e) => set("titleEs", e.target.value)} required />
        </div>
        <Input label="Slug (URL)" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="mi-curso-electrico" required />
        <Textarea label="Description (EN)" value={form.description} onChange={(e) => set("description", e.target.value)} required />
        <Textarea label="Description (ES)" value={form.descriptionEs} onChange={(e) => set("descriptionEs", e.target.value)} required />
        <div className="grid sm:grid-cols-3 gap-5">
          <Input label="Price (USD)" type="number" value={form.price} onChange={(e) => set("price", e.target.value)} />
          <Select label="Level" value={form.level} onChange={(e) => set("level", e.target.value)}
            options={[{ value: "beginner", label: "Beginner" }, { value: "intermediate", label: "Intermediate" }, { value: "advanced", label: "Advanced" }]} />
          <Input label="Duration" value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="40 hours" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Select label="Status" value={form.status} onChange={(e) => set("status", e.target.value)}
            options={[{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }]} />
          <Select label="Featured" value={form.featured} onChange={(e) => set("featured", e.target.value)}
            options={[{ value: "false", label: "No" }, { value: "true", label: "Yes" }]} />
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary" size="md" loading={loading} icon={<Save className="h-4 w-4" />}>
            Save Course
          </Button>
          <Link href="/admin/cursos"><Button type="button" variant="outline" size="md">Cancel</Button></Link>
        </div>
      </form>
    </div>
  );
}
