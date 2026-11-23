import { Tool } from '../types';

export const TOOLS: Tool[] = [
  {
    id: 'word-hunt',
    slug: 'word-hunt',
    name: 'Săn cụm động từ - Word Hunt',
    description: 'Trò chơi tìm 20 cụm động từ (Phrasal Verbs) ẩn trong dải chữ uốn lượn theo giáo án của Ms Alice (Lương Tâm).',
    icon: 'Gamepad2',
    category: 'Tư duy và học tập',
    type: 'external',
    url: 'https://dhhd.ndh.io.vn/word-hunt.html',
    order: 1,
    featured: true
  },
  {
    id: '1',
    slug: 'pomodoro-focus',
    name: 'Đồng hồ Pomodoro Focus',
    description: 'Bộ đếm thời gian tập trung 25/5 phút chuẩn Pomodoro kèm âm thanh báo hiệu, theo dõi chu kỳ học tập và nhiệm vụ mục tiêu.',
    icon: 'Timer',
    category: 'Năng suất',
    type: 'internal',
    url: '/tool/pomodoro-focus',
    order: 2,
    featured: true
  },
  {
    id: '2',
    slug: 'word-counter',
    name: 'Đếm từ và phân tích văn bản',
    description: 'Công cụ đếm số từ, ký tự, câu, đoạn văn, tính thời gian đọc ước tính và chuyển đổi chữ hoa/thường tức thì ngay trên trình duyệt.',
    icon: 'FileText',
    category: 'Soạn thảo',
    type: 'internal',
    url: '/tool/word-counter',
    order: 3,
    featured: true
  },
  {
    id: '3',
    slug: 'excalidraw-mindmap',
    name: 'Bảng vẽ sơ đồ tư duy Excalidraw',
    description: 'Bảng vẽ phác thảo ý tưởng, vẽ kiến trúc hệ thống và sơ đồ tư duy trực quan không giới hạn không gian làm việc.',
    icon: 'PenTool',
    category: 'Tư duy và học tập',
    type: 'embed',
    url: 'https://excalidraw.com',
    order: 4,
    featured: false,
    embedNotice: 'Công cụ được nhúng trực tiếp qua giao thức an toàn. Bạn có thể mở rộng toàn màn hình để vẽ thoải mái hơn.'
  },
  {
    id: '4',
    slug: 'desmos-graphing',
    name: 'Máy tính khoa học và đồ thị Desmos',
    description: 'Vẽ đồ thị hàm số 2D trực quan, giải phương trình và thực hiện các phép tính toán đại số nâng cao chuẩn mực giáo dục.',
    icon: 'Calculator',
    category: 'Toán học và khoa học',
    type: 'embed',
    url: 'https://www.desmos.com/calculator?embed',
    order: 5,
    featured: false,
    embedNotice: 'Hỗ trợ tính toán và hiển thị đồ thị tương tác thời gian thực từ nền tảng Desmos.'
  },
  {
    id: '5',
    slug: 'devdocs-reference',
    name: 'Tra cứu tài liệu web và lập trình MDN',
    description: 'Kho tri thức toàn diện về HTML, CSS, JavaScript, Web APIs và các chuẩn công nghệ mở được cập nhật liên tục.',
    icon: 'BookOpen',
    category: 'Tra cứu',
    type: 'external',
    url: 'https://developer.mozilla.org/vi/',
    order: 6,
    featured: false
  }
];

export const TOOL_CATEGORIES = [
  'Tất cả',
  'Tư duy và học tập',
  'Năng suất',
  'Soạn thảo',
  'Toán học và khoa học',
  'Tra cứu'
];
