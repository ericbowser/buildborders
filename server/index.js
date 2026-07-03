import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pinoHttp from "pino-http";
import { createEmailTransporter, getEmailConfig } from "./emailTransport.js";
import { logger, sanitizeBody } from "./logger.js";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 7667;
const SITE_NAME = "Execute & Engrave";

const emailConfig = getEmailConfig();
const { EMAIL_USER, EMAIL_RECEIVE } = emailConfig;
const { method: authMethod, transporter } = createEmailTransporter(emailConfig);

app.use(cors());
app.use(express.json());

app.use(
  pinoHttp({
    logger,
    customLogLevel(req, res, err) {
      if (err || res.statusCode >= 500) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          body: sanitizeBody(req.body),
        };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }),
);

if (!emailConfig.configured) {
  logger.warn("Email not configured — API runs in mock mode");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let emailMode = transporter ? "smtp" : "mock";

async function deliverMail(options, log) {
  if (emailMode === "mock") {
    const messageId = `mock-${Date.now()}`;
    log.warn({ messageId, to: options.to }, "Mail mock — SMTP not active");
    return { messageId };
  }
  const info = await transporter.sendMail(options);
  log.info({ messageId: info.messageId, to: options.to }, "Mail sent");
  return info;
}

if (transporter) {
  transporter
    .verify()
    .then(() => {
      emailMode = "smtp";
      logger.info({ authMethod, emailUser: EMAIL_USER }, "SMTP verified");
    })
    .catch((err) => logger.warn({ err: err.message }, "SMTP verify failed — mock mode"));
}

app.post("/api/contact", async (req, res) => {
  const log = req.log;
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  try {
    const info = await deliverMail(
      {
        from: `"${SITE_NAME}" <${EMAIL_USER}>`,
        to: EMAIL_RECEIVE,
        replyTo: email,
        subject: `Quote request from ${name}`,
        html: `
          <h2>Contact / quote request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr />
          <p>${String(message).replace(/\n/g, "<br/>")}</p>
        `,
      },
      log,
    );
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    log.error({ err: err.message }, "Contact email failed");
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.post("/api/subscribe", async (req, res) => {
  const log = req.log;
  const email = (req.body.email || "").trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Valid email is required." });
  }

  try {
    const info = await deliverMail(
      {
        from: `"${SITE_NAME}" <${EMAIL_USER}>`,
        to: EMAIL_RECEIVE,
        subject: `New subscriber — ${SITE_NAME}`,
        html: `<p>New subscriber: <a href="mailto:${email}">${email}</a></p>`,
      },
      log,
    );
    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (err) {
    log.error({ err: err.message }, "Subscribe failed");
    res.status(500).json({ error: "Failed to send notification." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    emailMode,
    authMethod,
    smtpConfigured: emailConfig.configured,
  });
});

app.listen(PORT, () => {
  logger.info({ port: PORT }, "Execute & Engrave email API started");
});
