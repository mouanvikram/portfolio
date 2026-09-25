export type XProfile = { followers: number; following: number };

/**
 * Public X profile stats via the FxTwitter API (no auth needed), fetched at
 * build time. Returns null if it's unreachable so the build never fails.
 */
export async function getXProfile(user: string): Promise<XProfile | null> {
  try {
    const res = await fetch(`https://api.fxtwitter.com/${user}`);
    if (!res.ok) return null;
    const { user: u } = await res.json();
    if (!u) return null;
    return {
      followers: u.followers,
      following: u.following,
    };
  } catch {
    return null;
  }
}
