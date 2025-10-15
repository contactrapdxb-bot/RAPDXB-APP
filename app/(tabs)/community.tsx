import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, TextInput, Animated, Dimensions, Modal, Image, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Upload, Calendar, X, Mail, MessageSquare, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '@/lib/supabase';

const { width } = Dimensions.get('window');

const PLATFORMS_EMAIL = ['Email'];
const PLATFORMS_MESSAGE = ['WhatsApp', 'SMS', 'Bottom', 'All'];

interface Post {
  id: string;
  title: string;
  caption: string;
  media_url: string;
  thumbnail_url: string;
}

export default function CommunityScreen() {
  const insets = useSafeAreaInsets();
  const [contentType, setContentType] = useState<'email' | 'message'>('email');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [mediaLink, setMediaLink] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const sliderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchPosts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchPosts().finally(() => setRefreshing(false));
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setPosts(data);
    }
  };

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/(tabs)/home');
  };

  const handleToggle = (type: 'email' | 'message') => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    Animated.spring(sliderAnim, {
      toValue: type === 'email' ? 0 : 1,
      useNativeDriver: false,
      tension: 65,
      friction: 8,
    }).start();

    setContentType(type);
    setTitle('');
    setCaption('');
    setSelectedPlatforms([]);
    setMediaLink('');
    setUploadedImage(null);
    setScheduleDate(null);
    setSelectedPosts([]);
  };

  const handleUploadFile = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      const currentDate = scheduleDate || new Date();
      currentDate.setFullYear(selectedDate.getFullYear());
      currentDate.setMonth(selectedDate.getMonth());
      currentDate.setDate(selectedDate.getDate());
      setScheduleDate(currentDate);
      if (Platform.OS === 'android') {
        setShowTimePicker(true);
      }
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const currentDate = scheduleDate || new Date();
      currentDate.setHours(selectedTime.getHours());
      currentDate.setMinutes(selectedTime.getMinutes());
      setScheduleDate(currentDate);
    }
  };

  const handleSchedulePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (!scheduleDate) {
      setScheduleDate(new Date());
    }
    setShowDatePicker(true);
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return 'Select date & time';
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  const handlePlatformToggle = (platform: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (platform === 'All') {
      const allPlatforms = ['WhatsApp', 'SMS', 'Bottom'];

      if (selectedPlatforms.length === allPlatforms.length) {
        setSelectedPlatforms([]);
      } else {
        setSelectedPlatforms(allPlatforms);
      }
    } else {
      setSelectedPlatforms(prev =>
        prev.includes(platform)
          ? prev.filter(p => p !== platform)
          : [...prev, platform]
      );
    }
  };

  const handleSelectFromPosts = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setShowPostModal(true);
  };

  const handlePostToggle = (post: Post) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (selectedPosts.find(p => p.id === post.id)) {
      setSelectedPosts(selectedPosts.filter(p => p.id !== post.id));
    } else {
      if (selectedPosts.length < 3) {
        setSelectedPosts([...selectedPosts, post]);
      }
    }
  };

  const handleConfirmSelection = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setShowPostModal(false);
  };

  const handleRemoveSelectedPost = (postId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelectedPosts(selectedPosts.filter(p => p.id !== postId));
  };

  const handleSend = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    console.log('Sending', contentType, { title, caption, selectedPlatforms, scheduleDate, selectedPosts });
  };

  const platforms = contentType === 'email' ? PLATFORMS_EMAIL : PLATFORMS_MESSAGE;

  const getPlatformColors = (platform: string) => {
    const colorMap: Record<string, string[]> = {
      'Email': ['#60a5fa', '#3b82f6'],
      'WhatsApp': ['#25D366', '#128C7E'],
      'SMS': ['#fbbf24', '#f59e0b'],
      'Bottom': ['#8b5cf6', '#7c3aed'],
      'All': ['#ec4899', '#db2777'],
    };
    return colorMap[platform] || ['#8b5cf6', '#7c3aed'];
  };

  const sliderPosition = sliderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, (width - 32) / 2 + 4],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
            colors={['#ffffff']}
          />
        }
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.6}
          >
            <View style={styles.backButtonGradient}>
              <ArrowLeft color="#ffffff" size={22} strokeWidth={2} />
            </View>
          </TouchableOpacity>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Community </Text>
          <Animated.Text style={[
            styles.pageTitleBold,
            {
              color: sliderAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#fbbf24', '#10b981'],
              }),
            },
          ]}>
            {contentType === 'email' ? 'Email' : 'Message'}
          </Animated.Text>
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.toggleBackground}>
            <Animated.View style={[styles.toggleSlider, {
              left: sliderPosition,
            }]}>
              <LinearGradient
                colors={contentType === 'email' ? ['#60a5fa', '#3b82f6'] : ['#10b981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toggleSliderInner}
              />
            </Animated.View>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => handleToggle('email')}
              activeOpacity={0.8}
            >
              <Mail color={contentType === 'email' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'} size={18} strokeWidth={3} />
              <Text style={[styles.toggleText, contentType === 'email' && styles.toggleTextActiveEmail]}>
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => handleToggle('message')}
              activeOpacity={0.8}
            >
              <MessageSquare color={contentType === 'message' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'} size={18} strokeWidth={3} />
              <Text style={[styles.toggleText, contentType === 'message' && styles.toggleTextActiveMessage]}>
                Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputSection}>
          <LinearGradient
            colors={['#a855f7', '#9333ea']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.uploadCard}
          >
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.labelDark}>Select from Posts</Text>
                <View style={styles.labelBadgeOptionalDark}>
                  <Text style={styles.labelBadgeTextOptionalDark}>Up to 3</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.uploadButton} onPress={handleSelectFromPosts}>
                <Text style={styles.uploadButtonText}>Select Posts ({selectedPosts.length}/3)</Text>
              </TouchableOpacity>
              {selectedPosts.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectedPostsScroll}>
                  <View style={styles.selectedPostsContainer}>
                    {selectedPosts.map((post) => (
                      <View key={post.id} style={styles.selectedPostCard}>
                        {post.thumbnail_url ? (
                          <Image source={{ uri: post.thumbnail_url }} style={styles.selectedPostImage} />
                        ) : (
                          <View style={styles.selectedPostImagePlaceholder}>
                            <Text style={styles.selectedPostImagePlaceholderText}>📄</Text>
                          </View>
                        )}
                        <TouchableOpacity
                          style={styles.selectedPostRemoveButton}
                          onPress={() => handleRemoveSelectedPost(post.id)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <X color="#ffffff" size={16} strokeWidth={2.5} />
                        </TouchableOpacity>
                        <Text style={styles.selectedPostTitle} numberOfLines={2}>{post.title}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              )}
            </View>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLineDark} />
              <Text style={styles.dividerTextDark}>OR</Text>
              <View style={styles.dividerLineDark} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.labelDark}>Upload Media</Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.uploadButton} onPress={handleUploadFile}>
                <Upload color="#000000" size={20} strokeWidth={2.5} />
                <Text style={styles.uploadButtonText}>Upload File</Text>
              </TouchableOpacity>
              {uploadedImage && (
                <View style={styles.uploadedImageContainer}>
                  <Image source={{ uri: uploadedImage }} style={styles.uploadedImage} />
                  <TouchableOpacity
                    style={styles.uploadedRemoveButton}
                    onPress={() => {
                      if (Platform.OS !== 'web') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                      setUploadedImage(null);
                    }}
                    activeOpacity={0.7}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <X color="#ffffff" size={18} strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['#f97316', '#ea580c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.inputCard}
          >
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.labelDark}>Header</Text>
                <View style={styles.labelBadgeOptionalDark}>
                  <Text style={styles.labelBadgeTextOptionalDark}>Optional</Text>
                </View>
              </View>
              <View style={styles.glassInputWrapperDark}>
                <TextInput
                  style={styles.inputDark}
                  placeholder="Enter header text..."
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.labelDark}>Subtext</Text>
                <View style={styles.labelBadgeOptionalDark}>
                  <Text style={styles.labelBadgeTextOptionalDark}>Optional</Text>
                </View>
              </View>
              <View style={styles.glassInputWrapperDark}>
                <TextInput
                  style={[styles.inputDark, styles.textArea]}
                  placeholder="Write your message..."
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  value={caption}
                  onChangeText={setCaption}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['#06b6d4', '#0891b2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scheduleCard}
          >
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.labelDark}>Schedule</Text>
                <View style={styles.labelBadgeOptionalDark}>
                  <Text style={styles.labelBadgeTextOptionalDark}>Optional</Text>
                </View>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.scheduleButtonDark} onPress={handleSchedulePress}>
                <Calendar color="#000000" size={18} strokeWidth={2} />
                <Text style={styles.scheduleButtonTextDark}>
                  {formatDateTime(scheduleDate)}
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {contentType === 'message' && (
            <View style={styles.platformsSection}>
              <View style={styles.platformsHeader}>
                <Text style={styles.platformsTitle}>Select Platforms</Text>
                <View style={styles.platformsBadge}>
                  <Text style={styles.platformsBadgeText}>{selectedPlatforms.length} selected</Text>
                </View>
              </View>
              <View style={styles.platformGrid}>
                {platforms.map((platform) => {
                  const allPlatforms = ['WhatsApp', 'SMS', 'Bottom'];
                  const isAllSelected = platform === 'All' && selectedPlatforms.length === allPlatforms.length;
                  const isSelected = platform === 'All' ? isAllSelected : selectedPlatforms.includes(platform);
                  const colors = getPlatformColors(platform);
                  return (
                    <TouchableOpacity
                      key={platform}
                      onPress={() => handlePlatformToggle(platform)}
                      activeOpacity={0.7}
                    >
                      {isSelected ? (
                        <LinearGradient
                          colors={colors}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.platformChip}
                        >
                          <Text style={styles.platformChipTextActive}>
                            {platform}
                          </Text>
                        </LinearGradient>
                      ) : (
                        <View style={styles.platformChipInactive}>
                          <Text style={styles.platformChipText}>
                            {platform}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.createButtonWrapper}
            onPress={handleSend}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={contentType === 'email'
                ? ['#60a5fa', '#3b82f6']
                : ['#10b981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.createButtonGradient}
            >
              <Text style={styles.createButtonText}>
                {scheduleDate ? 'Schedule' : 'Send Now'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showPostModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPostModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Posts (Max 3)</Text>
              <TouchableOpacity onPress={() => setShowPostModal(false)}>
                <X color="#000000" size={24} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.postsGrid}>
                {posts.map((post) => {
                  const isSelected = selectedPosts.find(p => p.id === post.id);
                  return (
                    <TouchableOpacity
                      key={post.id}
                      onPress={() => handlePostToggle(post)}
                      activeOpacity={0.8}
                      disabled={!isSelected && selectedPosts.length >= 3}
                    >
                      <View style={[
                        styles.postCard,
                        isSelected && styles.postCardSelected,
                        !isSelected && selectedPosts.length >= 3 && styles.postCardDisabled
                      ]}>
                        {post.thumbnail_url ? (
                          <Image source={{ uri: post.thumbnail_url }} style={styles.postCardImage} />
                        ) : (
                          <View style={styles.postCardImagePlaceholder}>
                            <Text style={styles.postCardImagePlaceholderText}>📄</Text>
                          </View>
                        )}
                        {isSelected && (
                          <View style={styles.postCardCheck}>
                            <Check color="#ffffff" size={20} strokeWidth={3} />
                          </View>
                        )}
                        <View style={styles.postCardContent}>
                          <Text style={styles.postCardTitle} numberOfLines={2}>{post.title}</Text>
                          <Text style={styles.postCardCaption} numberOfLines={1}>{post.caption}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleConfirmSelection}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#8b5cf6', '#7c3aed']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modalConfirmButtonInner}
                >
                  <Text style={styles.modalConfirmButtonText}>Confirm ({selectedPosts.length})</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {Platform.OS === 'ios' && showDatePicker && (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.dateModalContainer}>
            <View style={styles.dateModalContent}>
              <View style={styles.dateModalHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.dateModalTitle}>Select Date & Time</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.modalDoneText}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.pickersContainer}>
                <DateTimePicker
                  value={scheduleDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  textColor="#000000"
                  style={styles.datePicker}
                />
                <DateTimePicker
                  value={scheduleDate || new Date()}
                  mode="time"
                  display="spinner"
                  onChange={handleTimeChange}
                  textColor="#000000"
                  style={styles.timePicker}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={scheduleDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {Platform.OS === 'android' && showTimePicker && (
        <DateTimePicker
          value={scheduleDate || new Date()}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
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
  backButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  placeholder: {
    width: 48,
  },
  titleSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
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
    color: '#ffffff',
    letterSpacing: -1.2,
    lineHeight: 50,
  },
  toggleContainer: {
    marginBottom: 24,
  },
  toggleBackground: {
    flexDirection: 'row',
    borderRadius: 24,
    padding: 4,
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  toggleSlider: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: '47.5%',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  toggleSliderInner: {
    flex: 1,
    borderRadius: 20,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  toggleText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  toggleTextActiveEmail: {
    color: '#ffffff',
    fontWeight: '1400',
  },
  toggleTextActiveMessage: {
    color: '#ffffff',
    fontWeight: '1400',
  },
  inputSection: {
    gap: 20,
  },
  inputCard: {
    borderRadius: 32,
    padding: 24,
    gap: 24,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  uploadCard: {
    borderRadius: 32,
    padding: 24,
    gap: 20,
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  scheduleCard: {
    borderRadius: 32,
    padding: 24,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  inputGroup: {
    gap: 14,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  labelDark: {
    color: '#000000',
    fontSize: 17,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  labelBadgeOptionalDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  labelBadgeTextOptionalDark: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 11,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  glassInputWrapperDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  inputDark: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    minHeight: 140,
    paddingTop: 18,
  },
  scheduleButtonDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  scheduleButtonTextDark: {
    color: 'rgba(0, 0, 0, 0.8)',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 4,
  },
  dividerLineDark: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  dividerTextDark: {
    color: '#000000',
    fontSize: 13,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 2,
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  uploadedImageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  uploadedRemoveButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 6,
  },
  selectedPostsScroll: {
    marginTop: 8,
  },
  selectedPostsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 16,
  },
  selectedPostCard: {
    width: 120,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  selectedPostImage: {
    width: '100%',
    height: 80,
  },
  selectedPostImagePlaceholder: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPostImagePlaceholderText: {
    fontSize: 32,
  },
  selectedPostTitle: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Archivo-Bold',
    padding: 8,
    letterSpacing: -0.2,
  },
  selectedPostRemoveButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 4,
  },
  platformsSection: {
    gap: 16,
  },
  platformsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  platformsTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  platformsBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  platformsBadgeText: {
    color: '#10b981',
    fontSize: 12,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 0.5,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  platformChip: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  platformChipInactive: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  platformChipText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  platformChipTextActive: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  createButtonWrapper: {
    marginTop: 12,
  },
  createButtonGradient: {
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  createButtonText: {
    color: '#000000',
    fontSize: 19,
    fontFamily: 'Archivo-Bold',
    fontWeight: '1400',
    letterSpacing: -0.4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.5,
  },
  modalScroll: {
    flex: 1,
  },
  postsGrid: {
    padding: 16,
    gap: 16,
  },
  postCard: {
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
    position: 'relative',
  },
  postCardSelected: {
    borderColor: '#8b5cf6',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  postCardDisabled: {
    opacity: 0.4,
  },
  postCardImage: {
    width: '100%',
    height: 180,
  },
  postCardImagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCardImagePlaceholderText: {
    fontSize: 64,
  },
  postCardCheck: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCardContent: {
    padding: 16,
    gap: 4,
  },
  postCardTitle: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  postCardCaption: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalConfirmButton: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  modalConfirmButtonInner: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  dateModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dateModalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 520,
  },
  pickersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalCancelText: {
    color: '#000000',
    fontSize: 17,
    fontFamily: 'Inter-Regular',
  },
  dateModalTitle: {
    color: '#000000',
    fontSize: 17,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  modalDoneText: {
    color: '#3b82f6',
    fontSize: 17,
    fontFamily: 'Archivo-Bold',
  },
  datePicker: {
    flex: 1,
    width: '100%',
  },
  timePicker: {
    flex: 1,
    width: '100%',
  },
});
