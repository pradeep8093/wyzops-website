/**
 * Leadership / key people.
 *
 * ⭐ Adding real people is the single biggest trust boost for the site —
 * buyers want to know who they'll work with. The Team section shows how
 * projects are staffed; once you add entries here, profile cards appear too.
 *
 * Photos go in /public/team (square, at least 400×400).
 *
 *   {
 *     name: "Your Name",
 *     role: "Founder & Principal Engineer",
 *     bio: "One or two factual lines — e.g. years with Boomi, past roles, certifications.",
 *     photo: { src: "/team/your-name.jpg", alt: "Your Name" },
 *     linkedin: "https://www.linkedin.com/in/…",
 *   }
 */

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  photo?: { src: string; alt: string };
  linkedin?: string;
};

export const leadership: TeamMember[] = [];
