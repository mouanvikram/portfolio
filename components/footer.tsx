import type { ReactNode } from "react";
import { ContributionGraph } from "@/components/contribution-graph";
import { Pop } from "@/components/pop";
import { site } from "@/lib/content";
import { getContributions } from "@/lib/github";
import { getXProfile } from "@/lib/x";

const ext = { target: "_blank", rel: "noreferrer" } as const;

/* Gmail's 2026 gradient "M" (from Wikimedia's official SVG). */
const GmailLogo = () => (
  <svg className="profile-mark" viewBox="0 0 800 636.4" width="22" height="18" aria-label="Gmail" role="img">
    <defs>
      <linearGradient id="gmail-a" x1="713.6" x2="713.6" y1="81.8" y2="636.4" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60d673" />
        <stop offset=".17" stopColor="#42c868" />
        <stop offset=".39" stopColor="#0ebc5f" />
        <stop offset=".62" stopColor="#00a9bb" />
        <stop offset=".86" stopColor="#3c90ff" />
        <stop offset="1" stopColor="#3186ff" />
      </linearGradient>
      <linearGradient id="gmail-b" x1="0" x2="800" y1="91.5" y2="91.5" gradientUnits="userSpaceOnUse">
        <stop offset=".08" stopColor="#ff63a0" />
        <stop offset=".3" stopColor="#fc413d" />
        <stop offset=".65" stopColor="#fc413d" />
        <stop offset=".72" stopColor="#fc5c30" />
        <stop offset=".86" stopColor="#feb10c" />
        <stop offset=".91" stopColor="#fec700" />
        <stop offset=".96" stopColor="#ffdb0f" />
      </linearGradient>
    </defs>
    <path fill="url(#gmail-a)" d="M627.3 81.8H800v500c0 30.1-24.4 54.6-54.5 54.6h-90.9a27.3 27.3 0 0 1-27.3-27.3z" />
    <path fill="#fc413d" d="M172.7 81.8H0v500c0 30.1 24.4 54.6 54.5 54.6h90.9a27.3 27.3 0 0 0 27.3-27.3z" />
    <path fill="url(#gmail-b)" d="M141.9 20.3C105.4-10.4 50.9-5.7 20.3 30.8-10.4 67.3-5.7 121.8 30.8 152.5l345.8 290.7a36.4 36.4 0 0 0 46.8 0l345.8-290.7c36.5-30.7 41.2-85.2 10.5-121.7C749.1-5.7 694.6-10.4 658.1 20.3L400 237.2z" />
  </svg>
);

/* X's wordmark glyph, in the text colour so it flips with the theme. */
const XLogo = () => (
  <svg className="profile-mark" viewBox="0 0 24 24" width="18" height="18" aria-label="X" role="img">
    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function Profile({ sub, mark }: { sub: string; mark?: ReactNode }) {
  return (
    <span className="profile">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={site.avatar} alt="" width={36} height={36} loading="lazy" />
      <span>
        <strong>{site.name}</strong>
        <span className="profile-sub">{sub}</span>
      </span>
      {mark}
    </span>
  );
}

export async function Footer() {
  const [contributions, xProfile] = await Promise.all([getContributions(site.handle), getXProfile(site.handle)]);

  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} mouan.in</span>
      <span className="footer-links">
        <Pop href={site.github} label="GitHub">
          <span className="pop-head">
            <Profile sub={`github.com/${site.handle}`} />
            {contributions && <span className="pop-meta">{contributions.total.toLocaleString("en-US")} contributions in the last year</span>}
          </span>
          {contributions && <ContributionGraph data={contributions} />}
        </Pop>
        <Pop href={site.x} label="X">
          <a className="pop-card-link" href={site.x} {...ext}>
            {xProfile?.banner && <span className="x-banner" style={{ backgroundImage: `url(${xProfile.banner})` }} />}
            <Profile sub={`@${site.handle}`} mark={<XLogo />} />
            {xProfile && (
              <span className="x-stats">
                <span><strong>{xProfile.following.toLocaleString("en-US")}</strong> Following</span>
                <span><strong>{xProfile.followers.toLocaleString("en-US")}</strong> Followers</span>
              </span>
            )}
            <span className="pop-action link">Open profile on X ↗</span>
          </a>
        </Pop>
        <Pop href={site.gmail} label="Gmail">
          <a className="pop-card-link" href={site.gmail} {...ext}>
            <Profile sub={site.email} mark={<GmailLogo />} />
            <span className="pop-action link">Compose in Gmail ↗</span>
          </a>
        </Pop>
      </span>
    </footer>
  );
}
