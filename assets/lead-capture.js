/**
 * Lead Capture — Sends contact-form submissions to Supabase `leads` table
 * in addition to the existing Formspree endpoint (which still handles email).
 */
(function () {
  const SUPABASE_URL = "https://fllqdhvvnqoayugohzld.supabase.co";
  const SUPABASE_ANON = "sb_publishable_mM9VIE_SOUb956b_7UeTzw_n9QaNuiL";

  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fd = new FormData(form);
    const lead = {
      name: (fd.get("name") || "").trim(),
      email: (fd.get("email") || "").trim(),
      company: (fd.get("company") || "").trim() || null,
      device_type: (fd.get("device") || "").trim() || null,
      message: (fd.get("message") || "").trim() || null,
      source: "website",
    };

    // 1) Insert into Supabase (fire-and-forget, don't block the user)
    fetch(SUPABASE_URL + "/rest/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON,
        Authorization: "Bearer " + SUPABASE_ANON,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(lead),
    }).catch(function () {
      /* silent — Formspree is the primary fallback */
    });

    // 2) Submit to Formspree as usual
    fetch(form.action, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          form.insertAdjacentHTML(
            "beforeend",
            '<p style="color:#2dd4a0;margin-top:12px;font-weight:600">✓ Message sent — we\'ll be in touch shortly.</p>',
          );
        } else {
          throw new Error("Formspree error");
        }
      })
      .catch(function () {
        form.insertAdjacentHTML(
          "beforeend",
          '<p style="color:#f04e4e;margin-top:12px">Something went wrong. Please email us directly.</p>',
        );
      });
  });
})();
