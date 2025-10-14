import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, MessageCircle, Send, Users, Plus, Mail, MessageSquare } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useRef } from 'react';

const QUICK_ACTIONS = [
  { id: 1, label: 'New Message', icon: MessageCircle },
  { id: 2, label: 'Create Blast', icon: Send },
  { id: 3, label: 'Start Chat', icon: MessageSquare },
  { id: 4, label: 'Fan Groups', icon: Users },
];

const COMMUNITY_DATA = [
  {
    id: 1,
    title: 'Dubai Creators',
    type: 'WhatsApp Group',
    lastMessage: 'See you at the event!',
    time: '3m ago',
    avatar: '👥',
    color: '#10b981',
    unread: 5,
  },
  {
    id: 2,
    title: 'Weekly Newsletter',
    type: 'Email Blast',
    lastMessage: 'New content drop this Friday...',
    time: '1h ago',
    avatar: '📧',
    color: '#3b82f6',
    unread: 0,
  },
  {
    id: 3,
    title: 'Premium Members',
    type: 'Fan Chat',
    lastMessage: 'Thanks for the exclusive content!',
    time: '2h ago',
    avatar: '⭐',
    color: '#fbbf24',
    unread: 12,
  },
  {
    id: 4,
    title: 'Collaboration Requests',
    type: 'Direct Message',
    lastMessage: 'Hey, would love to work together',
    time: '4h ago',
    avatar: '🤝',
    color: '#8b5cf6',
    unread: 3,
  },
  {
    id: 5,
    title: 'Event Updates',
    type: 'Telegram Channel',
    lastMessage: 'Next meetup scheduled for...',
    time: '5h ago',
    avatar: '📅',
    color: '#06b6d4',
    unread: 0,
  },
  {
    id: 6,
    title: 'Fan Feedback',
    type: 'Survey Responses',
    lastMessage: '47 new responses received',
    time: '6h ago',
    avatar: '📊',
    color: '#f59e0b',
    unread: 47,
  },
  {
    id: 7,
    title: 'Music Producers',
    type: 'Discord Server',
    lastMessage: 'Check out this new beat!',
    time: '8h ago',
    avatar: '🎵',
    color: '#ec4899',
    unread: 0,
  },
  {
    id: 8,
    title: 'Brand Partnerships',
    type: 'Business Chat',
    lastMessage: 'Contract ready for review',
    time: '1d ago',
    avatar: '💼',
    color: '#14b8a6',
    unread: 1,
  },
];

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const fabScale = useRef(new Animated.Value(1)).current;

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/(tabs)/');
  };

  const handleQuickAction = (actionId: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleCardPress = (id: number) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleCreateNew = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    Animated.sequence([
      Animated.timing(fabScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fabScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

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
          <Text style={styles.pageTitleBold}>Community</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{COMMUNITY_DATA.length}</Text>
            <Text style={styles.statLabel}>Channels</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{COMMUNITY_DATA.filter(item => item.unread > 0).length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{COMMUNITY_DATA.reduce((acc, item) => acc + item.unread, 0)}</Text>
            <Text style={styles.statLabel}>Unread</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickActionsBar}
          contentContainerStyle={styles.quickActionsContent}
        >
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              onPress={() => handleQuickAction(action.id)}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['rgba(96, 165, 250, 0.15)', 'rgba(59, 130, 246, 0.05)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionButton}
              >
                <action.icon color="#60a5fa" size={18} strokeWidth={2} />
                <Text style={styles.quickActionText}>{action.label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.communityList}>
          {COMMUNITY_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleCardPress(item.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.communityCard}
              >
                <View style={styles.cardLeft}>
                  <View style={[styles.avatar, { backgroundColor: `${item.color}20` }]}>
                    <Text style={styles.avatarEmoji}>{item.avatar}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardType}>{item.type}</Text>
                    <Text style={styles.cardMessage} numberOfLines={1}>
                      {item.lastMessage}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardRight}>
                  <Text style={styles.cardTime}>{item.time}</Text>
                  {item.unread > 0 && (
                    <View style={[styles.unreadBadge, { backgroundColor: item.color }]}>
                      <Text style={styles.unreadText}>{item.unread}</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.viewButton}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['rgba(96, 165, 250, 0.2)', 'rgba(59, 130, 246, 0.1)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.viewButtonInner}
                    >
                      <Text style={styles.viewButtonText}>View</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Animated.View style={[styles.fabContainer, { transform: [{ scale: fabScale }] }]}>
        <TouchableOpacity
          onPress={handleCreateNew}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#60a5fa', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fab}
          >
            <Plus color="#ffffff" size={28} strokeWidth={2.5} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 24,
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
    marginBottom: 24,
  },
  pageTitleBold: {
    color: '#ffffff',
    fontSize: 34,
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
    borderRadius: 16,
    padding: 16,
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
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    opacity: 0.5,
  },
  quickActionsBar: {
    marginBottom: 24,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  quickActionsContent: {
    paddingRight: 20,
    gap: 12,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.2)',
  },
  quickActionText: {
    color: '#60a5fa',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  communityList: {
    gap: 16,
    marginBottom: 20,
  },
  communityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardLeft: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  cardType: {
    color: '#60a5fa',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  cardMessage: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    opacity: 0.6,
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 8,
    marginLeft: 12,
  },
  cardTime: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    opacity: 0.4,
  },
  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Inter-Bold',
  },
  viewButton: {
    marginTop: 4,
  },
  viewButtonInner: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  viewButtonText: {
    color: '#60a5fa',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
