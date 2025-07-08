import { NextRequest, NextResponse } from 'next/server';

// @ts-ignore
import JSZip from 'jszip';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { html, css, js, projectName } = await req.json();
  const NETLIFY_TOKEN = process.env.NETLIFY_TOKEN

  if (!NETLIFY_TOKEN) {
    return NextResponse.json({ success: false, error: 'Missing Netlify token in environment.' }, { status: 500 });
  }

  if (!html || !css || !js) {
    return NextResponse.json({ success: false, error: 'Missing files.' }, { status: 400 });
  }

  // Create a zip file with index.html, style.css, index.js
  const zip = new JSZip();
  zip.file('index.html', html);
  zip.file('style.css', css);
  zip.file('index.js', js);
  const zipBlob = await zip.generateAsync({ type: 'nodebuffer' });

  // Deploy to Netlify
  try {
    // 1. Create a new site (anonymous, or you can use a team if you want)
    const siteRes = await fetch('https://api.netlify.com/api/v1/sites', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: undefined, // Let Netlify generate a random name
      }),
    });
    if (!siteRes.ok) {
      const err = await siteRes.text();
      return NextResponse.json({ success: false, error: 'Failed to create Netlify site: ' + err }, { status: 500 });
    }
    const site = await siteRes.json();
    const siteId = site.id;

    // 2. Deploy the zip as a deploy
    const deployRes = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/deploys`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
      },
      body: zipBlob,
    });
    if (!deployRes.ok) {
      const err = await deployRes.text();
      return NextResponse.json({ success: false, error: 'Failed to deploy to Netlify: ' + err }, { status: 500 });
    }
    const deploy = await deployRes.json();
    const url = deploy.deploy_ssl_url || deploy.ssl_url || deploy.url;
    return NextResponse.json({ success: true, url });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Deployment error: ' + ((error as any)?.message || String(error)) }, { status: 500 });
  }
} 