import { ProfileForm } from "@/components/studio/ProfileForm";
import { getProfile } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function StudioProfilePage() {
  const profile = await getProfile();

  return (
    <>
      <div className="studio-head">
        <h1>Profil &amp; peran</h1>
      </div>
      <ProfileForm profile={profile} />
    </>
  );
}
