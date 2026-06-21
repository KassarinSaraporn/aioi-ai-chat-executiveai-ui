# Executive AI UI

Frontend สำหรับระบบ **AIOI AI Executive Chat** ใช้ React TypeScript + Vite + Tailwind CSS

## ฟีเจอร์

- Login ด้วย `POST /api/auth/login`
- เก็บ JWT Token ใน `localStorage`
- ส่ง `Authorization: Bearer <token>` ทุก request ที่ต้องใช้สิทธิ์
- โหลดบทสนทนาล่าสุดจาก `GET /api/chat/sessions`
- โหลดข้อความในบทสนทนาจาก `GET /api/chat/sessions/{sessionId}/messages`
- ถาม AI ผ่าน `POST /api/ai-executive/ask`
- รองรับภาษา TH / EN
- Sidebar เหลือเฉพาะ Dashboard + บทสนทนาล่าสุด
- UI ตาม mockup ล่าสุด: KPI cards, chat panel, insight panel, language toggle

## ติดตั้ง

```bash
npm install
cp .env.example .env
npm run dev
```

เปิดเว็บ:

```txt
http://localhost:5173
```

## ตั้งค่า API

ไฟล์ `.env`

```env
VITE_API_URL=http://localhost:5148
```

## Backend ที่ต้องเปิดไว้

```txt
http://localhost:5148/swagger/index.html
```

API ที่ใช้:

```txt
POST /api/auth/login
GET  /api/chat/sessions
GET  /api/chat/sessions/{sessionId}/messages
POST /api/ai-executive/ask
```

## Login Demo

```txt
email: admin@aioi.local
password: admin123
```

## โครงสร้างโปรเจกต์

```txt
src/
├── components/
│   ├── auth/
│   │   └── LoginPage.tsx
│   ├── chat/
│   │   ├── ChatInput.tsx
│   │   ├── ChatWindow.tsx
│   │   ├── MessageBubble.tsx
│   │   └── PromptChips.tsx
│   ├── dashboard/
│   │   ├── HeroSection.tsx
│   │   ├── InsightPanel.tsx
│   │   └── KpiCards.tsx
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopBar.tsx
│   └── ui/
│       ├── LanguageToggle.tsx
│       └── StatusPill.tsx
├── data/
│   └── i18n.ts
├── services/
│   ├── authApi.ts
│   ├── chatApi.ts
│   ├── executiveAiApi.ts
│   └── httpClient.ts
├── types/
│   └── api.ts
├── utils/
│   └── format.ts
├── App.tsx
├── index.css
└── main.tsx
```

## หมายเหตุ

ถ้าเรียก API แล้วติด CORS ให้เช็กฝั่ง .NET ว่ามี:

```csharp
app.UseCors("AllowFrontend");
```

และต้องอยู่ก่อน:

```csharp
app.MapControllers();
```
# aioi-ai-chat-executiveai-ui
