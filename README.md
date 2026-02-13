# Chef Web App (Static Single-File)

تطبيق ويب للشيف عبدالرزاق (واجهة عامة + لوحة إدارة) مبني بملف واحد `index.html` ويعمل مباشرة بدون Build.

## التشغيل السريع (يشغل فورًا)

### الخيار 1: فتح مباشر
- افتح `index.html` مباشرة في المتصفح.

### الخيار 2: سيرفر محلي (أفضل)
```bash
./run.sh
```
ثم افتح:
- http://localhost:4173

## حل مشكلة الصورة (وش المشكلة؟)
إذا ظهر في GitHub:
- **"هذا الفرع لديه نزاعات يجب حلها"**
- أو **"لم يتم نشر هذا الفرع"**

فالمشكلة غالبًا واحدة من التالي:
1. الفرع المحلي ما تم رفعه (`push`) إلى GitHub.
2. فرع الـ PR متأخر عن الفرع الأساسي، وصار تعارض على `index.html`.

الحل المقترح:
```bash
git fetch origin
git checkout <your-branch>
git rebase origin/main   # أو: git merge origin/main
# حل التعارضات في index.html ثم:
git add index.html
git rebase --continue    # إذا كنت تستخدم rebase
git push --force-with-lease   # مع rebase
# أو git push عادي إذا استخدمت merge
```

> إذا ما تبي force push، استخدم `merge` بدل `rebase`.

## سحب آخر تحديثات من Git

> غيّر `main` إلى اسم الفرع الصحيح إذا كان مختلف.

```bash
git pull origin main
```

ثم شغّل مباشرة:
```bash
./run.sh
```

## بيانات الدخول الافتراضية للإدارة
- الإيميل: `abdehanine123@gmail.com`
- الباسورد: `123456`

## ملاحظات
- جميع البيانات تحفظ محليًا داخل `localStorage` (الخدمات، المعرض، الصورة، سجل الشات، الإعدادات).
- إذا فتحت من جهاز/متصفح آخر، يلزمك إعادة إدخال البيانات أو نقل التخزين يدويًا.
