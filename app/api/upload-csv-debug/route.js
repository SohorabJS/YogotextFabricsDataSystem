import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Log all entries
    const entries = Array.from(formData.entries());
    console.log('FormData entries:', entries);
    
    // Check what we received
    const fileEntry = formData.get('file');
    
    return NextResponse.json(
      {
        message: 'Debug info',
        entriesCount: entries.length,
        entries: entries.map(([key, value]) => ({
          key,
          valueType: value?.constructor?.name,
          valueSize: value?.size,
          fileName: value?.name,
        })),
        hasFile: !!fileEntry,
        fileType: fileEntry?.constructor?.name,
        fileName: fileEntry?.name,
        fileSize: fileEntry?.size,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
