import NavBar from '@/components/site/navbar';
import Hero from '@/components/site/hero';
import SectionTitle from '@/components/site/section-title';
import Testimonials from '@/components/site/testimonials';
import Faq from '@/components/site/faq';
import Footer from '@/components/site/footer';
import Video from '@/components/site/video';
import Benefits from '@/components/site/benefits';
import Cta from '@/components/site/cta';
import PopupWidget from '@/components/site/popup';

import { benefitOne, benefitTwo } from "@/components/site/data";

export default function Index() {
  return (
    <>
      <NavBar/>
      <Hero />
      <SectionTitle
        pretitle="Nextly Benefits"
        title=" Why should you use this landing page">
        Nextly is a free landing page & marketing website template for startups
        and indie projects. Its built with Next.js & TailwindCSS. And its
        completely open-source.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <SectionTitle
        pretitle="Watch a video"
        title="Learn how to fullfil your needs">
        This section is to highlight a promo or demo video of your product.
        Analysts says a landing page with video has 3% more conversion rate. So,
        don&apost forget to add one. Just like this.
      </SectionTitle>
      <Video />
      <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said">
        Testimonails is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>
      <Faq />
      <Cta />
      <Footer />
      <PopupWidget />
    </>
  );
}
