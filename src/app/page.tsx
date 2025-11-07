
import { CareerTabs } from "@/components/organisms/CarrerTab";
import { getHomeData } from "@/services/homepage/getHomeData";
import { ProfileSection } from "@/components/organisms/ProfileSection";
import { ThemeSetter } from "@/components/atoms/theme-setter";
import { OpportunitiesSection } from "@/components/organisms/OpportunitiesSection";
import SectionNosStoria from "@/components/organisms/SectionNosStoria";

import { HeroCarousel } from "@/components/organisms/HeroBanner";

import { getServiceTopByProfile } from "@/services/services/getServiceTopByProfile";
import {VerifyAuthenticityTemplate} from "@/components/organisms/VerifyAuthenticity";

export const revalidate = 60

export default async function Home() {

    const [data, services] = await Promise.all([getHomeData(), getServiceTopByProfile()]);

    return (
    <main>
      <ThemeSetter theme="dark" />
      {data?.banner && <HeroCarousel slidesData={data?.banner} />}

      {data?.section_profile && <ProfileSection {...data?.section_profile} service_top={services?.service_top || []} servicesByProfile={services?.service_top_by_profile || []} />}

      {data?.section_opportunity && <OpportunitiesSection {...data?.section_opportunity} />}
      {data?.section_voz_kre_mais && <CareerTabs {...data?.section_voz_kre_mais} />}
      <VerifyAuthenticityTemplate/>

      {data?.section_nos_storia && <SectionNosStoria {...data?.section_nos_storia} />}

    </main>
  );
}
