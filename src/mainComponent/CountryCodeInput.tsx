import { useState, useRef, useEffect, type ChangeEvent } from "react";
import {
  parsePhoneNumber,
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";
import emailjs from "@emailjs/browser";

import "./CountryCodeInput.css";
import "./ContactLanding.css"

type CountryOption = {
  isoCode: CountryCode;
  name: string;
  callingCode: string;
  flag: string;
};

type CountryCodeInputProps = {
  value?: string;
  defaultCountry?: CountryCode;
  onChange?: (value: {
    country: CountryOption;
    phone: string;
    fullNumber: string;
  }) => void;
};

type Status = "idle" | "sending" | "sent" | "error";

const EMAILJS_SERVICE_ID = "service_hpslcur";
const EMAILJS_TEMPLATE_ID = "template_ozhm5fs";
const EMAILJS_PUBLIC_KEY = "ol87NjZWfGTDOeT55";

const regionNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

const countries: CountryOption[] = getCountries()
  .map((isoCode) => ({
    isoCode,
    name: regionNames.of(isoCode) ?? isoCode,
    callingCode: `+${getCountryCallingCode(isoCode)}`,
    flag: String.fromCodePoint(
      ...[...isoCode].map((char) => 127397 + char.charCodeAt(0))
    ),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function CountryCodeInput({
  value = "",
  onChange,
  defaultCountry = "NG",
}: CountryCodeInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((country) => country.isoCode === defaultCountry) ||
      countries[0]
  );

  const [phone, setPhone] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countries.filter((country) => {
    const query = search.toLowerCase().trim();

    return (
      country.name.toLowerCase().includes(query) ||
      country.callingCode.includes(query) ||
      country.isoCode.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setPhone(value);
  }, [value]);

  function handleCountrySelect(country: CountryOption) {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearch("");

    if (onChange) {
      onChange({
        country,
        phone,
        fullNumber: `${country.callingCode}${phone}`,
      });
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    setPhone(input);

    if (onChange) {
      onChange({
        country: selectedCountry,
        phone: input,
        fullNumber: `${selectedCountry.callingCode}${input}`,
      });
    }
  }

  // Returns the phone number in international format (E.164), or null if invalid.
  function getValidPhone() {
    const input = phone.trim();

    if (!input) return null;

    try {
      // Parse the entered number using the selected country.
      const parsed = parsePhoneNumber(input, selectedCountry.isoCode);

      if (parsed?.isValid()) {
        return parsed.number;
      }
    } catch {
      // The number may be incomplete or invalid.
    }

    return null;
  }

  async function handleSend() {
    if (status === "sending") return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      setError("Please fill in your name, email and message.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setStatus("error");
      setError("Please enter a valid email address.");
      return;
    }

    const validPhone = getValidPhone();

    if (!validPhone) {
      setStatus("error");
      setError("Please enter a valid phone number for the selected country.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        phone: validPhone,
        message: trimmedMessage,
      };

      // Run both at the same time: save to your API and send the email
      const [saved, emailed] = await Promise.allSettled([
        fetch("https://myportfoliobackend-cuaw.onrender.com/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then((res) => {
          if (!res.ok) throw new Error(`API responded with ${res.status}`);
          return res.json();
        }),

        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          payload,
          { publicKey: EMAILJS_PUBLIC_KEY }
        ),
      ]);

      if (saved.status === "rejected") console.error("Save failed:", saved.reason);
      if (emailed.status === "rejected") console.error("Email failed:", emailed.reason);

      // Treat it as sent if at least one of them worked
      if (saved.status === "fulfilled" || emailed.status === "fulfilled") {
        setStatus("sent");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        throw new Error("Both save and email failed");
      }
    } catch (err) {
      const e = err as { status?: number; text?: string };
      console.error("EmailJS error:", e.status, e.text, err);
      setStatus("error");
      setError(`Failed to send: ${e.text ?? "unknown error"} (${e.status ?? "no status"})`);
    }
    // try {
    //   await emailjs.send(
    //     EMAILJS_SERVICE_ID,
    //     EMAILJS_TEMPLATE_ID,
    //     {
    //       name: trimmedName,
    //       email: trimmedEmail,
    //       phone: validPhone, // e.g. +2348012345678
    //       message: trimmedMessage,
    //     },
    //     {
    //       publicKey: EMAILJS_PUBLIC_KEY,
    //     }
    //   );

    //   setStatus("sent");
    //   setName("");
    //   setEmail("");
    //   setPhone("");
    //   setMessage("");
    // } catch (err) {
    //   const e = err as { status?: number; text?: string };
    //   console.error("EmailJS error:", e.status, e.text, err);
    //   setStatus("error");
    //   setError(`Failed to send: ${e.text ?? "unknown error"} (${e.status ?? "no status"})`);
    // }
  }

  return (
    <div className="allForm">
      <input
        type="text"
        className="Name"
        placeholder="Enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        type="email"
        className="Email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <div className="NumberCode">
        <div className="country-phone" ref={containerRef}>
          <div className="country-phone__control">
            <button
              type="button"
              className={`country-phone__trigger ${
                isOpen ? "is-open" : ""
              }`}
              onClick={() => setIsOpen((previous) => !previous)}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
            >
              <span className="country-phone__flag">
                {selectedCountry.flag}
              </span>

              <span className="country-phone__code">
                {selectedCountry.callingCode}
              </span>

              <svg
                className="country-phone__chevron"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <input
              className="country-phone__input"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter your phone number"
              autoComplete="tel-national"
            />
          </div>

          {isOpen && (
            <div className="country-phone__dropdown">
              <div className="country-phone__search">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>

                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search country or code..."
                  aria-label="Search countries"
                />
              </div>

              <div
                className="country-phone__list"
                role="listbox"
                aria-label="Countries"
              >
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      type="button"
                      role="option"
                      aria-selected={
                        selectedCountry.isoCode === country.isoCode
                      }
                      key={country.isoCode}
                      className={`country-phone__option ${
                        selectedCountry.isoCode === country.isoCode
                          ? "is-selected"
                          : ""
                      }`}
                      onClick={() => handleCountrySelect(country)}
                    >
                      <span className="country-phone__option-flag">
                        {country.flag}
                      </span>

                      <span className="country-phone__name">
                        {country.name}
                      </span>

                      <span className="country-phone__option-code">
                        {country.callingCode}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="country-phone__empty">
                    No countries found.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="MessageAndErrorMessage">
        <textarea
          name="Message"
          placeholder="Send your message"
          className="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

          {/* Inline style so no new classname is needed */}
        {status === "error" && error && (
          <p role="alert" style={{ color: "#e5484d", margin: 0, fontSize: "12px", fontWeight: "500" }}>
            {error}
          </p>
        )}

        {status === "sent" && (
          <p role="status" style={{ color: "#30a46c", margin: 0, fontSize: "12px", fontWeight: "500" }}>
            Message sent. Thank you!
          </p>
        )}

      </div>

      <button
        type="button"
        className="send"
        onClick={handleSend}
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Via Email"}
      </button>
      
    </div>
  );
}
