import NavBar from '@/components/home/navbar';
import Hero from '@/components/home/hero';
import SectionTitle from '@/components/home/section-title';
import Testimonials from '@/components/home/testimonials';
import Faq from '@/components/home/faq';
import Footer from '@/components/home/footer';
import Video from '@/components/home/video';
import Benefits from '@/components/home/benefits';
import Cta from '@/components/home/cta';
import PopupWidget from '@/components/home/popup';

import { benefitOne, benefitTwo } from "@/components/home/data";
import ThemeProvider from '@/components/theme-provider';

export default function Index() {
  return (
    <ThemeProvider attribute="class">
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
    </ThemeProvider>
  );
}
