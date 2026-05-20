import { useState } from "react";
import "./Survey.css";

const QUESTIONS = [
  {
    id: 1,
    text: "Сіз TikTok қолданасыз ба?",
    type: "radio",
    options: ["Иә", "Жоқ", "Кейде қолданамын"],
  },
  {
    id: 2,
    text: "Күніне TikTok-ті қанша сағат қолданасыз?",
    type: "radio",
    options: ["1 сағаттан аз", "1–2 сағат", "2–4 сағат", "4 сағаттан көп"],
  },
  {
    id: 3,
    text: "TikTok-те қандай контент көресіз? (Бірнеше жауап таңдауға болады)",
    type: "checkbox",
    options: [
      "Күлкі / Ойын-сауық",
      "Білім / Ақпарат",
      "Музыка / Би",
      "Тамақ дайындау",
      "Сұлулық / Мода",
      "Спорт",
      "Жаңалықтар / Қоғамдық мәселелер",
    ],
  },
  {
    id: 4,
    text: "Сіз TikTok-ке өз видеоларыңызды жүктейсіз бе?",
    type: "radio",
    options: ["Иә, жиі жүктеймін", "Иә, кейде жүктеймін", "Жоқ, тек қараймын"],
  },
  {
    id: 5,
    text: "TikTok сіздің күнделікті өміріңізге қаншалықты әсер етеді?",
    type: "radio",
    options: [
      "Өте көп әсер етеді",
      "Орташа әсер етеді",
      "Аздап әсер етеді",
      "Мүлдем әсер етпейді",
    ],
  },
  {
    id: 6,
    text: "Сіз TikTok-тегі блогерлерді немесе авторларды бақылайсыз ба?",
    type: "radio",
    options: ["Иә, көп авторды бақылаймын", "Иә, аз ғана бақылаймын", "Жоқ"],
  },
  {
    id: 7,
    text: "TikTok сіздің жас тобыңызға қаншалықты сәйкес деп санайсыз?",
    type: "radio",
    options: [
      "Толығымен сәйкес",
      "Негізінен сәйкес",
      "Ішінара сәйкес",
      "Сәйкес емес",
    ],
  },
  {
    id: 8,
    text: "Сіз TikTok-ті достарыңызға ұсынасыз ба?",
    type: "radio",
    options: ["Иә, жиі ұсынамын", "Кейде ұсынамын", "Жоқ, ұсынбаймын"],
  },
  {
    id: 9,
    text: "Қайырымдылық мақсатында TikTok-те лайк басуға дайынсыз ба?",
    type: "radio",
    options: [
      "Иә, міндетті түрде қатысамын",
      "Мүмкін, ойланып көремін",
      "Жоқ, қызығушылығым жоқ",
    ],
  },
  {
    id: 10,
    text: "Қайырымдылық акцияларын әлеуметтік желіде қолдайсыз ба?",
    type: "radio",
    options: ["Иә, жиі қолдаймын", "Кейде қолдаймын", "Жоқ, қолданбаймын"],
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
          <h2>Рахмет!</h2>
          <p>Сіздің жауаптарыңыз сәтті қабылданды.</p>
          <p className="survey-redirect-note">Бағытталуда...</p>
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
          <h1 className="survey-title">TikTok Пайдаланушылар Сауалнамасы</h1>
          <p className="survey-desc">
            Сәлеметсіз бе! Бұл сауалнама TikTok платформасының пайдаланушылары
            арасында жүргізілген зерттеу болып табылады. Сіздің берген
            жауаптарыңыз толығымен құпия сақталады және тек зерттеу мақсатында
            ғана пайдаланылады. Шынайы жауап беріңіз. Рахмет!
          </p>
          <p className="survey-required-note">
            <span className="survey-star">*</span> Міндетті сұрақ
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
                Бұл сұраққа міндетті түрде жауап беріңіз
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
            Жіберу
          </button>
        </div>
      </form>

      <div className="survey-branding">
        <span>Google Forms</span>
      </div>
    </div>
  );
}
