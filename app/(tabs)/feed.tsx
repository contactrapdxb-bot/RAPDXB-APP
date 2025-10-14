import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Clock, Calendar } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

const FEED_DATA = [
  {
    id: 1,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    platformColor: ['#E1306C', '#C13584'],
    thumbnail: 'https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Summer Collection Launch 2024',
    source: '@fashionbrand',
    description: 'Discover our latest summer collection with exclusive designs and limited edition pieces.',
    timeAgo: '2h ago',
    type: 'Image',
  },
  {
    id: 2,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    platformColor: ['#FF0000', '#DC143C'],
    thumbnail: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Top 10 Marketing Strategies for 2024',
    source: '@marketingpro',
    description: 'Learn the most effective marketing strategies to grow your business this year.',
    timeAgo: '4h ago',
    type: 'Video',
  },
  {
    id: 3,
    platform: 'TikTok',
    platformIcon: 'https://i.imgur.com/K2FKVUP.png',
    platformColor: ['#000000', '#333333'],
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Quick Fitness Tips You Need',
    source: '@fitnesscoach',
    description: 'Simple exercises you can do at home to stay fit and healthy.',
    timeAgo: '6h ago',
    type: 'Video',
  },
  {
    id: 4,
    platform: 'Instagram',
    platformIcon: 'https://i.imgur.com/vkcuEzE.png',
    platformColor: ['#E1306C', '#C13584'],
    thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Behind the Scenes: Photo Shoot',
    source: '@photographylife',
    description: 'Take a look behind the scenes of our latest professional photo shoot.',
    timeAgo: '8h ago',
    type: 'Image',
  },
  {
    id: 5,
    platform: 'YouTube',
    platformIcon: 'https://i.imgur.com/8H35ptZ.png',
    platformColor: ['#FF0000', '#DC143C'],
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Cooking Made Easy: 5 Recipes',
    source: '@chefcorner',
    description: 'Master these 5 easy recipes that anyone can make at home.',
    timeAgo: '12h ago',
    type: 'Video',
  },
];

const FILTERS = ['All', 'Instagram', 'YouTube', 'TikTok', 'Video', 'Image'];

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [bookModalVisible, setBookModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

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

  const handleBookPress = (post: any) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setSelectedPost(post);
    setBookModalVisible(true);
  };

  const handleSchedule = (option: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setBookModalVisible(false);
    console.log('Scheduled:', option, selectedPost);
  };

  const filteredFeed = FEED_DATA.filter(item => {
    if (selectedFilter === 'All') return true;
    return item.platform === selectedFilter || item.type === selectedFilter;
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterBar}
          contentContainerStyle={styles.filterBarContent}
        >
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => handleFilterPress(filter)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={selectedFilter === filter ? ['#60a5fa', '#3b82f6'] : ['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.03)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.filterButton}
              >
                <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
                  {filter}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.feedList}>
          {filteredFeed.map((item) => (
            <View key={item.id} style={styles.feedCardWrapper}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.02)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.feedCard}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.platformBadge}>
                    <Image
                      source={{ uri: item.platformIcon }}
                      style={styles.platformIconSmall}
                    />
                  </View>
                  <Text style={styles.timeAgo}>{item.timeAgo}</Text>
                </View>

                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSource}>{item.source}</Text>
                  <Text style={styles.cardDescription} numberOfLines={2}>
                    {item.description}
                  </Text>

                  <TouchableOpacity
                    onPress={() => handleBookPress(item)}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['rgba(96, 165, 250, 0.15)', 'rgba(59, 130, 246, 0.15)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.bookButton}
                    >
                      <Calendar color="#60a5fa" size={16} strokeWidth={2} />
                      <Text style={styles.bookButtonText}>Book</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={bookModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBookModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['rgba(20, 20, 20, 0.98)', 'rgba(10, 10, 10, 0.98)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalGradient}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Schedule Post</Text>
                <TouchableOpacity
                  onPress={() => setBookModalVisible(false)}
                  style={styles.modalClose}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              {selectedPost && (
                <View style={styles.modalPostPreview}>
                  <Image
                    source={{ uri: selectedPost.thumbnail }}
                    style={styles.modalThumbnail}
                  />
                  <Text style={styles.modalPostTitle}>{selectedPost.title}</Text>
                </View>
              )}

              <View style={styles.modalOptions}>
                <TouchableOpacity
                  onPress={() => handleSchedule('now')}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={['rgba(96, 165, 250, 0.15)', 'rgba(59, 130, 246, 0.15)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modalOption}
                  >
                    <Clock color="#60a5fa" size={20} strokeWidth={2} />
                    <Text style={styles.modalOptionText}>Post Now</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSchedule('schedule')}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={['rgba(96, 165, 250, 0.15)', 'rgba(59, 130, 246, 0.15)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modalOption}
                  >
                    <Calendar color="#60a5fa" size={20} strokeWidth={2} />
                    <Text style={styles.modalOptionText}>Schedule for Later</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSchedule('edit')}
                  activeOpacity={0.7}
                >
                  <LinearGradient
                    colors={['rgba(96, 165, 250, 0.15)', 'rgba(59, 130, 246, 0.15)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.modalOption}
                  >
                    <Text style={styles.modalOptionText}>Edit & Post</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    marginBottom: 24,
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
    gap: 16,
  },
  feedCardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  feedCard: {
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  platformBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  platformIconSmall: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  timeAgo: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardContent: {
    gap: 8,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  cardSource: {
    color: '#60a5fa',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.2,
    lineHeight: 20,
    marginBottom: 4,
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.2)',
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#60a5fa',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  modalGradient: {
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.5,
  },
  modalClose: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 24,
    fontFamily: 'Archivo-Bold',
  },
  modalPostPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  modalThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  modalPostTitle: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.2,
  },
  modalOptions: {
    gap: 12,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.2)',
  },
  modalOptionText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
});
