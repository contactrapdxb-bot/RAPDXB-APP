import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, TextInput, Animated, Dimensions, RefreshControl, Image, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Upload, Link, Calendar, X, Image as ImageIcon, Video, Check } from 'lucide-react-native';
import Svg, { Circle, Defs, RadialGradient as SvgRadialGradient, Stop } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const PLATFORMS_POST = ['Instagram', 'Facebook', 'Twitter', 'All'];
const PLATFORMS_REEL = ['Instagram Reels', 'YouTube Shorts', 'TikTok', 'Facebook Reels', 'Snapchat', 'All'];

export default function PostScreen() {
  const insets = useSafeAreaInsets();
  const [contentType, setContentType] = useState<'post' | 'reel'>('post');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [mediaLink, setMediaLink] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;
  const sliderAnim = useRef(new Animated.Value(0)).current;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(floatAnim1, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(floatAnim2, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(floatAnim3, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.replace('/(tabs)/home');
  };

  const handleToggle = (type: 'post' | 'reel') => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    Animated.spring(sliderAnim, {
      toValue: type === 'post' ? 0 : 1,
      useNativeDriver: false,
      tension: 65,
      friction: 8,
    }).start();

    setContentType(type);
    setTitle('');
    setCaption('');
    setSelectedPlatforms([]);
    setTags([]);
    setTagInput('');
    setMediaLink('');
    setUploadedImage(null);
    setScheduleDate(null);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 3) {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
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
      mediaTypes: contentType === 'post' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.All,
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

  const handleRemoveTag = (tagToRemove: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handlePlatformToggle = (platform: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (platform === 'All') {
      const allPlatforms = contentType === 'post'
        ? ['Instagram', 'Facebook', 'Twitter']
        : ['Instagram Reels', 'YouTube Shorts', 'TikTok', 'Facebook Reels', 'Snapchat'];

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

  const handleCreate = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    console.log('Creating', contentType, { title, caption, selectedPlatforms, scheduleDate, tags, mediaLink });
  };

  const platforms = contentType === 'post' ? PLATFORMS_POST : PLATFORMS_REEL;

  const float1Y = floatAnim1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -15, 0],
  });

  const float2Y = floatAnim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -20, 0],
  });

  const float3Y = floatAnim3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -10, 0],
  });

  const getPlatformColors = (platform: string) => {
    const colorMap: Record<string, string[]> = {
      'Instagram': ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888'],
      'Instagram Reels': ['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888'],
      'Facebook': ['#1877F2', '#0a5fd1'],
      'Facebook Reels': ['#1877F2', '#0a5fd1'],
      'Twitter': ['#1DA1F2', '#1a8cd8'],
      'YouTube Shorts': ['#FF0000', '#DC143C'],
      'TikTok': ['#FF0050', '#00F2EA'],
      'Snapchat': ['#FFFC00', '#FFA500'],
      'All': ['#8b5cf6', '#7c3aed'],
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
          <Text style={styles.pageTitle}>Create </Text>
          <Animated.Text style={[
            styles.pageTitleBold,
            {
              color: sliderAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#60a5fa', '#fbbf24'],
              }),
            },
          ]}>
            {contentType === 'post' ? 'Post' : 'Reel'}
          </Animated.Text>
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.toggleBackground}>
            <Animated.View style={[styles.toggleSlider, {
              left: sliderPosition,
            }]}>
              <LinearGradient
                colors={contentType === 'post' ? ['#60a5fa', '#3b82f6'] : ['#fbbf24', '#f59e0b']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toggleSliderInner}
              />
            </Animated.View>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => handleToggle('post')}
              activeOpacity={0.8}
            >
              <ImageIcon color={contentType === 'post' ? '#fbbf24' : 'rgba(0, 0, 0, 0.4)'} size={18} strokeWidth={3} />
              <Text style={[styles.toggleText, contentType === 'post' && styles.toggleTextActivePost]}>
                Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => handleToggle('reel')}
              activeOpacity={0.8}
            >
              <Video color={contentType === 'reel' ? '#60a5fa' : 'rgba(0, 0, 0, 0.4)'} size={18} strokeWidth={3} />
              <Text style={[styles.toggleText, contentType === 'reel' && styles.toggleTextActiveReel]}>
                Reel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputSection}>
          <LinearGradient
            colors={['#60a5fa', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.inputCard}
          >
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.labelDark}>Title</Text>
                <View style={styles.labelBadgeDark}>
                  <Text style={styles.labelBadgeTextDark}>Required</Text>
                </View>
              </View>
              <View style={styles.glassInputWrapperDark}>
                <TextInput
                  style={styles.inputDark}
                  placeholder="Enter title..."
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.labelDark}>Caption</Text>
                <View style={styles.labelBadgeOptionalDark}>
                  <Text style={styles.labelBadgeTextOptionalDark}>Optional</Text>
                </View>
              </View>
              <View style={styles.glassInputWrapperDark}>
                <TextInput
                  style={[styles.inputDark, styles.textArea]}
                  placeholder="Write your caption..."
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
            colors={['#fbbf24', '#f59e0b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.uploadCard}
          >
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.labelDark}>Upload Media</Text>
                <View style={styles.labelBadgeDark}>
                  <Text style={styles.labelBadgeTextDark}>Required</Text>
                </View>
              </View>
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

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLineDark} />
              <Text style={styles.dividerTextDark}>OR</Text>
              <View style={styles.dividerLineDark} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.labelDark}>Paste Media Link</Text>
              <View style={styles.glassInputWrapperDark}>
                <TextInput
                  style={styles.inputDark}
                  placeholder="https://..."
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  value={mediaLink}
                  onChangeText={setMediaLink}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['#a3e635', '#84cc16']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tagsCard}
          >
            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.labelDark}>Tags</Text>
                <View style={styles.labelBadgeOptionalDark}>
                  <Text style={styles.labelBadgeTextOptionalDark}>Optional</Text>
                </View>
              </View>
              <View style={styles.tagInputContainer}>
                <View style={styles.glassTagInputDark}>
                  <Text style={styles.atSymbol}>@</Text>
                  <TextInput
                    style={styles.tagInputFieldDark}
                    placeholder="Add a tag..."
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    value={tagInput}
                    onChangeText={setTagInput}
                    onSubmitEditing={handleAddTag}
                    returnKeyType="done"
                    editable={tags.length < 3}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleAddTag}
                  activeOpacity={0.7}
                  style={[styles.addTagButtonDark, tags.length >= 3 && styles.addTagButtonDisabled]}
                  disabled={tags.length >= 3}
                >
                  <Text style={styles.addTagButtonTextDark}>Add</Text>
                </TouchableOpacity>
              </View>
              {tags.length > 0 && (
                <View style={styles.addedTagsContainer}>
                  {tags.map((tag) => (
                    <View key={tag} style={styles.addedTag}>
                      <View style={styles.addedTagLeft}>
                        <Check color="#000000" size={16} strokeWidth={3} />
                        <Text style={styles.addedTagText}>@{tag}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleRemoveTag(tag)}
                        activeOpacity={0.7}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <X color="#000000" size={16} strokeWidth={2.5} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['#fb923c', '#f97316']}
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

          <View style={styles.platformsSection}>
            <View style={styles.platformsHeader}>
              <Text style={styles.platformsTitle}>Select Platforms</Text>
              <View style={styles.platformsBadge}>
                <Text style={styles.platformsBadgeText}>{selectedPlatforms.length} selected</Text>
              </View>
            </View>
            <View style={styles.platformGrid}>
              {platforms.map((platform) => {
                const allPlatforms = contentType === 'post'
                  ? ['Instagram', 'Facebook', 'Twitter']
                  : ['Instagram Reels', 'YouTube Shorts', 'TikTok', 'Facebook Reels', 'Snapchat'];
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

          <TouchableOpacity
            style={[
              styles.createButtonWrapper,
              !title && styles.createButtonDisabled,
            ]}
            onPress={handleCreate}
            activeOpacity={0.8}
            disabled={!title}
          >
            <LinearGradient
              colors={contentType === 'post'
                ? ['#60a5fa', '#3b82f6']
                : ['#fbbf24', '#f59e0b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.createButtonGradient}
            >
              <Text style={styles.createButtonText}>
                {contentType === 'post' ? 'Create Post' : 'Create Reel'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {Platform.OS === 'ios' && showDatePicker && (
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Select Date & Time</Text>
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
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  toggleTextActivePost: {
    color: '#fbbf24',
    fontWeight: '1400',
  },
  toggleTextActiveReel: {
    color: '#60a5fa',
    fontWeight: '1400',
  },
  inputSection: {
    gap: 20,
  },
  inputCard: {
    borderRadius: 32,
    padding: 24,
    gap: 24,
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  uploadCard: {
    borderRadius: 32,
    padding: 24,
    gap: 20,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  tagsCard: {
    borderRadius: 32,
    padding: 24,
    shadowColor: '#a3e635',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  scheduleCard: {
    borderRadius: 32,
    padding: 24,
    shadowColor: '#fb923c',
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
  label: {
    color: '#ffffff',
    fontSize: 17,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  labelBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  labelBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  labelBadgeOptional: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  labelBadgeTextOptional: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  glassInputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    minHeight: 140,
    paddingTop: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: '#ffffff',
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
  labelDark: {
    color: '#000000',
    fontSize: 17,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  labelBadgeDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  labelBadgeTextDark: {
    color: '#000000',
    fontSize: 11,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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
  glassTagInputDark: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  atSymbol: {
    paddingLeft: 20,
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
  },
  tagInputFieldDark: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 18,
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  addTagButtonDisabled: {
    opacity: 0.5,
  },
  addedTagsContainer: {
    gap: 12,
  },
  addedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addedTagLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addedTagText: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  addTagButtonDark: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  addTagButtonTextDark: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  tagInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  glassTagInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tagInputField: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  addTagButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addTagButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  tagText: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  scheduleButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scheduleButtonText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
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
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.4)',
  },
  platformsBadgeText: {
    color: '#60a5fa',
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
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
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
  createButtonDisabled: {
    opacity: 0.5,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
  },
  pickersContainer: {
    flex: 1,
  },
  modalHeader: {
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
  modalTitle: {
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
  createButtonText: {
    color: '#000000',
    fontSize: 19,
    fontFamily: 'Archivo-Bold',
    fontWeight: '1400',
    letterSpacing: -0.4,
  },
});
