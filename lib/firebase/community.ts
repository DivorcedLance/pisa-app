// @/lib/firebase/community

import { CommonQuestion } from '@/types/commonQuestion';
import { CommunityPost } from '@/types/communityPost';

import { commonQuestions } from '@/mock/commonQuestions';
import { communityPosts } from '@/mock/communityPosts';

export async function getCommonQuestions(): Promise<CommonQuestion[]> {
  return commonQuestions;
}

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  return communityPosts;
}