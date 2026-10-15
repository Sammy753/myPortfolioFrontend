import React from 'react'
import { useEffect, useState } from 'react'
import './Subcribe.css'

const SUBSCRIBE_API_URL = "https://myportfoliobackend-cuaw.onrender.com/api/subscribers";

function Subcribe() {

  const [subEmail, setSubEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [subMessage, setSubMessage] = useState("");

  async function handleSubscribe() {
    if (subStatus === "sending") return;

    const trimmed = subEmail.trim();

    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      setSubStatus("error");
      setSubMessage("Please enter a valid email address.");
      return;
    }

    setSubStatus("sending");
    setSubMessage("");

    try {
      const res = await fetch(SUBSCRIBE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
        signal: AbortSignal.timeout(60000), // Render free plan can be slow to wake up
      });

      // 409 = already subscribed (if your backend returns it)
      if (res.status === 409) {
        setSubStatus("sent");
        setSubMessage("You're already subscribed.");
        return;
      }

      if (!res.ok) throw new Error(`API responded with ${res.status}`);

      setSubStatus("sent");
      setSubMessage("Thanks for subscribing!");
      setSubEmail("");
    } catch (err) {
      console.error("Subscribe error:", err);
      setSubStatus("error");
      setSubMessage(
        err instanceof Error ? `Failed: ${err.message}` : "Something went wrong."
      );
    }
  }

  return (
    <div className="Subcribe">
      <div className="subBanner">
        <div className="image">
          <img src="./sammy logo copy2.jpg" alt="Subscription Banner" className="subImage" />
        </div>
        <div className="subContent">
          <div className="icon">
            <img src="./fluent_design-ideas-28-filled.png" alt="" className="subIcon" />
          </div>
          <h2>Let’s Stay Connected</h2>
          <p>Stay connected for exclusive updates, creative insights, and newly crafted projects. Get valuable ideas and inspiration delivered straight to your inbox, designed to keep you informed, inspired, and ahead.</p>
          <div className="input">
            <input
              type="email"
              placeholder="Enter your email"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            />
            <button type="button" onClick={handleSubscribe} disabled={subStatus === "sending"}>
              {subStatus === "sending" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {subMessage && (
            <p
              role="status"
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: subStatus === "error" ? "#e5484d" : "#30a46c",
              }}
            >
              {subMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Subcribe