import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드의 HMR에서도 연결을 재사용하기 위해 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> | null {
  if (!uri) return null;
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 연결에 실패하면 캐시를 비워 다음 요청에서 다시 연결을 시도합니다.
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClientPromise;
}

type ClickDoc = { _id: string; count: number };

async function getCollection() {
  const clientPromise = getClientPromise();
  if (!clientPromise) return null;
  const client = await clientPromise;
  return client.db(dbName).collection<ClickDoc>("clicks");
}

// MONGODB_URI가 없거나 DB 오류가 나면 빈 객체를 반환해 페이지는 정상 표시됩니다.
export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const collection = await getCollection();
    if (!collection) return {};
    const docs = await collection.find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return {};
  }
}

export async function incrementClick(linkId: string): Promise<boolean> {
  const collection = await getCollection();
  if (!collection) return false;
  await collection.updateOne(
    { _id: linkId },
    { $inc: { count: 1 } },
    { upsert: true },
  );
  return true;
}
