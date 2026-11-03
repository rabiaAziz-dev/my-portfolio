export default function JsonLd() {
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://swe-rabia-aziz.vercel.app/#website',
        url: 'https://swe-rabia-aziz.vercel.app',
        name: 'Rabia Aziz Portfolio',
        description:
          'Portfolio of Rabia Aziz — Cross-Platform Flutter Developer & Mobile App Engineer.',
        publisher: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://swe-rabia-aziz.vercel.app/#profilepage',
        url: 'https://swe-rabia-aziz.vercel.app',
        name: 'Rabia Aziz | Flutter Developer & Mobile App Engineer',
        isPartOf: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#website',
        },
        mainEntity: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        name: 'Rabia Aziz',
        alternateName: ['SWE. Rabia Aziz', 'Rabia Aziz Dev'],
        jobTitle: 'Flutter Developer & Mobile App Engineer',
        description:
          'Flutter Developer specializing in AI-powered cross-platform mobile apps, Supabase & Firebase backends, and clean UI/UX architecture.',
        url: 'https://swe-rabia-aziz.vercel.app',
        image: 'https://swe-rabia-aziz.vercel.app/images/Logo.png',
        email: 'swe.rabiaaziz@gmail.com',
        telephone: '+923275676026',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mingora',
          addressRegion: 'Swat, Khyber Pakhtunkhwa',
          addressCountry: 'PK',
        },
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: 'Virtual University of Pakistan',
        },
        sameAs: [
          'https://github.com/rabiaAziz-dev',
          'https://www.linkedin.com/in/rabiaaziz456/',
          'https://www.instagram.com/rabiko_korozawa/',
          'https://wa.me/923275676026',
          'https://play.google.com/store/apps/details?id=com.us.citizenship.test.naturalization.civics.prep',
          'https://play.google.com/store/apps/details?id=com.ethiopia.zemen.calendar.aqotater.ethiopian.habesha',
          'https://play.google.com/store/apps/details?id=com.zenpeace.pomodoro.focus.timer.mindfulstate',
          'https://play.google.com/store/apps/details?id=com.vitals.bp.family.health.tracker',
        ],
        knowsAbout: [
          'Flutter',
          'Dart',
          'Cross-Platform App Development',
          'Android Development',
          'iOS Development',
          'Supabase',
          'Firebase',
          'Cloud Firestore',
          'AI / LLM Integration',
          'BLoC State Management',
          'Provider State Management',
          'Clean Architecture',
          'Mobile UI/UX Design',
        ],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'CivicCoach — AI US Citizenship 2026',
        operatingSystem: 'Android',
        applicationCategory: 'EducationalApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.us.citizenship.test.naturalization.civics.prep&hl=en',
        author: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
        image: 'https://swe-rabia-aziz.vercel.app/images/civic_coach_showcase.jpeg',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Ethiopian Calendar — Zemen App',
        operatingSystem: 'Android',
        applicationCategory: 'UtilitiesApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.ethiopia.zemen.calendar.aqotater.ethiopian.habesha&hl=en',
        author: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
        image: 'https://swe-rabia-aziz.vercel.app/images/zemen_showcase.png',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'ZenPeace — Pomodoro & Mindful Flow',
        operatingSystem: 'Android',
        applicationCategory: 'ProductivityApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.zenpeace.pomodoro.focus.timer.mindfulstate&hl=en',
        author: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
        image: 'https://swe-rabia-aziz.vercel.app/images/zenpeace_showcase.png',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Health Tracker — Vitals & BP Monitor',
        operatingSystem: 'Android',
        applicationCategory: 'HealthApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.vitals.bp.family.health.tracker&hl=en',
        author: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
        image: 'https://swe-rabia-aziz.vercel.app/images/health_trackor showcase.jpg',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
