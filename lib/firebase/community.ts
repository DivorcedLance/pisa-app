// @/lib/firebase/community

import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

import { CommonQuestion } from '@/types/commonQuestion';
import { CommunityPost } from '@/types/communityPost';

import { commonQuestions } from '@/mock/commonQuestions';
import { getUserDataById } from "./userData";

export async function getCommonQuestions(): Promise<CommonQuestion[]> {
  return commonQuestions;
}

export async function getCommunityPosts(): Promise<CommunityPost[]> {

  const posts: CommunityPost[] = [];

  const postsQuery = query(collection(db, 'CommunityPost'));

  const postsSnapshot = await getDocs(postsQuery);

  for (const doc of postsSnapshot.docs) {
    const post = doc.data();
    const user = await getUserDataById(post.studentId);

    if (!user) {
      continue;
    }

    posts.push({
      id: doc.id,
      student: user,
      ...post,
      date: new Date(post.date.seconds * 1000),
    } as CommunityPost);
  }

  return posts;
}

export async function getCommunityPostById(id: string): Promise<CommunityPost | null> {

  const postDoc = await getDoc(doc(db, 'CommunityPost', id));

  if (!postDoc.exists()) {
    return null;
  }

  const user = await getUserDataById(postDoc.data().studentId);

  const answers: CommunityPost[] = [];

  const answersQuery = query(collection(db, 'CommunityPost'), where('responseTo', '==', id));
  const answersSnapshot = await getDocs(answersQuery);

  for (const doc of answersSnapshot.docs) {
    const post = doc.data();
    const user = await getUserDataById(post.studentId);

    if (!user) {
      continue;
    }

    answers.push({
      id: doc.id,
      student: user,
      ...post,
      date: new Date(post.date.seconds * 1000),
    } as CommunityPost);
  }

  return {
    id: postDoc.id,
    student: user,
    answers,
    ...postDoc.data(),
    date: new Date(postDoc.data().date.seconds * 1000),
  } as CommunityPost;
}