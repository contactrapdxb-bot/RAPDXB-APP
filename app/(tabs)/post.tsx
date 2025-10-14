import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, TextInput, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Upload, Link, Calendar, X, Image as ImageIcon, Video } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState, useRef, useEffect } from 'react';

const PLATFORMS_POST = ['Instagram', 'Facebook', 'Twitter'];
const PLATFORMS_REEL = ['Instagram Reels', 'YouTube Shorts', 'TikTok', 'Facebook Reels', 'Snapchat'];

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

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: contentType === 'post' ? 0 : 1,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [contentType]);

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
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
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
    outputRange: [4, 134],
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
    };
    return colorMap[platform] || ['#8b5cf6', '#7c3aed'];
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
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
            <ArrowLeft color="#ffffff" size={22} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Create </Text>
          <Text style={styles.pageTitleBold}>Content</Text>
        </View>

        <View style={styles.toggleContainer}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.08)', 'rgba(96, 165, 250, 0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.toggleBackground}
          >
            <Animated.View
              style={[
                styles.toggleSlider,
                {
                  transform: [{ translateX: slideTranslate }],
                },
              ]}
            >
              <LinearGradient
                colors={contentType === 'post' ? ['#8b5cf6', '#7c3aed'] : ['#60a5fa', '#3b82f6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.toggleSliderGradient}
              />
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
          </LinearGradient>
        </View>

        <View style={styles.inputSection}>
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.05)', 'rgba(139, 92, 246, 0.02)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.inputCard}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Title</Text>
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(124, 58, 237, 0.05)']}
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
              <Text style={styles.label}>Caption</Text>
              <LinearGradient
                colors={['rgba(96, 165, 250, 0.1)', 'rgba(59, 130, 246, 0.05)']}
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
            colors={['rgba(251, 191, 36, 0.1)', 'rgba(245, 158, 11, 0.05)']}
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Or Paste Media Link</Text>
              <LinearGradient
                colors={['rgba(251, 191, 36, 0.15)', 'rgba(245, 158, 11, 0.08)']}
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
            colors={['rgba(163, 230, 53, 0.1)', 'rgba(132, 204, 22, 0.05)']}
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
                  {tags.map((tag, index) => (
                    <LinearGradient
                      key={tag}
                      colors={['rgba(163, 230, 53, 0.2)', 'rgba(132, 204, 22, 0.15)']}
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
            colors={['rgba(251, 146, 60, 0.1)', 'rgba(249, 115, 22, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scheduleCard}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Schedule (Optional)</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <LinearGradient
                  colors={['rgba(251, 146, 60, 0.15)', 'rgba(249, 115, 22, 0.08)']}
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
            <Text style={styles.platformsTitle}>Select Platforms</Text>
            <View style={styles.platformGrid}>
              {platforms.map((platform) => {
                const isSelected = selectedPlatforms.includes(platform);
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
                        colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 48,
  },
  titleSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
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
    borderRadius: 20,
    padding: 4,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  toggleSlider: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: 126,
    borderRadius: 16,
    overflow: 'hidden',
  },
  toggleSliderGradient: {
    flex: 1,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 14,
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
    gap: 16,
  },
  inputCard: {
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
    gap: 20,
  },
  uploadCard: {
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.2)',
    gap: 20,
  },
  tagsCard: {
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(163, 230, 53, 0.2)',
  },
  scheduleCard: {
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(251, 146, 60, 0.2)',
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  inputWrapper: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    minHeight: 140,
    paddingTop: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 18,
    paddingVertical: 18,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  linkInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.2)',
    paddingLeft: 18,
  },
  linkIconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkInput: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 18,
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
    backgroundColor: 'rgba(163, 230, 53, 0.08)',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: 'rgba(163, 230, 53, 0.2)',
  },
  addTagButton: {
    borderRadius: 18,
    paddingHorizontal: 28,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a3e635',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  addTagButtonText: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(163, 230, 53, 0.3)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(251, 146, 60, 0.2)',
  },
  scheduleIconWrapper: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(251, 146, 60, 0.15)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  },
  platformsSection: {
    gap: 16,
  },
  platformsTitle: {
    color: '#ffffff',
    fontSize: 19,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  platformChip: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 8,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonGradient: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.4,
  },
});
