import React from 'react'
import EditAndCreateArticle from './EditAndCreateArticle'

export default function EditOneArticleAdmin() {
  return (
    <EditAndCreateArticle
          title="تعديل المقال"
          initialData={{ titleAr: "كيفية كتابة خطة عمل",
            titleEn : 'How to Write a Business Plan',
            descriptionAr : 'تعرف على كيفية كتابة خطة عمل ناجحة لمشروعك الناشئ أو شركتك الصغيرة.',
            descriptionEn : 'Learn how to write a winning business plan for your startup or small company.',
            contantAr : '<p>التسويق الإلكتروني لم يعد رفاهية، بل أصبح ضرورة لأي نشاط تجاري. فهو يتيح لك الوصول إلى جمهور أوسع، واستهداف شرائح دقيقة من العملاء، وتحليل النتائج لحظيًا.</p><p><strong>أبرز الفوائد:</strong></p><ul><li>خفض تكاليف التسويق مقارنة بالإعلانات التقليدية.</li><li>سهولة قياس النتائج وتحسين الحملات بناءً على البيانات.</li><li>التواصل المباشر مع العملاء عبر وسائل التواصل الاجتماعي.</li><li>زيادة المبيعات من خلال الإعلانات الموجهة والبيع عبر الإنترنت.</li></ul><p>ببساطة، التسويق الرقمي هو الطريق الأسرع لنمو علامتك التجارية في عالم تنافسي سريع التغير.</p>',
            contantEn : '<p>Digital marketing is no longer a luxury — it’s a necessity for any business. It allows you to reach a wider audience, target specific customer segments, and analyze performance in real time.</p><p><strong>Main Advantages:</strong></p><ul><li>Lower marketing costs compared to traditional advertising.</li><li>Easy performance tracking and optimization through data.</li><li>Direct communication with customers via social media.</li><li>Higher sales through targeted advertising and e-commerce.</li></ul><p>Simply put, digital marketing is the fastest way to grow your brand in a highly competitive world.</p>',
            mainImg : 'https://res.cloudinary.com/djjron2p6/image/upload/v1751298756/eb6mycoxcap3ua76pube.png',
            contantImg : 'https://res.cloudinary.com/djjron2p6/image/upload/v1751298756/eb6mycoxcap3ua76pube.png'
           }}
        />
  )
}
