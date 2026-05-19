# Chatbot Protection Plan

## Goal

Protect the CA HUB AUTO chatbot from abuse, excessive OpenAI costs, malformed requests, spam, and accidental exposure of sensitive credentials.

## 1. Keep The API Key Server-Side

The OpenAI API key must only exist in server-side environment variables.

Use:

```env
OPENAI_API_KEY=sk-proj-...
```

Never expose the key through frontend code, `VITE_` environment variables, browser requests, committed files, logs, or public configuration.

## 2. Add IP Rate Limiting

Protect `/api/chat` with per-IP limits.

Recommended starting limits:

```text
10 requests per minute per IP
50 requests per hour per IP
```

Expected behavior:

```text
HTTP 429
Too many requests. Please try again later.
```

For local development, an in-memory limiter is acceptable.

For production, use a shared store such as:

```text
Upstash Redis
Vercel KV
Cloudflare KV / Durable Objects
Redis
```

## 3. Limit Message Size

Reject oversized messages before sending anything to OpenAI.

Recommended limits:

```text
Max latest user message: 1,000 characters
Max total request body: 10 KB
```

Expected behavior:

```text
HTTP 400
Message is too long.
```

## 4. Limit Conversation History

Do not forward unlimited chat history to OpenAI.

Recommended limit:

```text
Send only the last 10 messages
```

This keeps requests cheaper, faster, and less vulnerable to abuse through very large histories.

## 5. Limit Model Output

Cap the number of tokens OpenAI can generate per response.

Recommended starting point:

```ts
maxOutputTokens: 500
```

This protects cost per request and prevents very long streamed answers.

## 6. Constrain Chatbot Scope

The system prompt should keep the assistant focused on CA HUB AUTO topics only.

Allowed topics:

```text
CA HUB AUTO
fleet
pricing
booking
availability
service areas
contact information
vehicle recommendations
heavy equipment recommendations
```

For unrelated prompts, the chatbot should politely refuse and redirect the user back to CA HUB AUTO services.

## 7. Validate Request Shape

Validate incoming `/api/chat` requests before calling OpenAI.

Required shape:

```ts
messages: array
language: "en" | "pt"
```

Reject malformed payloads with `HTTP 400`.

Also reject requests with no usable user text.

## 8. Sanitize Error Handling

Do not expose raw OpenAI errors, stack traces, request bodies, or API details to users.

User-facing fallback:

```text
The assistant is temporarily unavailable. Please try again in a moment.
```

Log detailed errors server-side only.

## 9. Add Abuse Logging

Log lightweight security and abuse metadata.

Recommended fields:

```text
timestamp
IP address
request count
message length
HTTP status
OpenAI error code
```

Avoid logging full user messages unless the site has a clear privacy policy that covers this.

## 10. Add Deployment-Level Protection

Use platform-level protections where available.

For Vercel:

```text
Vercel Firewall
WAF rules
bot protection if available
```

For Cloudflare:

```text
WAF rule for /api/chat
Turnstile if abuse appears
bot protection
country or IP blocking if needed
```

## 11. Add CAPTCHA Only If Needed

Do not add CAPTCHA immediately unless abuse starts. CAPTCHA can hurt normal users.

If needed, use Cloudflare Turnstile or hCaptcha.

Possible trigger points:

```text
after 3 messages in one session
after suspicious request rate
only when rate limits are close to being exceeded
```

## 12. Configure OpenAI Cost Controls

Set project-level limits in the OpenAI dashboard.

Recommended controls:

```text
monthly budget limit
usage alerts
project-specific API key
restricted project permissions where possible
```

This is the final safety net if endpoint abuse gets through.

## 13. Improve Frontend UX Protections

The UI should discourage accidental spam.

Recommended behavior:

```text
disable send while streaming
add a short cooldown between messages
show rate-limit messages clearly
show friendly API error messages
```

## Production Checklist

Before launch, confirm:

```text
OPENAI_API_KEY is only server-side
.env is ignored by git
/api/chat has rate limiting
message length is capped
conversation history is capped
model output is capped
system prompt is scoped
request shape is validated
errors are sanitized
basic abuse logging exists
OpenAI budget limits are configured
```

## Recommended Implementation Order

1. Add request validation.
2. Add message length, history, and output limits.
3. Add an in-memory development rate limiter.
4. Add a production Redis/Upstash-backed rate limiter.
5. Tighten the system prompt scope.
6. Improve frontend error display.
7. Configure OpenAI budget limits.
8. Add CAPTCHA or Turnstile only if abuse appears.
