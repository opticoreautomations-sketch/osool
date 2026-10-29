# دليل نشر المتجر على Render (Render.com Deployment Guide)

تم إعداد تطبيق متجر **أصول (OSOOL)** بالكامل ليكون جاهزاً للنشر الفوري والمجاني على منصة **Render**.

يمكنك اختيار إحدى الطريقتين التاليتين للنشر وفقاً لتفضيلك:

---

## الطريقة الأولى: النشر كخدمة ويب (Web Service) — الأسرع والأشمل [موصى به]

يحتوي المشروع على خادم `server.js` مجهز بـ Express ونقاط فحص الجاهزية (`/healthz`) ودعم التوجيه أحادي الصفحة (SPA):

1. سجّل الدخول إلى [Render Dashboard](https://dashboard.render.com).
2. اضغط على زر **New +** ثم اختر **Web Service**.
3. اربط حساب GitHub أو GitLab الخاص بك واختر مستودع هذا المشروع.
4. املأ الإعدادات التالية:
   - **Name**: `osool-luxury-watches` (أو أي اسم تفضله)
   - **Region**: `Frankfurt (EU Central)` (أقرب منطقة للشرق الأوسط والخليج)
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. اضغط على **Create Web Service**.
6. سيبدأ Render في بناء وتشغيل متجرك، وستحصل على رابط دائم مثل:  
   `https://osool-luxury-watches.onrender.com`

---

## الطريقة الثانية: النشر كموقع ثابت (Static Site) — مجاني وسريع جداً عبر شبكة CDN

إذا كنت تفضل استضافة الواجهة كـ Static Site:

1. من [Render Dashboard](https://dashboard.render.com)، اضغط على **New +** ثم اختر **Static Site**.
2. اربط مستودع المشروع.
3. اضغط على الإعدادات التالية:
   - **Name**: `osool-luxury-watches`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. في خانة **Redirects / Rewrites**:
   - اضغط **Add Rule**:
     - **Type**: `Rewrite`
     - **Source**: `/*`
     - **Destination**: `/index.html`
5. اضغط على **Create Static Site**.

---

## الطريقة الثالثة: استخدام ملف الإعداد التلقائي (Render Blueprint)

تم إنشاء ملف `render.yaml` مسبقاً في جذر المشروع:
1. من [Render Dashboard](https://dashboard.render.com)، اضغط **New +** $\rightarrow$ **Blueprint**.
2. حدد مستودع المشروع وسيقوم Render بقراءة `render.yaml` وضبط الأوامر والبيئة تلقائياً بضغطة زر واحدة.

---

### ملاحظات هامة:
- لا حاجة لضبط قواعد بيانات أو خوادم خارجية؛ بيانات المتجر وسلة المشتريات وسجل الطلبات وأكواد الخصم تعمل مباشرة على جانب العميل وتتوافق مع التخزين المحلي.
- جميع صور الساعات وأيقونات الهوية مرفوعة ومضمنة ضمن حزمة البناء (`dist`).
