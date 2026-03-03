export interface SocialMetric {
  icon: string;      // Unicode char: '▲', '◉', '↗', '👍', '💬', '▶', etc.
  value: number;     // Auto-formatted: 12400 → "12.4K"
  label: string;     // Accessibility: 'upvotes', 'views', 'shares', etc.
}

export interface ProjectSocial {
  platform: string;           // 'reddit' | 'linkedin' | 'youtube' | 'twitter' | 'producthunt'
  url: string;                // Link to the post (opens in new tab)
  metrics: SocialMetric[];    // Flexible stats array
}

export interface ShowcaseProject {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  insight: string;
  insightHighlight: string;
  tags: { label: string; color: 'yellow' | 'cyan' | 'purple' }[];
  videoSrc: string;
  social?: ProjectSocial;     // Optional — one platform per project
  githubLink: string;
}

export interface CompletedGig {
  num: string;
  name: string;
  description: string;
  tech: string[];
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    index: '// PROJECT_01',
    title: 'GHOST SIGHT',
    subtitle: 'Detects Intrusions. Flags Anomalies. Keeps the Perimeter Safe.',
    description:
      'Custom-trained Vision pipeline for detecting unauthorized zone entry across live camera feeds. Fine-tuned on domain-specific intrusion datasets to handle occlusion, low-light conditions, and multi-person scenes — achieving production-ready accuracy without a full dataset retraining cycle.',
    insight:
      'fine-tuned for every targeted intrusion scenario like night-time, low-light, multi-person, achieving high-precision zone breach detection with minimal false positives — outperforming generic object detectors in restricted-area surveillance scenarios.',
    insightHighlight: 'Domain-specific CV fine-tuning pipeline',
    tags: [
      { label: 'YOLO', color: 'yellow' },
      { label: 'RTDETR', color: 'cyan' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'SAM3', color: 'cyan' },
      { label: 'Python', color: 'cyan' },
      { label: 'Custom Dataset', color: 'purple' },
      { label: 'Fine-Tuning', color: 'yellow' },
      { label: 'PyTorch', color: 'yellow' },
    ],
    videoSrc: '/videos/intrusion_detection_compressed.mp4',
    social: {
      platform: 'youtube',
      url: 'https://youtu.be/kwQeokYDVcE?si=K5J-aZQqUHS2Qk0V',
      metrics: [
        { icon: '\u25B2', value: 2000, label: 'views' },
        { icon: '\u25C9', value: 60, label: 'likes' },
        // { icon: '\u2197', value: 0, label: 'comments' },
      ],
    },
    githubLink: 'https://github.com/Labellerr/Hands-On-Learning-in-Computer-Vision/blob/main/fine-tune%20YOLO%20for%20various%20use%20cases/Intrusion_detection_using_YOLO.ipynb',
  },
  {
    index: '// PROJECT_02',
    title: 'FLAW SCAN',
    subtitle: 'Scans Every Unit. Flags Every Flaw. Zero Defects Ship.',
    description:
      'Vision pipeline deployed on a bottle manufacturing line to verify cap attachment and label alignment in real time. Draws a custom Quality Inspection Zone per camera feed, then runs spatial IoU checks to make instant pass/fail calls on every unit — no human in the loop required.',
    insight:
      'combined RTDETR instance segmentation with geometric IoU verification inside a user-defined inspection zone — turning a general-purpose model into a precision QC system that catches misaligned caps and missing labels before they leave the line.',
    insightHighlight: 'Segmentation + spatial IoU for pass/fail QC',
    tags: [
      { label: 'RTDETR', color: 'yellow' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'PyTorch', color: 'yellow' },
      { label: 'Python', color: 'cyan' },
    ],
    videoSrc: '/videos/assembly_line_quality_inspection_compressed.mp4',
    social: {
      platform: 'reddit',
      url: 'https://www.reddit.com/r/computervision/comments/1q27p8e/real_time_assembly_line_quality_inspection_using/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
      metrics: [
        { icon: '\u25C9', value: 45000, label: 'views' },
        { icon: '\u25B2', value: 400, label: 'upvotes' },
        { icon: '\u2197', value: 260, label: 'shares' },
      ],
    },
    githubLink:
      'https://github.com/Labellerr/Hands-On-Learning-in-Computer-Vision/blob/main/fine-tune%20YOLO%20for%20various%20use%20cases/assembly_line_inspection.ipynb',
  },
  {
    index: '// PROJECT_03',
    title: 'PARKING LOT VISION',
    subtitle: 'Knows Every Parking Spot. Occupied or Empty. In Real Time.',
    description:
      'Computer vision system that monitors parking lots from overhead camera feeds, classifying every individual space as occupied or vacant in real time. Processes the full lot in a single pass — giving drivers, operators, and smart city systems live availability without sensors or manual checks.',
    insight:
      'trained on a custom parking dataset with COCO-to-YOLO conversion pipeline, achieving reliable slot-level occupancy classification across varying lighting, vehicle sizes, and lot layouts — no per-lot recalibration needed.',
    insightHighlight: 'Per-slot occupancy classification at lot scale',
    tags: [
      { label: 'RTDETRv2', color: 'yellow' },
      { label: 'PyTorch', color: 'yellow' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'Python', color: 'cyan' },
      { label: 'Real-Time Inference', color: 'purple' },
    ],
    videoSrc: '/videos/parking lot_compressed.mp4',
    social: {
      platform: 'reddit',
      url: 'https://www.reddit.com/r/computervision/comments/1p8u9mw/real_time_vehicle_and_parking_occupancy_detection/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
      metrics: [
        { icon: '\u25C9', value: 127000, label: 'views' },
        { icon: '\u25B2', value: 750, label: 'upvotes' },
        { icon: '\u2197', value: 340, label: 'shares' },
      ],
    },
    githubLink:
      'https://github.com/Labellerr/Hands-On-Learning-in-Computer-Vision/blob/main/fine-tune%20YOLO%20for%20various%20use%20cases/Fine-Tune-YOLO-for-Parking-Space-Monitoring.ipynb',
  },
  {
    index: '// PROJECT_04',
    title: 'PILL COUNT',
    subtitle: 'Detects Every Tablet. Counts the Pile. Flags What\'s Off.',
    description:
      'Vision pipeline built for pharmaceutical packaging lines that detects, segments, and counts individual pills in real time — including overlapping and partially visible tablets. Goes beyond simple counting to flag broken, chipped, discolored, or contaminated units before they leave the line.',
    insight:
      'used YOLOv12-seg instance segmentation with a COCO-to-YOLO conversion pipeline to handle overlapping pills accurately — turning a traditionally error-prone manual count into a zero-miss automated QC checkpoint at line speed.',
    insightHighlight: 'YOLOv12 segmentation for overlap-tolerant pill counting',
    tags: [
      { label: 'YOLOv12', color: 'yellow' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'PyTorch', color: 'yellow' },
      { label: 'Real-Time QC', color: 'purple' },
      { label: 'Python', color: 'cyan' },
    ],
    videoSrc: '/videos/counted_pills_full_compressed.mp4',
    social: {
      platform: 'reddit',
      url: 'https://www.reddit.com/r/computervision/comments/1opsts3/automating_pill_counting_using_a_finetuned/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
      metrics: [
        { icon: '\u25C9', value: 60000, label: 'views' },
        { icon: '\u25B2', value: 450, label: 'upvotes' },
        { icon: '\u2197', value: 190, label: 'shares' },
      ],
    },
    githubLink:
      'https://github.com/Labellerr/Hands-On-Learning-in-Computer-Vision/blob/main/fine-tune%20YOLO%20for%20various%20use%20cases/Pill_Counting_Using_YOLOv12.ipynb',
  },
  {
    index: '// PROJECT_05',
    title: 'ZONE AWARE',
    subtitle: 'Spatial Awareness at Camera Level. No Sensor Required.',
    description:
      'Computer vision system that defines custom virtual perimeters on any camera feed and triggers instant alerts the moment a person or object crosses into a restricted zone. Goes beyond motion detection — understands object context, trajectory, and zone interaction to eliminate false positives from shadows, lighting shifts, or irrelevant movement.',
    insight:
      'built a polygon-based virtual zone engine on top of YOLO detection — combining bounding box centroids with custom boundary logic to distinguish a genuine perimeter breach from ambient scene noise with near-zero false trigger rate.',
    insightHighlight: 'Polygon zone engine with centroid boundary logic',
    tags: [
      { label: 'YOLOv8', color: 'yellow' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'PyTorch', color: 'yellow' },
      { label: 'Real-Time Alerts', color: 'purple' },
      { label: 'Python', color: 'cyan' },
    ],
    videoSrc: '/videos/perimeter_sensing_compressed.mp4',
    social: {
      platform: 'reddit',
      url: 'https://www.reddit.com/r/computervision/comments/1pqf803/perimeter_sensing_and_interaction_detection_using/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
      metrics: [
        { icon: '\u25C9', value: 86000, label: 'views' },
        { icon: '\u25B2', value: 130, label: 'upvotes' },
        { icon: '\u2197', value: 50, label: 'shares' },
      ],
    },
    githubLink:
      'https://github.com/Labellerr/Hands-On-Learning-in-Computer-Vision/blob/main/fine-tune%20YOLO%20for%20various%20use%20cases/perimeter_sensing_using_yolo.ipynb',
  },
  {
    index: '// PROJECT_06',
    title: 'TRAFFIC FLOW STATE',
    subtitle: 'Reads the Road. Counts Every Vehicle. Maps the Flow.',
    description:
      'Vision pipeline that monitors live road footage to detect, classify, and count vehicles in real time — tracking flow direction, volume per lane, and congestion buildup across an entire intersection or highway segment. Turns raw camera feeds into structured traffic intelligence without any roadside sensors or infrastructure changes.',
    insight:
      'combined Computer Vision in vehicle detection with a virtual tripwire counting layer and per-class vehicle tracking — logging directional flow counts for cars, trucks, buses, and bikes independently, producing per-lane throughput data usable directly by traffic management systems.',
    insightHighlight: 'Per-class directional counting',
    tags: [
      { label: 'YOLO', color: 'yellow' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'PyTorch', color: 'yellow' },
      { label: 'Object Tracking', color: 'yellow' },
      { label: 'Real-Time Inference', color: 'yellow' },
      { label: 'Python', color: 'cyan' },
    ],
    videoSrc: '/videos/traffic management_compressed.mp4',
    social: {
      platform: 'reddit',
      url: 'https://www.reddit.com/r/computervision/comments/1ojx3tr/realtime_vehicle_flow_counting_using_a_single/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
      metrics: [
        { icon: '\u25C9', value: 31000, label: 'views' },
        { icon: '\u25B2', value: 200, label: 'upvotes' },
        { icon: '\u2197', value: 90, label: 'shares' },
      ],
    },
    githubLink:
      'https://github.com/Labellerr/Hands-On-Learning-in-Computer-Vision/blob/main/fine-tune%20YOLO%20for%20various%20use%20cases/Fine-Tune-YOLO-for-Traffic-Flow-Counting.ipynb',
  },
  {
    index: '// PROJECT_07',
    title: 'CONVEYOR VISION',
    subtitle: 'Every Items on the Belt. Detected, Classified & Counted.',
    description:
      'Vision pipeline mounted above a produce conveyor that detects and counts individual items in real time as they move through the line — classifying by type, and maintaining a live tally per SKU. Replaces manual counting entirely with a camera-only solution that keeps pace with the belt at full production speed.',
    insight:
      'built a moving-object instance counter on top of Object Detection — using centroid tracking with a virtual counting line to handle overlapping and fast-moving items accurately, producing per-class counts without double-counting items that briefly overlap or cluster on the belt.',
    insightHighlight: 'Centroid tracking with virtual line counting for moving items',
    tags: [
      { label: 'RTDETRv2', color: 'yellow' },
      { label: 'OpenCV', color: 'purple' },
      { label: 'PyTorch', color: 'yellow' },
      { label: 'Real-Time Inference', color: 'cyan' },
      { label: 'Python', color: 'cyan' },
    ],
    videoSrc: '/videos/fruits_counting_on_conveyor_belt_compressed.mp4',
    social: {
      platform: 'reddit',
      url: 'https://www.reddit.com/r/computervision/comments/1q85vdq/real_time_fruit_counting_on_a_conveyor_belt_fine/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button',
      metrics: [
        { icon: '\u25C9', value: 42000, label: 'views' },
        { icon: '\u25B2', value: 450, label: 'upvotes' },
        { icon: '\u2197', value: 220, label: 'shares' },
      ],
    },
    githubLink:
      'https://github.com/Labellerr/Hands-On-Learning-in-Computer-Vision/blob/main/fine-tune%20YOLO%20for%20various%20use%20cases/fruits_counting_on_conveyor.ipynb',
  }
];

