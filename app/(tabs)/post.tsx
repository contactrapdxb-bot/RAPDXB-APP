import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, TextInput, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Upload, Link, Calendar, X, Image as ImageIcon, Video, Sparkles } from 'lucide-react-native';
import Svg, { Path, Circle, Defs, Pattern, Rect, Line, RadialGradient as SvgRadialGradient, Stop } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useState, useRef, useEffect } from 'react';

const PLATFORMS_POST = ['Instagram', 'Facebook', 'Twitter', 'All'];
const PLATFORMS_REEL = ['Instagram Reels', 'YouTube Shorts', 'TikTok', 'Facebook Reels', 'Snapchat', 'All'];

export default function PostScreen() {
  const insets = useSafeAreaInsets();
  const [contentType, setContentType] = useState<'post' | 'reel'>('post');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [mediaLink, setMediaLink] = useState('');

  const slideAnim = useRef(new Animated.Value(0)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim1 = useRef(new Animated.Value(0)).current;
  const floatAnim2 = useRef(new Animated.Value(0)).current;
  const floatAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: contentType === 'post' ? 0 : 1,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [contentType]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

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
    setContentType(type);
    setTitle('');
    setCaption('');
    setSelectedPlatforms([]);
    setTags([]);
    setTagInput('');
    setMediaLink('');
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      if (Platform.OS !== 'web') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
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

  const slideTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 138],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

  const sparkleRotate = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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
      'YouTube Shorts': ['#FF0000', '#cc0000'],
      'TikTok': ['#000000', '#25F4EE'],
      'Snapchat': ['#FFFC00', '#FFA500'],
      'All': ['#8b5cf6', '#7c3aed'],
    };
    return colorMap[platform] || ['#8b5cf6', '#7c3aed'];
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <Animated.View style={[styles.floatingOrb, styles.orb1, { transform: [{ translateY: float1Y }] }]}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          <Defs>
            <SvgRadialGradient id="orbGlow1">
              <Stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </SvgRadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="50" fill="url(#orbGlow1)" />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.floatingOrb, styles.orb2, { transform: [{ translateY: float2Y }] }]}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          <Defs>
            <SvgRadialGradient id="orbGlow2">
              <Stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </SvgRadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="50" fill="url(#orbGlow2)" />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.floatingOrb, styles.orb3, { transform: [{ translateY: float3Y }] }]}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          <Defs>
            <SvgRadialGradient id="orbGlow3">
              <Stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </SvgRadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="50" fill="url(#orbGlow3)" />
        </Svg>
      </Animated.View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.6}
          >
            <LinearGradient
              colors={['rgba(139, 92, 246, 0.2)', 'rgba(96, 165, 250, 0.2)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.backButtonGradient}
            >
              <ArrowLeft color="#ffffff" size={22} strokeWidth={2} />
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Create </Text>
          <Text style={styles.pageTitleBold}>Content</Text>
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.toggleBackground}>
            <Svg style={StyleSheet.absoluteFill} viewBox="0 0 100 100">
              <Defs>
                <Pattern
                  id="togglePattern"
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <Circle cx="5" cy="5" r="1" fill="rgba(255, 255, 255, 0.1)" />
                </Pattern>
              </Defs>
              <Rect width="100" height="100" fill="url(#togglePattern)" />
            </Svg>
            <Animated.View
              style={[
                styles.toggleSlider,
                {
                  transform: [{ translateX: slideTranslate }],
                },
              ]}
            >
              <View style={styles.toggleSliderInner} />
            </Animated.View>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => handleToggle('post')}
              activeOpacity={0.8}
            >
              <ImageIcon color={contentType === 'post' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'} size={18} strokeWidth={2.5} />
              <Text style={[styles.toggleText, contentType === 'post' && styles.toggleTextActive]}>
                Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => handleToggle('reel')}
              activeOpacity={0.8}
            >
              <Video color={contentType === 'reel' ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'} size={18} strokeWidth={2.5} />
              <Text style={[styles.toggleText, contentType === 'reel' && styles.toggleTextActive]}>
                Reel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputSection}>
          <LinearGradient
            colors={['rgba(96, 165, 250, 0.08)', 'rgba(59, 130, 246, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.inputCard}
          >
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Title</Text>
                  <View style={styles.labelBadge}>
                    <Text style={styles.labelBadgeText}>Required</Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['rgba(139, 92, 246, 0.15)', 'rgba(124, 58, 237, 0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.inputWrapper}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Enter title..."
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={title}
                    onChangeText={setTitle}
                  />
                </LinearGradient>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Caption</Text>
                  <View style={styles.labelBadge}>
                    <Text style={styles.labelBadgeText}>Required</Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['rgba(96, 165, 250, 0.15)', 'rgba(59, 130, 246, 0.08)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.inputWrapper}
                >
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Write your caption..."
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={caption}
                    onChangeText={setCaption}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                  />
                </LinearGradient>
              </View>
            </LinearGradient>

          <LinearGradient
            colors={['rgba(251, 191, 36, 0.12)', 'rgba(245, 158, 11, 0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.uploadCard}
          >
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Upload Media</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <LinearGradient
                    colors={['#fbbf24', '#f59e0b']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.uploadButton}
                  >
                    <Upload color="#000000" size={20} strokeWidth={2.5} />
                    <Text style={styles.uploadButtonText}>Upload File</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Paste Media Link</Text>
                <LinearGradient
                  colors={['rgba(251, 191, 36, 0.2)', 'rgba(245, 158, 11, 0.12)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.linkInputContainer}
                >
                  <View style={styles.linkIconWrapper}>
                    <Link color="#fbbf24" size={18} strokeWidth={2} />
                  </View>
                  <TextInput
                    style={styles.linkInput}
                    placeholder="https://..."
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={mediaLink}
                    onChangeText={setMediaLink}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </LinearGradient>
              </View>
            </LinearGradient>

          <LinearGradient
            colors={['rgba(163, 230, 53, 0.12)', 'rgba(132, 204, 22, 0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tagsCard}
          >
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Tags</Text>
                <View style={styles.tagInputContainer}>
                  <TextInput
                    style={styles.tagInput}
                    placeholder="Add a tag..."
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={tagInput}
                    onChangeText={setTagInput}
                    onSubmitEditing={handleAddTag}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    onPress={handleAddTag}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={['#a3e635', '#84cc16']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.addTagButton}
                    >
                      <Text style={styles.addTagButtonText}>Add</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                {tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {tags.map((tag) => (
                      <LinearGradient
                        key={tag}
                        colors={['rgba(163, 230, 53, 0.25)', 'rgba(132, 204, 22, 0.2)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.tag}
                      >
                        <Text style={styles.tagText}>#{tag}</Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveTag(tag)}
                          activeOpacity={0.7}
                          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                          <X color="#a3e635" size={14} strokeWidth={2.5} />
                        </TouchableOpacity>
                      </LinearGradient>
                    ))}
                  </View>
                )}
              </View>
            </LinearGradient>

          <LinearGradient
            colors={['rgba(251, 146, 60, 0.12)', 'rgba(249, 115, 22, 0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scheduleCard}
          >
              <View style={styles.inputGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Schedule</Text>
                  <View style={styles.labelBadgeOptional}>
                    <Text style={styles.labelBadgeTextOptional}>Optional</Text>
                  </View>
                </View>
                <TouchableOpacity activeOpacity={0.7}>
                  <LinearGradient
                    colors={['rgba(251, 146, 60, 0.2)', 'rgba(249, 115, 22, 0.15)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.scheduleButton}
                  >
                    <View style={styles.scheduleIconWrapper}>
                      <Calendar color="#fb923c" size={18} strokeWidth={2} />
                    </View>
                    <Text style={styles.scheduleButtonText}>
                      {scheduleDate || 'Select date & time'}
                    </Text>
                  </LinearGradient>
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
                      <LinearGradient
                        colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.04)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.platformChip}
                      >
                        <Text style={styles.platformChipText}>
                          {platform}
                        </Text>
                      </LinearGradient>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.createButtonWrapper,
              (!title || !caption || selectedPlatforms.length === 0) && styles.createButtonDisabled,
            ]}
            onPress={handleCreate}
            activeOpacity={0.8}
            disabled={!title || !caption || selectedPlatforms.length === 0}
          >
            <LinearGradient
              colors={(!title || !caption || selectedPlatforms.length === 0)
                ? ['rgba(139, 92, 246, 0.3)', 'rgba(124, 58, 237, 0.3)']
                : ['#8b5cf6', '#7c3aed']}
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
  floatingOrb: {
    position: 'absolute',
    width: 150,
    height: 150,
    pointerEvents: 'none',
  },
  orb1: {
    top: 100,
    right: -50,
  },
  orb2: {
    top: 400,
    left: -70,
  },
  orb3: {
    top: 700,
    right: -30,
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
    borderColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: 24,
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
  sparkleIcon: {
    marginLeft: 12,
    marginTop: 8,
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
    borderColor: 'rgba(139, 92, 246, 0.3)',
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    backgroundColor: 'rgba(96, 165, 250, 0.15)',
  },
  toggleSlider: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    right: '50%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  toggleSliderInner: {
    flex: 1,
    backgroundColor: '#000000',
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
    letterSpacing: -0.4,
  },
  toggleTextActive: {
    color: '#ffffff',
  },
  inputSection: {
    gap: 20,
  },
  inputCard: {
    borderRadius: 32,
    padding: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(96, 165, 250, 0.3)',
    gap: 24,
    shadowColor: '#60a5fa',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  uploadCard: {
    borderRadius: 32,
    padding: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    gap: 20,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  tagsCard: {
    borderRadius: 32,
    padding: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(163, 230, 53, 0.3)',
    shadowColor: '#a3e635',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  scheduleCard: {
    borderRadius: 32,
    padding: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(251, 146, 60, 0.3)',
    shadowColor: '#fb923c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
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
    backgroundColor: 'rgba(96, 165, 250, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.5)',
  },
  labelBadgeText: {
    color: '#60a5fa',
    fontSize: 11,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  labelBadgeOptional: {
    backgroundColor: 'rgba(251, 146, 60, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(251, 146, 60, 0.4)',
  },
  labelBadgeTextOptional: {
    color: '#fb923c',
    fontSize: 11,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(96, 165, 250, 0.3)',
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
    backgroundColor: 'rgba(251, 191, 36, 0.3)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 13,
    fontFamily: 'Archivo-Bold',
    letterSpacing: 2,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderRadius: 20,
    paddingVertical: 20,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  linkInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(251, 191, 36, 0.3)',
    paddingLeft: 20,
  },
  linkIconWrapper: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkInput: {
    flex: 1,
    paddingVertical: 18,
    paddingRight: 20,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  tagInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tagInput: {
    flex: 1,
    backgroundColor: 'rgba(163, 230, 53, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    borderWidth: 1.5,
    borderColor: 'rgba(163, 230, 53, 0.3)',
  },
  addTagButton: {
    borderRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a3e635',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  addTagButtonText: {
    color: '#000000',
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
    borderWidth: 1.5,
    borderColor: 'rgba(163, 230, 53, 0.4)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#a3e635',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(251, 146, 60, 0.3)',
  },
  scheduleIconWrapper: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(251, 146, 60, 0.2)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: 'rgba(255, 255, 255, 0.7)',
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
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
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
    borderRadius: 32,
    overflow: 'hidden',
    marginTop: 12,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonGradient: {
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 19,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
});
