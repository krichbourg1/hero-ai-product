import prisma from './prisma';
import { Resume, WorkExperience, Education, UserSubscription } from '@prisma/client';

export type ResumeWithRelations = Resume & {
  workExperiences: WorkExperience[];
  educations: Education[];
};

export async function getResumesByUserId(userId: string) {
  return prisma.resume.findMany({
    where: { userId },
    include: {
      workExperiences: true,
      educations: true,
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getResumeById(id: string) {
  return prisma.resume.findUnique({
    where: { id },
    include: {
      workExperiences: true,
      educations: true,
    },
  });
}

export async function createResume(userId: string, data: Partial<Resume>) {
  return prisma.resume.create({
    data: {
      ...data,
      userId,
    },
    include: {
      workExperiences: true,
      educations: true,
    },
  });
}

export async function updateResume(id: string, data: Partial<Resume>) {
  return prisma.resume.update({
    where: { id },
    data,
    include: {
      workExperiences: true,
      educations: true,
    },
  });
}

export async function deleteResume(id: string) {
  return prisma.resume.delete({
    where: { id },
  });
}

export async function getUserSubscription(userId: string) {
  return prisma.userSubscription.findUnique({
    where: { userId },
  });
}

export async function updateUserSubscription(userId: string, data: Partial<Omit<UserSubscription, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) {
  return prisma.userSubscription.upsert({
    where: { userId },
    create: { ...data, userId } as UserSubscription,
    update: data,
  });
} 