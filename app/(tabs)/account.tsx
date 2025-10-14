import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, User, Bell, Lock, CreditCard, LogOut, Check, Plus } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', connected: true, icon: 'https://i.imgur.com/vkcuEzE.png', color: ['#E1306C', '#C13584'] },
  { id: 'tiktok', name: 'TikTok', connected: true, icon: 'https://i.imgur.com/K2FKVUP.png', color: ['#000000', '#333333'] },
  { id: 'youtube', name: 'YouTube', connected: true, icon: 'https://i.imgur.com/8H35ptZ.png', color: ['#FF0000', '#DC143C'] },
  { id: 'snapchat', name: 'Snapchat', connected: false, icon: 'https://i.imgur.com/XF3FRka.png', color: ['#FFFC00', '#FFA500'] },
  { id: 'twitter', name: 'Twitter', connected: false, icon: 'https://i.imgur.com/fPOjKNr.png', color: ['#1DA1F2', '#1a8cd8'] },
  { id: 'facebook', name: 'Facebook', connected: false, icon: 'https://i.imgur.com/zfY36en.png', color: ['#1877F2', '#0a5fd1'] },
];

const SETTINGS_OPTIONS = [
  { id: 'edit', label: 'Edit Profile', icon: User, color: ['#8b5cf6', '#7c3aed'] },
  { id: 'notifications', label: 'Notification Preferences', icon: Bell, color: ['#60a5fa', '#3b82f6'] },
  { id: 'privacy', label: 'Privacy Settings', icon: Lock, color: ['#fbbf24', '#f59e0b'] },
  { id: 'subscription', label: 'Subscription & Plan', icon: CreditCard, color: ['#a3e635', '#84cc16'] },
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.replace('/(tabs)/home');
  };

  const handleConnect = (platformId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    console.log('Connect platform:', platformId);
  };

  const handleSettingPress = (settingId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    console.log('Open setting:', settingId);
  };

  const handleSignOut = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    console.log('Sign out');
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
          <Text style={styles.pageTitle}>Your </Text>
          <Text style={styles.pageTitleBold}>Account</Text>
        </View>

        <LinearGradient
          colors={['#8b5cf6', '#7c3aed']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.profileContent}>
            <Image
              source={{ uri: 'https://i.imgur.com/vhILBC1.png' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>RAPDXB</Text>
              <Image
                source={{ uri: 'https://i.imgur.com/5rF4a1S.png' }}
                style={styles.verifiedBadge}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>56.1K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>903K</Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statLabel}>Platforms</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          <View style={styles.platformsGrid}>
            {SOCIAL_PLATFORMS.map((platform) => (
              <View key={platform.id} style={styles.platformItem}>
                {platform.connected ? (
                  <LinearGradient
                    colors={platform.color}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.platformCard}
                  >
                    <View style={styles.platformHeader}>
                      <Image
                        source={{ uri: platform.icon }}
                        style={styles.platformIcon}
                        resizeMode="contain"
                      />
                      <View style={styles.connectedBadge}>
                        <Check color="#ffffff" size={12} strokeWidth={3} />
                      </View>
                    </View>
                    <Text style={styles.platformName}>{platform.name}</Text>
                    <View style={styles.connectedStatus}>
                      <Text style={styles.connectedText}>Connected</Text>
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={styles.platformCardInactive}>
                    <View style={styles.platformHeader}>
                      <Image
                        source={{ uri: platform.icon }}
                        style={styles.platformIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.platformNameInactive}>{platform.name}</Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleConnect(platform.id)}
                      style={styles.connectButton}
                    >
                      <Plus color="rgba(255, 255, 255, 0.6)" size={14} strokeWidth={2} />
                      <Text style={styles.connectText}>Connect</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsGrid}>
            {SETTINGS_OPTIONS.map((setting) => (
              <TouchableOpacity
                key={setting.id}
                activeOpacity={0.7}
                onPress={() => handleSettingPress(setting.id)}
              >
                <LinearGradient
                  colors={setting.color}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.settingCard}
                >
                  <View style={styles.settingIconWrapper}>
                    <setting.icon color="#ffffff" size={20} strokeWidth={2} />
                  </View>
                  <Text style={styles.settingLabel}>{setting.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSignOut}
          style={styles.signOutWrapper}
        >
          <LinearGradient
            colors={['#fb923c', '#f97316']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.signOutButton}
          >
            <LogOut color="#ffffff" size={20} strokeWidth={2} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  backButtonInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
  },
  placeholder: {
    width: 48,
  },
  titleSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 44,
    fontFamily: 'Inter-Thin',
    color: '#ffffff',
    letterSpacing: -1.2,
    lineHeight: 50,
  },
  pageTitleBold: {
    fontSize: 44,
    fontFamily: 'Archivo-Bold',
    color: '#8b5cf6',
    letterSpacing: -1.2,
    lineHeight: 50,
  },
  profileCard: {
    borderRadius: 38,
    padding: 24,
    gap: 20,
    marginBottom: 20,
  },
  profileContent: {
    alignItems: 'center',
    gap: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileName: {
    fontSize: 28,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  verifiedBadge: {
    width: 24,
    height: 24,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#ffffff',
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  section: {
    marginTop: 8,
    marginBottom: 20,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 19.5,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  platformItem: {
    width: '48.5%',
  },
  platformCard: {
    borderRadius: 24,
    padding: 16,
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  platformCardInactive: {
    borderRadius: 24,
    padding: 16,
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  platformIcon: {
    width: 32,
    height: 32,
  },
  connectedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformName: {
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  platformNameInactive: {
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: -0.3,
  },
  connectedStatus: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  connectedText: {
    fontSize: 11,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  connectButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  connectText: {
    fontSize: 12,
    fontFamily: 'Archivo-Bold',
    color: 'rgba(255, 255, 255, 0.6)',
    letterSpacing: -0.2,
  },
  settingsGrid: {
    gap: 10,
  },
  settingCard: {
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  settingIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    letterSpacing: -0.3,
    flex: 1,
  },
  signOutWrapper: {
    marginTop: 10,
    marginBottom: 20,
  },
  signOutButton: {
    borderRadius: 38,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  signOutText: {
    fontSize: 18,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
});
