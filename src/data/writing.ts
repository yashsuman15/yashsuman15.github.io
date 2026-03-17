// ── Writing & Content Data ──
// Videos and articles for the Writing section

export interface Video {
  title: string;
  url: string;
  videoId: string; // YouTube video ID for thumbnail
}

export interface Article {
  title: string;
  url: string;
  date: string;
  category: string;
}

export const WRITING_STATS = {
  articles: '25+',
  videos: '5+',
  domains: '6',
};

export const VIDEOS: Video[] = [
  {
    title: 'Alibaba Qwen 3.5 Review: Can Small AI Models Beat GPT 120B?',
    url: 'https://www.youtube.com/watch?v=Gt2KvGENLtE',
    videoId: 'Gt2KvGENLtE',
  },
  {
    title: 'Learn to Perform LLM Distillation Yourself',
    url: 'https://www.youtube.com/watch?v=D5qxlMKWh60',
    videoId: 'D5qxlMKWh60',
  },
  {
    title: "We Tested 5 Depth Estimation Models So You Don't Have To",
    url: 'https://www.youtube.com/watch?v=WQTadQi0MCg',
    videoId: 'WQTadQi0MCg',
  },
  {
    title: 'Depth Anything V2 + RT-DETR: Object Positioning in Tilted Cameras',
    url: 'https://www.youtube.com/watch?v=vmulffyYz8I',
    videoId: 'vmulffyYz8I',
  },
  {
    title: 'Which OCR Model Wins in 2025?',
    url: 'https://www.youtube.com/watch?v=E-rFPGv8k9Y',
    videoId: 'E-rFPGv8k9Y',
  },
];

export const ARTICLES: Article[] = [
  {
    title: 'Best Open-Source Model Comparison',
    url: 'https://www.labellerr.com/blog/best-open-source-model-comparison-requirements-2/',
    date: 'Jan 2026',
    category: 'Image Generation',
  },
  {
    title: 'Building AI-Powered Quality Inspection Pipeline',
    url: 'https://www.labellerr.com/blog/quality-inspection-using-ai/',
    date: 'Dec 2025',
    category: 'Manufacturing',
  },
  {
    title: 'Perimeter Sensing using YOLO',
    url: 'https://www.labellerr.com/blog/perimeter-sensing-using-yolo/',
    date: 'Dec 2025',
    category: 'Security',
  },
  {
    title: 'Power Grid Inspection using Computer Vision',
    url: 'https://www.labellerr.com/blog/power-grid-inspection-using-computer-vision/',
    date: 'Dec 2025',
    category: 'Infrastructure',
  },
  {
    title: "Google's Gemini 3: Explained",
    url: 'https://www.labellerr.com/blog/googles-gemini-3-explained/',
    date: 'Dec 2025',
    category: 'AI Models',
  },
  {
    title: 'Introducing Meta SAM 3 & SAM 3D',
    url: 'https://www.labellerr.com/blog/introducing-meta-sam-3-sam-3d/',
    date: 'Nov 2025',
    category: 'Segmentation',
  },
  {
    title: 'YOLO11 vs YOLOv8: Model Comparison',
    url: 'https://www.labellerr.com/blog/yolo11-vs-yolov8-model-comparison/',
    date: 'Nov 2025',
    category: 'Object Detection',
  },
  {
    title: 'SAM Fine-Tuning Using LoRA',
    url: 'https://www.labellerr.com/blog/sam-fine-tuning-using-lora/',
    date: 'Jul 2025',
    category: 'Fine-tuning',
  },
  {
    title: 'Track Objects Fast: BoT-SORT + YOLO',
    url: 'https://www.labellerr.com/blog/bot-sort-tracking/',
    date: 'Jul 2025',
    category: 'Object Tracking',
  },
  {
    title: 'Learn DeepSORT: Real-Time Tracking Guide',
    url: 'https://www.labellerr.com/blog/deepsort-real-time-object-tracking-guide/',
    date: 'Jun 2025',
    category: 'Object Tracking',
  },
  {
    title: 'How License Plate Recognition Works',
    url: 'https://www.labellerr.com/blog/how-car-license-plate-recognition-works/',
    date: 'Jan 2026',
    category: 'Surveillance',
  },
  {
    title: 'Building a Pill Counting System with YOLO',
    url: 'https://www.labellerr.com/blog/building-a-pill-counting-system-with-labellerr-and-yolo/',
    date: 'Oct 2025',
    category: 'Healthcare',
  },
];
