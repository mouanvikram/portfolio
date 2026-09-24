"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof NextLink>;

/**
 * Internal link that prefetches on intent (hover / focus / touch) instead of
 * on viewport entry, so the page is already in the router cache by the time
 * the click lands and navigation is instant.
 */
export function Link({ href, onMouseEnter, onFocus, onTouchStart, ...rest }: Props) {
  const router = useRouter();
  const url = typeof href === "string" ? href : (href.pathname ?? "/");
  const prefetch = () => router.prefetch(url);

  return (
    <NextLink
      href={href}
      prefetch={false}
      onMouseEnter={(e) => {
        prefetch();
        onMouseEnter?.(e);
      }}
      onFocus={(e) => {
        prefetch();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        prefetch();
        onTouchStart?.(e);
      }}
      {...rest}
    />
  );
}
