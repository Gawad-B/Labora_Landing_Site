/**
 * Which installer to put in front of this visitor.
 *
 * Labora ships a Windows installer and a Linux tarball, both x86-64, and nothing
 * else. So the job here is not to identify the operating system — it is to answer
 * one question: is there a build this person can actually run? Everything that
 * cannot run one is `other`, and `other` is shown the choice rather than a button
 * that downloads 220 MB of something useless.
 *
 * Three traps, all of which a naive `indexOf('Linux')` falls into:
 *
 *   * **Android says Linux.** Every Android user agent contains it. A phone must
 *     not be offered a tarball with an install.sh in it.
 *   * **ChromeOS says Linux too** (`CrOS`), and cannot run either build.
 *   * **`navigator.platform` is deprecated and frozen** in several browsers.
 *     It is consulted last, as a hint, never as the answer.
 *
 * Detection is a convenience and is allowed to be wrong: every platform stays one
 * click away underneath, and the links themselves are plain anchors that work
 * with this file deleted.
 */

export type OS = 'windows' | 'linux' | 'other';

/** Chromium exposes a structured platform; everyone else gets the string parse. */
interface UADataLike {
  platform?: string;
}

export function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'other';

  const ua = navigator.userAgent ?? '';

  // Mobile and ChromeOS first, because both answer "Linux" to everything below.
  if (/Android|iPhone|iPad|iPod|CrOS/i.test(ua)) return 'other';
  // iPadOS 13+ reports itself as a Mac, and is only distinguishable by touch.
  if (/Macintosh/i.test(ua)) return 'other';

  const hinted = (navigator as Navigator & { userAgentData?: UADataLike }).userAgentData?.platform;
  if (hinted) {
    if (/windows/i.test(hinted)) return 'windows';
    if (/linux/i.test(hinted)) return 'linux';
    return 'other';
  }

  if (/Windows|Win64|Win32|WOW64/i.test(ua)) return 'windows';
  if (/Linux|X11/i.test(ua)) return 'linux';

  // Deprecated, frozen in some browsers, and therefore last.
  const platform = navigator.platform ?? '';
  if (/Win/i.test(platform)) return 'windows';
  if (/Linux/i.test(platform)) return 'linux';

  return 'other';
}
