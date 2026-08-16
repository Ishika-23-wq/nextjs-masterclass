import { NextRequest, NextResponse } from "next/server";
import { syllabusUnits } from "@/data/syllabus";
import { allTopics, searchTopics } from "@/data/topics";

// GET /api/content
// Optional query parameter: ?q=search_term or ?unit=unit-1
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const unitId = searchParams.get("unit");

  if (query) {
    const results = searchTopics(query);
    return NextResponse.json({
      query,
      count: results.length,
      results,
    });
  }

  if (unitId) {
    const unit = syllabusUnits.find((u) => u.id === unitId);
    const topics = allTopics.filter((t) => t.unitId === unitId);
    return NextResponse.json({
      unit,
      topics,
    });
  }

  return NextResponse.json({
    course: "INT257",
    title: "Next.js Full-Stack Masterclass",
    unitsCount: syllabusUnits.length,
    totalTopics: allTopics.length,
    units: syllabusUnits,
  });
}
