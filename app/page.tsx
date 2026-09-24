import { CopyEmail } from "@/components/copy-email";
import { Note } from "@/components/note";
import { TechStack } from "@/components/tech-stack";
import { site } from "@/lib/content";

const ext = { target: "_blank", rel: "noreferrer" } as const;

export default function Home() {
  return (
    <section className="essay">
      <p>
        I&apos;m Vikram, a builder who likes owning a thing{" "}
        <Note term="end to end">
          Schema to shipping: Prisma migrations, an Express API, a React client, Docker infra, and GitHub
          Actions that deploy to EC2 on every merge to main.
        </Note>
        . Lately that&apos;s been{" "}
        <Note term="BakBak">
          <a className="note-preview" href="https://bakbak.mouan.in" {...ext} aria-label="Open BakBak">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/previews/bakbak.webp" alt="BakBak login screen" width={520} height={325} loading="lazy" decoding="async" />
            <span className="note-preview-url">bakbak.mouan.in</span>
          </a>
          <strong>BakBak</strong>
          Social chat — direct &amp; group messages, friends, media sharing and calls.
          <span className="note-links">
            <a className="link" href="https://bakbak.mouan.in" {...ext}>Live ↗</a>
            <a className="link" href="https://github.com/mouanvikram/bakbak" {...ext}>Code ↗</a>
          </span>
        </Note>
        , a{" "}
        <Note term="real-time">
          Socket.IO for presence, typing and read receipts, fanned out through a Redis adapter. Calls go
          peer-to-peer over WebRTC — the server only relays the handshake.
        </Note>{" "}
        chat platform, and I wrote every layer myself on{" "}
        <Note term="Bun, Postgres and Redis">
          <span className="stack">
            <span>Bun</span><span>runtime + monorepo</span>
            <span>Postgres 18</span><span>via Prisma</span>
            <span>Redis 8</span><span>rate limits, presence, cache</span>
            <span>R2</span><span>media storage</span>
            <span>Grafana</span><span>metrics + logs</span>
          </span>
        </Note>
        , with{" "}
        <Note term="Zod contracts">
          One shared package of Zod schemas. Every request is validated on the way in — and every response
          on the way out.
        </Note>{" "}
        guarding both sides of the wire. I&apos;d rather ship and iterate than wait for perfect. Right now
        I&apos;m building{" "}
        <Note term="uncut-ui">
          <strong>uncut-ui</strong>
          A component library, in progress.
          <span className="note-links">
            <a className="link" href={site.uncutUiLive} {...ext}>Live ↗</a>
            <a className="link" href={site.uncutUi} {...ext}>Code ↗</a>
          </span>
        </Note>
        , a component library. If you&apos;re working on something ambitious,{" "}
        <Note term="let's talk">
          <span className="email-row">
            <a className="link" href={site.gmail} {...ext}>{site.email}</a>
            <CopyEmail email={site.email} />
          </span>
          or <a className="link" href={site.x} {...ext}>@{site.handle}</a> on X.
        </Note>
        .
      </p>
      <TechStack />
    </section>
  );
}
