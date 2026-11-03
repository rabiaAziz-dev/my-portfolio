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
        description:
          'AI-powered Flutter application for USCIS civics prep featuring oral AI mock interviews, spaced-repetition flashcards, and elected officials lookup.',
        operatingSystem: 'Android',
        applicationCategory: 'EducationalApplication',
        url: 'https://play.google.com/store/apps/details?id=com.us.citizenship.test.naturalization.civics.prep&hl=en',
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.us.citizenship.test.naturalization.civics.prep&hl=en',
        installUrl:
          'https://play.google.com/store/apps/details?id=com.us.citizenship.test.naturalization.civics.prep&hl=en',
        image: 'https://swe-rabia-aziz.vercel.app/images/civic_coach_showcase.jpeg',
        screenshot:
          'https://swe-rabia-aziz.vercel.app/images/civic_coach_showcase.jpeg',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '120',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Ethiopian Calendar — Zemen App',
        description:
          'Feature-rich Ethiopian calendar and date converter with 13-month Geez navigation, live 12-hour clock, and Orthodox fasting schedules.',
        operatingSystem: 'Android',
        applicationCategory: 'UtilitiesApplication',
        url: 'https://play.google.com/store/apps/details?id=com.ethiopia.zemen.calendar.aqotater.ethiopian.habesha&hl=en',
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.ethiopia.zemen.calendar.aqotater.ethiopian.habesha&hl=en',
        installUrl:
          'https://play.google.com/store/apps/details?id=com.ethiopia.zemen.calendar.aqotater.ethiopian.habesha&hl=en',
        image: 'https://swe-rabia-aziz.vercel.app/images/zemen_showcase.png',
        screenshot:
          'https://swe-rabia-aziz.vercel.app/images/zemen_showcase.png',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '95',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'ZenPeace — Pomodoro & Mindful Flow',
        description:
          'A minimalist Pomodoro companion built with Flutter and Provider. Offers ambient soundscapes, session analytics, and haptic feedback.',
        operatingSystem: 'Android',
        applicationCategory: 'ProductivityApplication',
        url: 'https://play.google.com/store/apps/details?id=com.zenpeace.pomodoro.focus.timer.mindfulstate&hl=en',
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.zenpeace.pomodoro.focus.timer.mindfulstate&hl=en',
        installUrl:
          'https://play.google.com/store/apps/details?id=com.zenpeace.pomodoro.focus.timer.mindfulstate&hl=en',
        image: 'https://swe-rabia-aziz.vercel.app/images/zenpeace_showcase.png',
        screenshot:
          'https://swe-rabia-aziz.vercel.app/images/zenpeace_showcase.png',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '80',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Health Tracker — Vitals & BP Monitor',
        description:
          'A personal health companion to record and monitor blood pressure, pulse rate, temperature, and blood glucose with trend charts.',
        operatingSystem: 'Android',
        applicationCategory: 'HealthApplication',
        url: 'https://play.google.com/store/apps/details?id=com.vitals.bp.family.health.tracker&hl=en',
        downloadUrl:
          'https://play.google.com/store/apps/details?id=com.vitals.bp.family.health.tracker&hl=en',
        installUrl:
          'https://play.google.com/store/apps/details?id=com.vitals.bp.family.health.tracker&hl=en',
        image:
          'https://swe-rabia-aziz.vercel.app/images/health_trackor showcase.jpg',
        screenshot:
          'https://swe-rabia-aziz.vercel.app/images/health_trackor showcase.jpg',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '65',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@id': 'https://swe-rabia-aziz.vercel.app/#person',
        },
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
