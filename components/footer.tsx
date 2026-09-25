import { ContributionGraph } from "@/components/contribution-graph";
import { Pop } from "@/components/pop";
import { site } from "@/lib/content";
import { getContributions } from "@/lib/github";
import { getXProfile } from "@/lib/x";

const ext = { target: "_blank", rel: "noreferrer" } as const;

function Profile({ sub }: { sub: string }) {
  return (
    <span className="profile">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={site.avatar} alt="" width={36} height={36} loading="lazy" />
      <span>
        <strong>{site.name}</strong>
        <span className="profile-sub">{sub}</span>
      </span>
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
            <Profile sub={`@${site.handle}`} />
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
            <Profile sub={site.email} />
            <span className="pop-action link">Compose in Gmail ↗</span>
          </a>
        </Pop>
      </span>
    </footer>
  );
}
