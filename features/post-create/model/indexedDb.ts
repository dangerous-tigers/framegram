import { IDBPDatabase, openDB } from 'idb';

import { DraftData } from '@/features/post-create/model/types';

const DB_NAME = 'create-post';
const STORE_NAME = 'draft';

let dbPromise: Promise<IDBPDatabase> | null = null;

const getDb = () => {
  if (typeof window === 'undefined') return null;

  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }

  return dbPromise;
};

export const saveDraft = async (data: DraftData) => {
  const db = await getDb();
  if (!db) return;

  await db.put(STORE_NAME, data, 'draft');
};

export const loadDraft = async (): Promise<DraftData | undefined> => {
  const db = await getDb();
  if (!db) return;

  return db.get(STORE_NAME, 'draft');
};

export const clearDraft = async () => {
  const db = await getDb();
  if (!db) return;

  await db.delete(STORE_NAME, 'draft');
};
