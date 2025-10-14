import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Link } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

const FEED_DATA = [
  {
    id: 1,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Drake Announces New Album "For All The Dogs"',
    source: '@complexmusic',
    description: 'Drake reveals surprise album dropping next week with features from Travis Scott and 21 Savage. The Canadian rapper shared the news on his Instagram story late last night, sending fans into a frenzy.',
    timeAgo: '1h ago',
  },
  {
    id: 2,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Kendrick Lamar Live Performance Breakdown',
    source: '@geniusofficial',
    description: 'Watch Kendrick deliver an electrifying performance at Rolling Loud. His stage presence and lyrical prowess continue to set him apart as one of the greatest performers of our generation.',
    timeAgo: '2h ago',
  },
  {
    id: 3,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Ice Spice New Single Goes Viral',
    source: '@rapvibes',
    description: 'Ice Spice breaks the internet with her latest drop. The Bronx rapper\'s infectious flow and catchy hooks have TikTok users creating thousands of videos to the track.',
    timeAgo: '3h ago',
  },
  {
    id: 4,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'J. Cole Talks About His Songwriting Process',
    source: 'Complex Interview',
    description: 'In an exclusive interview, J. Cole opens up about his creative approach to making music. The North Carolina rapper discusses how he crafts his introspective lyrics and conceptual albums.',
    timeAgo: '4h ago',
  },
  {
    id: 5,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Travis Scott Debuts New Single at Coachella',
    source: '@billboard',
    description: 'Travis Scott surprises Coachella crowd with unreleased track. The Houston rapper brought out special guests and delivered one of the most talked-about performances of the festival.',
    timeAgo: '5h ago',
  },
  {
    id: 6,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Lil Baby Interview: Success and Future Plans',
    source: '@theshaderoom',
    description: 'Lil Baby discusses his journey from Atlanta streets to global stardom. The rapper shares insights on his work ethic, upcoming projects, and what drives him to keep pushing boundaries.',
    timeAgo: '6h ago',
  },
  {
    id: 7,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1864642/pexels-photo-1864642.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Cardi B Dance Challenge Takes Over',
    source: '@hiphopnation',
    description: 'Cardi B\'s new dance challenge breaks records on TikTok. Celebrities and fans alike are participating in the viral trend, with the original video amassing over 50 million views.',
    timeAgo: '7h ago',
  },
  {
    id: 8,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Nas Reflects on 30 Years in Hip-Hop',
    source: 'Rolling Stone',
    description: 'Hip-hop legend Nas celebrates three decades of influential music. The Queens rapper discusses his iconic albums, evolving sound, and impact on the culture in this exclusive feature.',
    timeAgo: '8h ago',
  },
  {
    id: 9,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Megan Thee Stallion Wins Grammy Award',
    source: '@recordingacademy',
    description: 'Hot Girl Meg takes home another Grammy for Best Rap Performance. The Houston rapper delivered an emotional acceptance speech, thanking her fans and late mother.',
    timeAgo: '9h ago',
  },
  {
    id: 10,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Future & Metro Boomin Drop Joint Album',
    source: '@xxlmag',
    description: 'The dynamic duo surprise fans with "We Trust You" album. Future and Metro Boomin continue their winning streak, delivering another project filled with hard-hitting beats and memorable hooks.',
    timeAgo: '10h ago',
  },
  {
    id: 11,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Doja Cat Teases New Music Video',
    source: '@dojacat',
    description: 'Doja Cat shares behind-the-scenes footage from upcoming visual. The versatile artist hints at a bold new direction, with fans speculating about potential collaborations.',
    timeAgo: '11h ago',
  },
  {
    id: 12,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'The Weeknd Announces Stadium Tour',
    source: 'Variety',
    description: 'Abel Tesfaye reveals massive world tour spanning 40 cities. The multi-platinum artist promises an unforgettable production featuring his biggest hits and new material.',
    timeAgo: '12h ago',
  },
  {
    id: 13,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Tyler, The Creator Launches New Brand',
    source: '@golfwang',
    description: 'Tyler expands his Golf Wang empire with new clothing line. The creative mogul showcases his unique aesthetic with bold designs, proving his influence extends far beyond music.',
    timeAgo: '13h ago',
  },
  {
    id: 14,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'A$AP Rocky Studio Session Exclusive',
    source: '@asaprocky',
    description: 'Get an inside look at Rocky\'s creative process in the studio. The Harlem rapper works on his highly anticipated album, experimenting with new sounds and production techniques.',
    timeAgo: '14h ago',
  },
  {
    id: 15,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1387037/pexels-photo-1387037.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Lil Uzi Vert Previews Unreleased Track',
    source: '@liluzivert',
    description: 'Uzi sends fans into a frenzy with snippet of new music. The Philadelphia rapper\'s unique style and energy have followers eagerly awaiting the full release.',
    timeAgo: '15h ago',
  },
  {
    id: 16,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1035682/pexels-photo-1035682.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Jay-Z Inducted into Rock Hall of Fame',
    source: 'Rock & Roll Hall of Fame',
    description: 'Hov receives one of music\'s highest honors at star-studded ceremony. Jay-Z\'s induction celebrates his decades-long influence on hip-hop and popular culture worldwide.',
    timeAgo: '16h ago',
  },
  {
    id: 17,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1311518/pexels-photo-1311518.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Playboi Carti Drops Surprise Single',
    source: '@playboicarti',
    description: 'Carti shocks fans with unexpected midnight release. The Atlanta rapper\'s experimental sound continues to push boundaries, dividing critics while thrilling his devoted fanbase.',
    timeAgo: '17h ago',
  },
  {
    id: 18,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Jack Harlow: From Louisville to Stardom',
    source: '@jackharlow',
    description: 'Documentary explores Jack Harlow\'s rise to fame. The Kentucky native shares personal stories, struggles, and triumphs on his journey to becoming one of rap\'s brightest stars.',
    timeAgo: '18h ago',
  },
  {
    id: 19,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'SZA Shares Vocal Warm-Up Routine',
    source: '@sza',
    description: 'Fans get rare glimpse into SZA\'s pre-show preparation. The R&B/rap artist demonstrates her vocal exercises, offering insight into maintaining her signature smooth sound.',
    timeAgo: '19h ago',
  },
  {
    id: 20,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '50 Cent Producing New Crime Drama Series',
    source: 'Hollywood Reporter',
    description: 'Curtis Jackson expands his television empire with new show. The hip-hop mogul continues his success in entertainment, bringing authentic street stories to mainstream audiences.',
    timeAgo: '20h ago',
  },
  {
    id: 21,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Gunna Released from Prison, Plans Comeback',
    source: '@gunna',
    description: 'Atlanta rapper announces return to music after legal troubles. Gunna expresses gratitude to fans and promises new music that reflects his personal growth and experiences.',
    timeAgo: '21h ago',
  },
  {
    id: 22,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'DaBaby Collaborates with International Artists',
    source: '@dababy',
    description: 'Charlotte rapper goes global with new international features. DaBaby\'s infectious energy and versatile flow make him the perfect collaborator for artists across different markets.',
    timeAgo: '22h ago',
  },
  {
    id: 23,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Latto Freestyle Goes Platinum on TikTok',
    source: '@latto',
    description: 'Atlanta\'s Latto proves why she\'s one of the hottest rappers out. Her impromptu freestyle showcases her lyrical ability and commanding presence, racking up millions of plays.',
    timeAgo: '23h ago',
  },
  {
    id: 24,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1864642/pexels-photo-1864642.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Eminem Surprises Fans with New EP',
    source: 'Pitchfork',
    description: 'Marshall Mathers drops unexpected project without warning. The Detroit legend reminds everyone why he\'s considered one of the greatest, delivering technical prowess and raw emotion.',
    timeAgo: '1d ago',
  },
  {
    id: 25,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Nicki Minaj Breaks Streaming Record',
    source: '@nickiminaj',
    description: 'The Queen of Rap achieves another milestone on Spotify. Nicki\'s latest album surpasses 500 million streams in record time, cementing her status as a streaming powerhouse.',
    timeAgo: '1d ago',
  },
  {
    id: 26,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Polo G Documentary Chronicles His Journey',
    source: '@polo.capalot',
    description: 'Chicago rapper shares emotional story of his rise. Polo G opens up about losing friends, overcoming adversity, and using music as therapy to process his experiences.',
    timeAgo: '1d ago',
  },
  {
    id: 27,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'GloRilla Dance Moves Take Over Platform',
    source: '@glorillapimp',
    description: 'Memphis rapper\'s signature moves become viral sensation. GloRilla\'s authentic personality and infectious energy have users everywhere recreating her iconic dance routines.',
    timeAgo: '1d ago',
  },
  {
    id: 28,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Logic Announces Return to Music',
    source: 'Billboard',
    description: 'Rapper comes out of retirement with new album announcement. Logic promises a return to the sound that made him famous, addressing fan concerns and reigniting excitement.',
    timeAgo: '1d ago',
  },
  {
    id: 29,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Young Thug Trial Update: Latest Developments',
    source: '@wsj',
    description: 'New information emerges in high-profile RICO case. The Atlanta rapper\'s legal team presents compelling arguments as the hip-hop community watches closely.',
    timeAgo: '1d ago',
  },
  {
    id: 30,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Roddy Ricch Previews New Album Tracks',
    source: '@roddyricch',
    description: 'Compton rapper shares snippets of upcoming project. Roddy Ricch\'s melodic style and authentic storytelling have fans counting down the days until the official release.',
    timeAgo: '1d ago',
  },
  {
    id: 31,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Saweetie Cooking Series Goes Viral',
    source: '@saweetie',
    description: 'Bay Area rapper combines music with culinary content. Saweetie\'s unique personality shines through as she shares her famous recipes, connecting with fans in unexpected ways.',
    timeAgo: '2d ago',
  },
  {
    id: 32,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1387037/pexels-photo-1387037.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Dr. Dre Working on Final Album',
    source: 'Complex',
    description: 'Hip-hop legend hints at one last project before retirement. Dr. Dre teases collaborations with both veteran artists and new talent, promising a fitting end to his legendary career.',
    timeAgo: '2d ago',
  },
  {
    id: 33,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1035682/pexels-photo-1035682.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Offset Solo Album Tops Charts',
    source: '@offsetyrn',
    description: 'Migos member proves his solo star power. Offset\'s debut solo project showcases his versatility and growth as an artist, earning critical acclaim and commercial success.',
    timeAgo: '2d ago',
  },
  {
    id: 34,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1311518/pexels-photo-1311518.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Baby Keem & Kendrick Studio Session',
    source: '@babykeem',
    description: 'Cousins reunite for highly anticipated collaboration. Baby Keem and Kendrick Lamar\'s creative chemistry produces magic, with fans eagerly awaiting the final product.',
    timeAgo: '2d ago',
  },
  {
    id: 35,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Yeat Sound Challenge Breaks Records',
    source: '@yeat',
    description: 'Underground sensation takes TikTok by storm. Yeat\'s unique sound and aesthetic resonate with Gen Z, making him one of the platform\'s most viral artists.',
    timeAgo: '2d ago',
  },
  {
    id: 36,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Kanye West Planning New Sunday Service',
    source: 'TMZ',
    description: 'Ye announces return of his spiritual musical gatherings. Despite controversies, Kanye continues to innovate and blur lines between hip-hop, gospel, and performance art.',
    timeAgo: '2d ago',
  },
  {
    id: 37,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    thumbnail: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Lil Durk Charity Event Raises Millions',
    source: '@lildurk',
    description: 'Chicago rapper gives back to his community. Durk\'s annual event provides resources for underprivileged youth, showing the positive impact hip-hop artists can have.',
    timeAgo: '2d ago',
  },
  {
    id: 38,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    thumbnail: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'City Girls Talk Breakup and New Music',
    source: '@citygirls',
    description: 'Miami duo opens up about going separate ways. Despite the split, both JT and Yung Miami express mutual respect and hint at future solo projects.',
    timeAgo: '2d ago',
  },
  {
    id: 39,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    thumbnail: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Sexyy Red Meme Takes Over Internet',
    source: '@sexyyred',
    description: 'St. Louis rapper becomes unexpected meme queen. Sexyy Red\'s unfiltered personality and memorable moments make her one of social media\'s most entertaining figures.',
    timeAgo: '2d ago',
  },
  {
    id: 40,
    platform: 'Web',
    platformIcon: 'https://i.imgur.com/aXfHxEZ.png',
    thumbnail: 'https://images.pexels.com/photos/1864642/pexels-photo-1864642.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Hip-Hop Turns 50: Special Celebration',
    source: 'The Source',
    description: 'The culture celebrates five decades of influence. From the Bronx to worldwide phenomenon, hip-hop\'s journey is honored with special events, documentaries, and all-star performances.',
    timeAgo: '3d ago',
  },
];

