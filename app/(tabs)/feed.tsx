import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const notifications = [
  {
    id: 1,
    title: 'New follower',
    message: '@alexchen started following you',
    icon: 'check',
    iconBg: '#4CAF50',
  },
  {
    id: 2,
    title: 'Comment on your post',
    message: 'Someone replied to your post',
    icon: 'warning',
    iconBg: '#FF9800',
  },
  {
    id: 3,
    title: 'New like',
    message: 'Your post received a new like',
    icon: 'info',
    iconBg: '#2196F3',
  },
  {
    id: 4,
    title: 'Connection error',
    message: 'Failed to sync your data',
    icon: 'error',
    iconBg: '#F44336',
  },
];

export default function FeedScreen() {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.replace('/(tabs)/home');
  };

  const renderIcon = (type: string, color: string) => {
    switch (type) {
      case 'check':
        return <CheckCircle color="#ffffff" size={28} strokeWidth={2.5} />;
      case 'warning':
        return <AlertTriangle color="#ffffff" size={28} strokeWidth={2.5} />;
      case 'info':
        return <AlertCircle color="#ffffff" size={28} strokeWidth={2.5} />;
      case 'error':
        return <AlertCircle color="#ffffff" size={28} strokeWidth={2.5} />;
      default:
        return <CheckCircle color="#ffffff" size={28} strokeWidth={2.5} />;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.6}
        >
          <ArrowLeft color="#ffffff" size={24} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <View style={[styles.iconContainer, { backgroundColor: notification.iconBg }]}>
              {renderIcon(notification.icon, notification.iconBg)}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} activeOpacity={0.6}>
              <X color="#9CA3AF" size={20} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.5,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    fontSize: 18,
    fontFamily: 'Archivo-SemiBold',
    color: '#1F2937',
    letterSpacing: -0.3,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    letterSpacing: -0.2,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