export const COMPLETED_GIGS: CompletedGig[] = [
  {
    num: '01',
    name: 'NEUROMANCER-7',
    description:
      'Autonomous LLM agent system for corporate espionage detection \u2014 340M parameter custom architecture, 99.2% accuracy',
    tech: ['PyTorch', 'LangChain', 'CUDA'],
  },
  {
    num: '02',
    name: 'GHOST SIGHT',
    description:
      'Real-time person re-identification system across 4,000+ surveillance nodes. Runs on edge hardware at 60fps',
    tech: ['YOLO v9', 'TensorRT', 'OpenCV'],
  },
  {
    num: '03',
    name: 'CORPUS CHROMI',
    description:
      'Multimodal generative AI platform producing synthetic training data \u2014 saved 60% annotation costs for 3 corps',
    tech: ['Diffusion', 'CLIP', 'VAE'],
  },
  {
    num: '04',
    name: 'NETWATCH SHIELD',
    description:
      'LLM-powered threat intelligence system processing 2TB/day of dark net data, alerting on zero-day exploits',
    tech: ['RAG', 'Elasticsearch', 'Kafka'],
  },
  {
    num: '05',
    name: 'BRAINDANCE CODEC',
    description:
      'Neural signal compression and classification model for BD editing suites. Reduced file size by 89% with zero quality loss',
    tech: ['Time-series ML', 'Signal Processing'],
  },
];
