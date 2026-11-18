// Called by the Laravel admin after any content change: refreshes every page on the next visit.
import { revalidatePath, revalidateTag } from 'next/cache';
import { CMS_TAG } from '@/lib/cms';

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { secret?: string };
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || body.secret !== secret) return Response.json({ ok: false }, { status: 401 });
  revalidateTag(CMS_TAG, { expire: 0 });
  revalidatePath('/', 'layout');
  return Response.json({ ok: true, at: new Date().toISOString() });
}
