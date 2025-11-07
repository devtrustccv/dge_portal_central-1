import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import "dayjs/locale/pt"; 
dayjs.locale("pt"); 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function youtubeToEmbedUrl(youtubeUrl: string): string {
  const url = new URL(youtubeUrl);

  if (url.hostname === "www.youtube.com" && url.pathname.startsWith("/embed")) {
    return youtubeUrl;
  }

  if (url.hostname === "www.youtube.com" && url.pathname === "/watch") {
    const videoId = url.searchParams.get("v");
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  console.log("Invalid YouTube URL");
  return "#";
}

export function getImageSrc(index: number) {
  if (index % 2 === 0) return "/personalizedExperience/imgLayer2_fundo.svg";
  if (index % 3 === 0) return "/personalizedExperience/imgLayer3_fundo.svg";
  return "/personalizedExperience/imgLayer1_fundo.svg";
}

export const getFingerprint = async () => {
  const navigatorInfo = window?.navigator || "";
  const screenInfo = window?.screen || "";

  const getWebGLRenderer = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return "WebGL not supported";

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    return debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : "Unknown";
  };

  const getCanvasFingerprint = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return "Canvas not supported";
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("Fingerprint", 10, 10);
    return canvas.toDataURL();
  };

  const getPlugins = () => {
    return navigator.plugins
      ? Array.from(navigator.plugins)
        .map((p) => p.name)
        .join(", ")
      : "No plugins";
  };

  const data = {
    userAgent: navigatorInfo.userAgent,
    language: navigatorInfo.language,
    languages: navigatorInfo.languages,
    platform: navigatorInfo.platform,
    hardwareConcurrency: navigatorInfo.hardwareConcurrency || "Unknown",
    screenWidth: screenInfo.width,
    screenHeight: screenInfo.height,
    colorDepth: screenInfo.colorDepth,
    pixelRatio: window.devicePixelRatio,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    webglRenderer: getWebGLRenderer(),
    canvasFingerprint: getCanvasFingerprint(),
    plugins: getPlugins(),
    maxTouchPoints: navigatorInfo.maxTouchPoints,
    storageEstimate: await navigator.storage.estimate(),
  };

  return JSON.stringify(data);
};

export function calculateAge(dateString: string): number | string {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(dateString)) {
    return "--";
  }

  const birthDate = new Date(dateString);

  if (isNaN(birthDate.getTime())) {
    return "--";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age--;
  }

  return age;
}

export function buildQueryString(params: Record<string, any>): string {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
}

export function getDomainLabel<T extends { label: string; value: string }>(
  list: T[],
  value: string
): string | undefined {
  return list.find(item => item.value === value)?.label;
}


export function formatDate(
  date: string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string {
  if (!date) return "";

  const parsedDate = dayjs(date);

  if (!parsedDate.isValid()) return "";

  return parsedDate.toDate().toLocaleDateString("pt-PT", options);
}


export function isInternalUrl(url: string): boolean {
  if (typeof window !== 'undefined') {
    // Browser environment
    const baseOrigin = window.location.origin;
    try {
      const parsedUrl = new URL(url, baseOrigin);
      return parsedUrl.origin === baseOrigin;
    } catch {
      return false; // Invalid URL
    }
  } else {
    // Server environment - assume external (no access to window)
    return !/^https?:\/\//.test(url);
  }
}