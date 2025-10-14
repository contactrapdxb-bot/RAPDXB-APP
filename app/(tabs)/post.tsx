import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, TextInput, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Upload, Link, Calendar, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState, useRef, useEffect } from 'react';

const PLATFORMS_POST = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn'];
const PLATFORMS_REEL = ['Instagram Reels', 'YouTube Shorts', 'TikTok', 'Facebook Reels'];

export default function PostScreen() {
  const insets = useSafeAreaInsets();
  const [contentType, setContentType] = useState<'post' | 'reel'>('post');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

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
    // Handle create logic here
    console.log('Creating', contentType, { title, caption, selectedPlatforms, scheduleDate });
  };

  const platforms = contentType === 'post' ? PLATFORMS_POST : PLATFORMS_REEL;

  const slideTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.6}
        >
          <ArrowLeft color="#ffffff" size={24} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Content</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Toggle */}
        <View style={styles.toggleContainer}>
          <View style={styles.toggleBackground}>
            <Animated.View
              style={[
                styles.toggleSlider,
                {
                  transform: [{ translateX: slideTranslate }],
                },
              ]}
            />
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => handleToggle('post')}
              activeOpacity={0.8}
            >
              <Text style={[styles.toggleText, contentType === 'post' && styles.toggleTextActive]}>
                Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.toggleOption}
              onPress={() => handleToggle('reel')}
              activeOpacity={0.8}
            >
              <Text style={[styles.toggleText, contentType === 'reel' && styles.toggleTextActive]}>
                Reel
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title..."
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Caption */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Caption</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write your caption..."
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              value={caption}
              onChangeText={setCaption}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Upload or Paste Link */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Media</Text>
            <View style={styles.mediaButtons}>
              <TouchableOpacity style={styles.mediaButton} activeOpacity={0.7}>
                <Upload color="#ffffff" size={20} />
                <Text style={styles.mediaButtonText}>Upload</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaButton} activeOpacity={0.7}>
                <Link color="#ffffff" size={20} />
                <Text style={styles.mediaButtonText}>Paste Link</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Platform Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Platforms</Text>
            <View style={styles.platformGrid}>
              {platforms.map((platform) => (
                <TouchableOpacity
                  key={platform}
                  style={[
                    styles.platformChip,
                    selectedPlatforms.includes(platform) && styles.platformChipActive,
                  ]}
                  onPress={() => handlePlatformToggle(platform)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.platformChipText,
                      selectedPlatforms.includes(platform) && styles.platformChipTextActive,
                    ]}
                  >
                    {platform}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tags */}
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
                style={styles.addTagButton}
                onPress={handleAddTag}
                activeOpacity={0.7}
              >
                <Text style={styles.addTagButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            {tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                    <TouchableOpacity
                      onPress={() => handleRemoveTag(tag)}
                      activeOpacity={0.7}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <X color="#ffffff" size={14} strokeWidth={2.5} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Schedule */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Schedule (Optional)</Text>
            <TouchableOpacity style={styles.scheduleButton} activeOpacity={0.7}>
              <Calendar color="#ffffff" size={20} />
              <Text style={styles.scheduleButtonText}>
                {scheduleDate || 'Select date & time'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[
            styles.createButton,
            (!title || !caption || selectedPlatforms.length === 0) && styles.createButtonDisabled,
          ]}
          onPress={handleCreate}
          activeOpacity={0.8}
          disabled={!title || !caption || selectedPlatforms.length === 0}
        >
          <Text style={styles.createButtonText}>
            {contentType === 'post' ? 'Create Post' : 'Create Reel'}
          </Text>
        </TouchableOpacity>
      </View>
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  toggleContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  toggleBackground: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 4,
    position: 'relative',
  },
  toggleSlider: {
    position: 'absolute',
    left: 4,
    top: 4,
    bottom: 4,
    width: 120,
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  toggleText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  toggleTextActive: {
    color: '#ffffff',
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 24,
  },
  inputGroup: {
    gap: 12,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  mediaButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  mediaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  mediaButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  platformChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  platformChipActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: '#8b5cf6',
  },
  platformChipText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  platformChipTextActive: {
    color: '#ffffff',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scheduleButtonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 15,
    fontFamily: 'Inter-Regular',
  },
  tagInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tagInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  addTagButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTagButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderColor: '#8b5cf6',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#000000',
  },
  createButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonDisabled: {
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.3,
  },
});
