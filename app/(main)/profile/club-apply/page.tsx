"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  Globe2,
  ImagePlus,
  Info,
  Mail,
  MapPin,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
type UploadedDocument = { id: number; file: File; type: string };
const documentTypes = [
  "Club proposal",
  "College / Institution proof",
  "Authorization letter",
  "Organizer ID proof",
  "Other supporting document",
];
export default function ClubApplicationPage() {
  const [step, setStep] = useState(1);
  const [clubName, setClubName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [institution, setInstitution] = useState("");
  const [city, setCity] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [organizerPhone, setOrganizerPhone] = useState("");
  const [memberCount, setMemberCount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [documentType, setDocumentType] = useState(documentTypes[0]);
  const addDocument = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a PDF, JPG, PNG or WebP file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Each document must be smaller than 10 MB.");
      return;
    }
    setDocuments((prev) => [
      ...prev,
      { id: Date.now(), file, type: documentType },
    ]);
    setError("");
  };
  const handleDocumentUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      addDocument(file);
    }
    e.target.value = "";
  };
  const removeDocument = (id: number) => {
    setDocuments((prev) => prev.filter((document) => document.id !== id));
  };
  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Club logo must be an image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Club logo must be smaller than 5 MB.");
      return;
    }
    setLogo(file);
    setError("");
  };
  const nextStep = () => {
    setError("");
    if (step === 1) {
      if (!clubName.trim()) {
        setError("Please enter your club name.");
        return;
      }
      if (!category) {
        setError("Please select a club category.");
        return;
      }
      if (!description.trim()) {
        setError("Please describe your club.");
        return;
      }
      if (!institution.trim()) {
        setError("Please enter your institution.");
        return;
      }
    }
    if (step === 2) {
      if (!organizerName.trim()) {
        setError("Please enter the organizer's name.");
        return;
      }
      if (!organizerEmail.trim()) {
        setError("Please enter the organizer's email.");
        return;
      }
      if (!organizerPhone.trim()) {
        setError("Please enter the organizer's phone number.");
        return;
      }
      if (!memberCount) {
        setError("Please select your expected member count.");
        return;
      }
      if (!purpose.trim()) {
        setError("Please describe the purpose of the club.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };
  const previousStep = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!agreed) {
      setError("Please confirm that the information provided is accurate.");
      return;
    }
    /* Example production implementation: const formData = new FormData(); formData.append("clubName", clubName); formData.append("category", category); formData.append("description", description); formData.append("institution", institution); formData.append("city", city); formData.append("organizerName", organizerName); formData.append("organizerEmail", organizerEmail); formData.append("organizerPhone", organizerPhone); formData.append("memberCount", memberCount); formData.append("purpose", purpose); formData.append("instagram", instagram); formData.append("linkedin", linkedin); formData.append("website", website); if (logo) { formData.append("logo", logo); } documents.forEach((document) => { formData.append("documents", document.file); }); await fetch("/api/clubs/apply", { method: "POST", body: formData, }); */ setSubmitted(
      true
    );
  };
  if (submitted) {
    return <ApplicationSubmitted clubName={clubName} />;
  }
  return (
    <main className="min-h-screen bg-[#08080b] text-white">
      {" "}
      {/* Header */}{" "}
      <header className="border-b border-white/5 bg-[#08080b]/90">
        {" "}
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          {" "}
          <Link href="/" className="flex items-center gap-2.5">
            {" "}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
              {" "}
              <Globe2 className="h-4 w-4" />{" "}
            </div>{" "}
            <span className="text-lg font-bold"> evento </span>{" "}
          </Link>{" "}
          <Link
            href="/clubs"
            className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
          >
            {" "}
            <ArrowLeft className="h-4 w-4" /> Back to clubs{" "}
          </Link>{" "}
        </div>{" "}
      </header>{" "}
      {/* Main */}{" "}
      <div className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-14">
        {" "}
        {/* Heading */}{" "}
        <div className="max-w-2xl">
          {" "}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs text-violet-300">
            {" "}
            <Building2 className="h-3.5 w-3.5" /> Club onboarding{" "}
          </div>{" "}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {" "}
            Start your own club.{" "}
          </h1>{" "}
          <p className="mt-4 text-sm leading-7 text-zinc-500 sm:text-base">
            {" "}
            Build a community on Evento, organize events, grow your membership
            and give your club its own digital space.{" "}
          </p>{" "}
        </div>{" "}
        {/* Steps */}{" "}
        <div className="mt-10 flex items-center">
          {" "}
          <Step
            number={1}
            label="Club details"
            active={step === 1}
            completed={step > 1}
          />{" "}
          <div
            className={`h-px flex-1 ${
              step > 1 ? "bg-violet-500" : "bg-zinc-800"
            }`}
          />{" "}
          <Step
            number={2}
            label="Organizer"
            active={step === 2}
            completed={step > 2}
          />{" "}
          <div
            className={`h-px flex-1 ${
              step > 2 ? "bg-violet-500" : "bg-zinc-800"
            }`}
          />{" "}
          <Step
            number={3}
            label="Documents"
            active={step === 3}
            completed={false}
          />{" "}
        </div>{" "}
        {/* Form */}{" "}
        <form onSubmit={handleSubmit} className="mt-10">
          {" "}
          <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
            {" "}
            <div>
              {" "}
              {/* STEP 1 */}{" "}
              {step === 1 && (
                <div className="space-y-6">
                  {" "}
                  <FormSection
                    title="Club information"
                    description="Tell us about the community you want to build."
                  />{" "}
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5 sm:p-7">
                    {" "}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {" "}
                      <Input
                        label="Club name"
                        required
                        value={clubName}
                        onChange={setClubName}
                        placeholder="e.g. Coding Club SSTC"
                      />{" "}
                      <div>
                        {" "}
                        <label className="mb-2 block text-sm font-medium text-zinc-300">
                          {" "}
                          Category{" "}
                          <span className="ml-1 text-violet-400"> * </span>{" "}
                        </label>{" "}
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-white outline-none focus:border-violet-500"
                        >
                          {" "}
                          <option value=""> Select category </option>{" "}
                          <option>Technology</option> <option>Cultural</option>{" "}
                          <option>Sports</option>{" "}
                          <option>Entrepreneurship</option>{" "}
                          <option>Arts & Design</option>{" "}
                          <option>Social Impact</option>{" "}
                          <option>Academic</option> <option>Other</option>{" "}
                        </select>{" "}
                      </div>{" "}
                      <Input
                        label="Institution / College"
                        required
                        value={institution}
                        onChange={setInstitution}
                        placeholder="Your college or organization"
                      />{" "}
                      <Input
                        label="City"
                        value={city}
                        onChange={setCity}
                        placeholder="e.g. Bhilai"
                        icon={<MapPin className="h-4 w-4" />}
                      />{" "}
                    </div>{" "}
                    <div className="mt-5">
                      {" "}
                      <label className="mb-2 block text-sm font-medium text-zinc-300">
                        {" "}
                        About the club{" "}
                        <span className="ml-1 text-violet-400"> * </span>{" "}
                      </label>{" "}
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        placeholder="What is your club about? What kind of activities will you organize?"
                        className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-zinc-700 focus:border-violet-500"
                      />{" "}
                      <p className="mt-2 text-xs text-zinc-700">
                        {" "}
                        {description.length}/500 characters{" "}
                      </p>{" "}
                    </div>{" "}
                    {/* Logo */}{" "}
                    <div className="mt-6">
                      {" "}
                      <label className="mb-2 block text-sm font-medium text-zinc-300">
                        {" "}
                        Club logo{" "}
                      </label>{" "}
                      <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-950 p-4 transition hover:border-violet-500/50">
                        {" "}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-900">
                          {" "}
                          {logo ? (
                            <img
                              src={URL.createObjectURL(logo)}
                              alt="Club logo"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImagePlus className="h-5 w-5 text-zinc-600" />
                          )}{" "}
                        </div>{" "}
                        <div className="min-w-0">
                          {" "}
                          <p className="text-sm font-medium">
                            {" "}
                            {logo ? logo.name : "Upload club logo"}{" "}
                          </p>{" "}
                          <p className="mt-1 text-xs text-zinc-600">
                            {" "}
                            PNG, JPG or WebP · Max 5 MB{" "}
                          </p>{" "}
                        </div>{" "}
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />{" "}
                      </label>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex justify-end">
                    {" "}
                    <NextButton onClick={nextStep}>
                      {" "}
                      Continue <ArrowRight className="h-4 w-4" />{" "}
                    </NextButton>{" "}
                  </div>{" "}
                </div>
              )}{" "}
              {/* STEP 2 */}{" "}
              {step === 2 && (
                <div className="space-y-6">
                  {" "}
                  <FormSection
                    title="Organizer information"
                    description="Tell us about the person responsible for the club."
                  />{" "}
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5 sm:p-7">
                    {" "}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {" "}
                      <Input
                        label="Organizer name"
                        required
                        value={organizerName}
                        onChange={setOrganizerName}
                        placeholder="Full name"
                        icon={<Users className="h-4 w-4" />}
                      />{" "}
                      <Input
                        label="Email address"
                        required
                        value={organizerEmail}
                        onChange={setOrganizerEmail}
                        placeholder="you@example.com"
                        type="email"
                        icon={<Mail className="h-4 w-4" />}
                      />{" "}
                      <Input
                        label="Phone number"
                        required
                        value={organizerPhone}
                        onChange={setOrganizerPhone}
                        placeholder="+91 98765 43210"
                        type="tel"
                      />{" "}
                      <div>
                        {" "}
                        <label className="mb-2 block text-sm font-medium text-zinc-300">
                          {" "}
                          Expected members{" "}
                          <span className="ml-1 text-violet-400"> * </span>{" "}
                        </label>{" "}
                        <select
                          value={memberCount}
                          onChange={(e) => setMemberCount(e.target.value)}
                          className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm outline-none focus:border-violet-500"
                        >
                          {" "}
                          <option value=""> Select range </option>{" "}
                          <option>Under 25</option> <option>25–100</option>{" "}
                          <option>100–500</option> <option>500–1000</option>{" "}
                          <option>1000+</option>{" "}
                        </select>{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="mt-5">
                      {" "}
                      <label className="mb-2 block text-sm font-medium text-zinc-300">
                        {" "}
                        Club purpose{" "}
                        <span className="ml-1 text-violet-400"> * </span>{" "}
                      </label>{" "}
                      <textarea
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        rows={5}
                        placeholder="What do you want to achieve through this club? Who will benefit from it?"
                        className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm leading-6 outline-none placeholder:text-zinc-700 focus:border-violet-500"
                      />{" "}
                    </div>{" "}
                    <div className="mt-6">
                      {" "}
                      <p className="mb-3 text-sm font-medium text-zinc-300">
                        {" "}
                        Club social links{" "}
                      </p>{" "}
                      <div className="space-y-3">
                        {" "}
                        <SocialInput
                          icon={
                            <span className="text-xs font-semibold">IG</span>
                          }
                          placeholder="Instagram profile URL"
                          value={instagram}
                          onChange={setInstagram}
                        />{" "}
                        <SocialInput
                          icon={
                            <span className="text-xs font-semibold">in</span>
                          }
                          placeholder="LinkedIn page URL"
                          value={linkedin}
                          onChange={setLinkedin}
                        />{" "}
                        <SocialInput
                          icon={<Globe2 className="h-4 w-4" />}
                          placeholder="Website URL"
                          value={website}
                          onChange={setWebsite}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex justify-between">
                    {" "}
                    <BackButton onClick={previousStep}>
                      {" "}
                      <ArrowLeft className="h-4 w-4" /> Back{" "}
                    </BackButton>{" "}
                    <NextButton onClick={nextStep}>
                      {" "}
                      Continue <ArrowRight className="h-4 w-4" />{" "}
                    </NextButton>{" "}
                  </div>{" "}
                </div>
              )}{" "}
              {/* STEP 3 */}{" "}
              {step === 3 && (
                <div className="space-y-6">
                  {" "}
                  <FormSection
                    title="Supporting documents"
                    description="Upload documents that help us verify your club application."
                  />{" "}
                  <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5 sm:p-7">
                    {" "}
                    <div className="rounded-xl border border-blue-500/10 bg-blue-500/[0.03] p-4">
                      {" "}
                      <div className="flex gap-3">
                        {" "}
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />{" "}
                        <div>
                          {" "}
                          <p className="text-xs font-medium text-blue-300">
                            {" "}
                            Documents are used for verification{" "}
                          </p>{" "}
                          <p className="mt-1 text-xs leading-5 text-zinc-600">
                            {" "}
                            Upload only documents relevant to your club
                            application. Accepted formats are PDF, JPG, PNG and
                            WebP. Maximum size is 10 MB per file.{" "}
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Document uploader */}{" "}
                    <div className="mt-6">
                      {" "}
                      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                        {" "}
                        <select
                          value={documentType}
                          onChange={(e) => setDocumentType(e.target.value)}
                          className="h-12 rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm outline-none focus:border-violet-500"
                        >
                          {" "}
                          {documentTypes.map((type) => (
                            <option key={type}> {type} </option>
                          ))}{" "}
                        </select>{" "}
                        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500">
                          {" "}
                          <Upload className="h-4 w-4" /> Upload document{" "}
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            onChange={handleDocumentUpload}
                            className="hidden"
                          />{" "}
                        </label>{" "}
                      </div>{" "}
                      {/* Drop zone */}{" "}
                      <label className="mt-4 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-950/70 text-center transition hover:border-violet-500/50">
                        {" "}
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900">
                          {" "}
                          <FileText className="h-5 w-5 text-zinc-600" />{" "}
                        </div>{" "}
                        <p className="mt-3 text-sm font-medium">
                          {" "}
                          Drop a document here{" "}
                        </p>{" "}
                        <p className="mt-1 text-xs text-zinc-600">
                          {" "}
                          or click to browse your files{" "}
                        </p>{" "}
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png,.webp"
                          onChange={handleDocumentUpload}
                          className="hidden"
                        />{" "}
                      </label>{" "}
                    </div>{" "}
                    {/* Uploaded files */}{" "}
                    {documents.length > 0 && (
                      <div className="mt-6 space-y-3">
                        {" "}
                        <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                          {" "}
                          Uploaded documents{" "}
                        </p>{" "}
                        {documents.map((document) => (
                          <div
                            key={document.id}
                            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-3"
                          >
                            {" "}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                              {" "}
                              <FileCheck2 className="h-4 w-4" />{" "}
                            </div>{" "}
                            <div className="min-w-0 flex-1">
                              {" "}
                              <p className="truncate text-sm font-medium">
                                {" "}
                                {document.file.name}{" "}
                              </p>{" "}
                              <p className="mt-1 text-[10px] text-zinc-600">
                                {" "}
                                {document.type} ·{" "}
                                {formatFileSize(document.file.size)}{" "}
                              </p>{" "}
                            </div>{" "}
                            <button
                              type="button"
                              onClick={() => removeDocument(document.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
                              aria-label="Remove document"
                            >
                              {" "}
                              <Trash2 className="h-4 w-4" />{" "}
                            </button>{" "}
                          </div>
                        ))}{" "}
                      </div>
                    )}{" "}
                    {/* Optional checklist */}{" "}
                    <div className="mt-7 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                      {" "}
                      <p className="text-sm font-medium">
                        {" "}
                        Recommended documents{" "}
                      </p>{" "}
                      <div className="mt-4 space-y-3">
                        {" "}
                        <DocumentCheck
                          text="Club proposal or concept document"
                          uploaded={documents.some(
                            (doc) => doc.type === "Club proposal"
                          )}
                        />{" "}
                        <DocumentCheck
                          text="College / institution proof"
                          uploaded={documents.some(
                            (doc) => doc.type === "College / Institution proof"
                          )}
                        />{" "}
                        <DocumentCheck
                          text="Authorization letter, if applicable"
                          uploaded={documents.some(
                            (doc) => doc.type === "Authorization letter"
                          )}
                        />{" "}
                        <DocumentCheck
                          text="Organizer identification"
                          uploaded={documents.some(
                            (doc) => doc.type === "Organizer ID proof"
                          )}
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Confirmation */}{" "}
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                    {" "}
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-violet-600"
                    />{" "}
                    <span className="text-xs leading-5 text-zinc-500">
                      {" "}
                      I confirm that the information provided in this
                      application is accurate and that I have permission to
                      submit the uploaded documents for verification.{" "}
                    </span>{" "}
                  </label>{" "}
                  {error && <ErrorMessage message={error} />}{" "}
                  <div className="flex justify-between">
                    {" "}
                    <BackButton onClick={previousStep}>
                      {" "}
                      <ArrowLeft className="h-4 w-4" /> Back{" "}
                    </BackButton>{" "}
                    <button
                      type="submit"
                      className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
                    >
                      {" "}
                      Submit application <ArrowRight className="h-4 w-4" />{" "}
                    </button>{" "}
                  </div>{" "}
                </div>
              )}{" "}
              {/* Error for step 1/2 */}{" "}
              {error && step !== 3 && (
                <div className="mt-5">
                  {" "}
                  <ErrorMessage message={error} />{" "}
                </div>
              )}{" "}
            </div>{" "}
            {/* Sidebar */}{" "}
            <aside className="hidden lg:block">
              {" "}
              <div className="sticky top-24 space-y-4">
                {" "}
                <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-5">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />{" "}
                    <p className="text-sm font-medium"> What happens next? </p>{" "}
                  </div>{" "}
                  <div className="mt-5 space-y-5">
                    {" "}
                    <TimelineItem
                      number="01"
                      title="Submit application"
                      description="Tell us about your club and upload supporting information."
                      active={step >= 1}
                    />{" "}
                    <TimelineItem
                      number="02"
                      title="Application review"
                      description="Our team reviews the information and documents."
                      active={step >= 2}
                    />{" "}
                    <TimelineItem
                      number="03"
                      title="Club approval"
                      description="Once approved, your club space becomes available."
                      active={step >= 3}
                    />{" "}
                    <TimelineItem
                      number="04"
                      title="Start building"
                      description="Customize your space and start creating events."
                      active={false}
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-violet-500/10 bg-violet-500/[0.03] p-5">
                  {" "}
                  <p className="text-sm font-medium"> Need help? </p>{" "}
                  <p className="mt-2 text-xs leading-5 text-zinc-600">
                    {" "}
                    If you have questions about starting a club, contact the
                    Evento team.{" "}
                  </p>{" "}
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-violet-400"
                  >
                    {" "}
                    Contact support <ArrowRight className="h-3 w-3" />{" "}
                  </Link>{" "}
                </div>{" "}
              </div>{" "}
            </aside>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
    </main>
  );
}
/* -------------------------------------------------------------------------- */ /* COMPONENTS */ /* -------------------------------------------------------------------------- */ function Step({
  number,
  label,
  active,
  completed,
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {" "}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          completed
            ? "bg-violet-600 text-white"
            : active
            ? "bg-violet-600 text-white"
            : "border border-zinc-800 bg-zinc-950 text-zinc-600"
        }`}
      >
        {" "}
        {completed ? <Check className="h-3.5 w-3.5" /> : number}{" "}
      </div>{" "}
      <span
        className={`hidden text-xs sm:block ${
          active ? "font-medium text-white" : "text-zinc-600"
        }`}
      >
        {" "}
        {label}{" "}
      </span>{" "}
    </div>
  );
}
function FormSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      {" "}
      <h2 className="text-xl font-semibold"> {title} </h2>{" "}
      <p className="mt-1.5 text-sm text-zinc-600"> {description} </p>{" "}
    </div>
  );
}
function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      {" "}
      <label className="mb-2 block text-sm font-medium text-zinc-300">
        {" "}
        {label} {required && <span className="ml-1 text-violet-400"> * </span>}{" "}
      </label>{" "}
      <div className="relative">
        {" "}
        {icon && (
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
            {" "}
            {icon}{" "}
          </div>
        )}{" "}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 pr-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-violet-500 ${
            icon ? "pl-10" : "pl-4"
          }`}
        />{" "}
      </div>{" "}
    </div>
  );
}
function SocialInput({
  icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      {" "}
      <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
        {" "}
        {icon}{" "}
      </div>{" "}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950 pl-10 pr-4 text-sm outline-none placeholder:text-zinc-700 focus:border-violet-500"
      />{" "}
    </div>
  );
}
function NextButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
    >
      {" "}
      {children}{" "}
    </button>
  );
}
function BackButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
    >
      {" "}
      {children}{" "}
    </button>
  );
}
function DocumentCheck({
  text,
  uploaded,
}: {
  text: string;
  uploaded: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {" "}
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          uploaded
            ? "bg-emerald-500/10 text-emerald-400"
            : "border border-zinc-800"
        }`}
      >
        {" "}
        {uploaded && <Check className="h-3 w-3" />}{" "}
      </div>{" "}
      <span
        className={`text-xs ${uploaded ? "text-zinc-300" : "text-zinc-600"}`}
      >
        {" "}
        {text}{" "}
      </span>{" "}
    </div>
  );
}
function TimelineItem({
  number,
  title,
  description,
  active,
}: {
  number: string;
  title: string;
  description: string;
  active: boolean;
}) {
  return (
    <div className="flex gap-3">
      {" "}
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold ${
          active
            ? "bg-violet-500/10 text-violet-400"
            : "bg-zinc-900 text-zinc-700"
        }`}
      >
        {" "}
        {number}{" "}
      </div>{" "}
      <div>
        {" "}
        <p
          className={`text-xs font-medium ${
            active ? "text-zinc-200" : "text-zinc-600"
          }`}
        >
          {" "}
          {title}{" "}
        </p>{" "}
        <p className="mt-1 text-[10px] leading-4 text-zinc-700">
          {" "}
          {description}{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-3 text-xs text-red-400">
      {" "}
      {message}{" "}
    </div>
  );
}
function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
/* -------------------------------------------------------------------------- */ /* SUCCESS */ /* -------------------------------------------------------------------------- */ function ApplicationSubmitted({
  clubName,
}: {
  clubName: string;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08080b] px-5 text-white">
      {" "}
      <div className="w-full max-w-lg text-center">
        {" "}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
          {" "}
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />{" "}
        </div>{" "}
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          {" "}
          Application submitted{" "}
        </p>{" "}
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {" "}
          Your club application is in review.{" "}
        </h1>{" "}
        <p className="mt-5 text-sm leading-7 text-zinc-500">
          {" "}
          Thanks for applying to start{" "}
          <span className="font-medium text-zinc-300"> {clubName} </span> on
          Evento. Our team will review your application and supporting
          documents.{" "}
        </p>{" "}
        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-900/40 p-5 text-left">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <FileCheck2 className="h-5 w-5 text-violet-400" />{" "}
            <div>
              {" "}
              <p className="text-sm font-medium"> Application received </p>{" "}
              <p className="mt-1 text-xs text-zinc-600">
                {" "}
                You can track the application from your profile.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-5 flex items-center gap-3">
            {" "}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10 text-xs font-bold text-violet-400">
              {" "}
              1{" "}
            </div>{" "}
            <div className="h-px flex-1 bg-zinc-800" />{" "}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-zinc-700">
              {" "}
              2{" "}
            </div>{" "}
            <div className="h-px flex-1 bg-zinc-800" />{" "}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-zinc-700">
              {" "}
              3{" "}
            </div>{" "}
          </div>{" "}
          <div className="mt-3 flex justify-between text-[10px] text-zinc-600">
            {" "}
            <span>Submitted</span> <span>Review</span> <span>Approved</span>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-8 flex justify-center gap-3">
          {" "}
          <Link
            href="/profile"
            className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            {" "}
            View application{" "}
          </Link>{" "}
          <Link
            href="/"
            className="rounded-xl border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white"
          >
            {" "}
            Go home{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </main>
  );
}
