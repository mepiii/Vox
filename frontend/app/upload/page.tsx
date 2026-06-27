// Purpose: Vox upload and processing workflow page.
// Callers: Next.js App Router.
// Deps: UploadDropzone, ProcessingLoader, API client.
// API: UploadPage component.
// Side effects: Uploads and transcribes selected file.
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ProcessingLoader } from "@/components/ProcessingLoader";
import { Toast } from "@/components/Toast";
import { UploadDropzone } from "@/components/UploadDropzone";
import { transcribeFile, uploadFile } from "@/lib/api";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("auto");
  const [modelSize, setModelSize] = useState("tiny");
  const [outputMode, setOutputMode] = useState("transcript_subtitles");
  const [step, setStep] = useState(-1);
  const [error, setError] = useState("");
  const process = async () => {
    if (!file) return setError("Choose an audio or video file first.");
    try {
      setError(""); setStep(0);
      const upload = await uploadFile(file);
      setStep(3);
      const result = await transcribeFile(upload.file_id, language, modelSize, outputMode);
      sessionStorage.setItem("vox:lastResult", JSON.stringify(result));
      sessionStorage.setItem("vox:lastFileType", upload.file_type);
      setStep(6);
      router.push("/editor");
    } catch (event) {
      setError(event instanceof Error ? event.message : "Vox processing failed.");
      setStep(-1);
    }
  };
  return <main className="mx-auto max-w-6xl px-6 py-8"><a href="/"><Logo /></a><div className="grid gap-8 py-12 lg:grid-cols-[1fr_.75fr]"><div className="space-y-6"><UploadDropzone file={file} onFile={setFile} />{error && <Toast tone="error" message={error} />}</div><aside className="panel rounded-[2rem] p-6"><h1 className="font-display text-3xl font-semibold">Transcription setup</h1><div className="mt-6 grid gap-4"><label className="grid gap-2 text-sm text-slate-300">Language<select value={language} onChange={(event) => setLanguage(event.target.value)} className="rounded-2xl bg-slate-950/70 px-4 py-3 text-white"><option value="auto">Auto detect</option><option value="en">English</option><option value="id">Indonesian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="es">Spanish</option><option value="fr">French</option><option value="de">German</option></select></label><label className="grid gap-2 text-sm text-slate-300">Model size<select value={modelSize} onChange={(event) => setModelSize(event.target.value)} className="rounded-2xl bg-slate-950/70 px-4 py-3 text-white"><option>tiny</option><option>base</option><option>small</option><option>medium</option></select></label><label className="grid gap-2 text-sm text-slate-300">Output<select value={outputMode} onChange={(event) => setOutputMode(event.target.value)} className="rounded-2xl bg-slate-950/70 px-4 py-3 text-white"><option value="transcript">Transcript only</option><option value="subtitles">Subtitles only</option><option value="transcript_subtitles">Transcript + subtitles</option></select></label><button onClick={process} className="rounded-2xl bg-cyan-300 px-5 py-4 font-black text-slate-950">Generate</button></div></aside></div>{step >= 0 && <ProcessingLoader step={step} />}</main>;
}