const FILTERS = [
  { name: 'All', colors: ['#60a5fa', '#3b82f6'] },
  { name: 'Instagram', colors: ['#E1306C', '#C13584'] },
  { name: 'Web', colors: ['#6B7280', '#4B5563'] },
  { name: 'YouTube', colors: ['#FF0000', '#DC143C'] },
  { name: 'TikTok', colors: ['#000000', '#69C9D0'] },
];

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.replace('/(tabs)/home');
  };

  const handleFilterPress = (filter: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedFilter(filter);
  };

  const handleCopyLink = (item: any) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    Alert.alert('Link Copied', `Link to "${item.title}" has been copied to clipboard!`);
  };

  const filteredFeed = FEED_DATA.filter(item => {
    if (selectedFilter === 'All') return true;
    return item.platform === selectedFilter;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.backgroundShapes}>
        <View style={styles.shape1} />
        <View style={styles.shape2} />
        <View style={styles.shape3} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.6}
          >
            <View style={styles.backButtonInner}>
              <ArrowLeft color="#ffffff" size={18} strokeWidth={1.5} />
            </View>
          </TouchableOpacity>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.pageTitleBold}>Your </Text>
          <Text style={styles.pageTitle}>Feed</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{FEED_DATA.length}</Text>
            <Text style={styles.statLabel}>Articles</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Sources</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>24h</Text>
            <Text style={styles.statLabel}>Updated</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterBar}
          contentContainerStyle={styles.filterBarContent}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.name}
              onPress={() => handleFilterPress(filter.name)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={selectedFilter === filter.name ? filter.colors : ['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.filterButton}
              >
                <Text style={[styles.filterText, selectedFilter === filter.name && styles.filterTextActive]}>
                  {filter.name}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.feedList}>
          {filteredFeed.map((item, index) => (
            <View key={item.id} style={styles.feedCardWrapper}>
              <View style={styles.cardAccent} />
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.feedCard}
              >
                <View style={styles.cardTopSection}>
                  <View style={styles.cardHeader}>
                    <View style={styles.platformBadge}>
                      <Image
                        source={{ uri: item.platformIcon }}
                        style={styles.platformIconSmall}
                      />
                    </View>
                    <View style={styles.cardMeta}>
                      <Text style={styles.cardSource}>{item.source}</Text>
                      <Text style={styles.timeAgo}>{item.timeAgo}</Text>
                    </View>
                  </View>

                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>
                    {item.description}
                  </Text>

                  <View style={styles.cardFooter}>
                    <View style={styles.platformTag}>
                      <View style={[styles.platformDot, { backgroundColor: item.platform === 'Instagram' ? '#E1306C' : item.platform === 'YouTube' ? '#FF0000' : item.platform === 'TikTok' ? '#69C9D0' : '#6B7280' }]} />
                      <Text style={styles.platformTagText}>{item.platform}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => handleCopyLink(item)}
                      activeOpacity={0.7}
                      style={styles.copyButton}
                    >
                      <LinearGradient
                        colors={['rgba(96, 165, 250, 0.2)', 'rgba(59, 130, 246, 0.2)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.copyButtonInner}
                      >
                        <Link color="#60a5fa" size={16} strokeWidth={2} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundShapes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  shape1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(96, 165, 250, 0.03)',
  },
  shape2: {
    position: 'absolute',
    top: 200,
    left: -150,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(139, 92, 246, 0.02)',
  },
  shape3: {
    position: 'absolute',
    bottom: -100,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.03)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
  },
  backButtonInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  placeholder: {
    width: 36,
  },
  titleSection: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 36,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -1,
  },
  pageTitleBold: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 36,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  statValue: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  filterBar: {
    marginBottom: 24,
  },
  filterBarContent: {
    gap: 8,
    paddingRight: 20,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  filterText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.2,
  },
  filterTextActive: {
    color: '#ffffff',
  },
  feedList: {
    gap: 20,
  },
  feedCardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'relative',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: '#60a5fa',
  },
  feedCard: {
    padding: 16,
    gap: 16,
  },
  cardTopSection: {
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  platformBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  platformIconSmall: {
    width: 22,
    height: 22,
    borderRadius: 6,
  },
  cardMeta: {
    flex: 1,
  },
  cardSource: {
    color: '#60a5fa',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  timeAgo: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardContent: {
    gap: 12,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 19,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.5,
    lineHeight: 26,
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  platformTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  platformDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  platformTagText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
  },
  copyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  copyButtonInner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    borderRadius: 12,
  },
});
