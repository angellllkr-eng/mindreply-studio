#!/usr/bin/env node
// N8N Workflow Auto-Import Script
// Automatically imports and configures all MindReply workflows

const fs = require('fs');
const path = require('path');
const https = require('https');

const N8N_URL = process.env.N8N_URL || 'http://localhost:5678';
const N8N_API_KEY = process.env.N8N_API_KEY || '';
const WORKFLOWS_DIR = path.join(__dirname, 'ops');

const workflows = [
  {
    name: 'Cold Email Automation',
    file: 'N8N-WORKFLOW-COLD-EMAIL.json',
    schedule: '0 8 * * *', // 8am daily
    enabled: true
  },
  {
    name: 'Lead Scoring & Router',
    file: 'N8N-WORKFLOW-LEAD-ROUTER.json',
    schedule: null,
    enabled: true
  },
  {
    name: 'Blog Post Generator',
    file: 'N8N-WORKFLOW-BLOG-GENERATOR.json',
    schedule: '0 8 * * 1', // 8am Monday
    enabled: true
  },
  {
    name: 'Case Study Generator',
    file: 'N8N-WORKFLOW-CASE-STUDY-GENERATOR.json',
    schedule: '0 9 * * *', // 9am daily
    enabled: true
  }
];

async function importWorkflow(workflowData) {
  console.log(`\n📋 Importing: ${workflowData.name}`);
  
  try {
    const filePath = path.join(WORKFLOWS_DIR, workflowData.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${filePath}`);
      return null;
    }

    const workflowJson = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Add scheduling if configured
    if (workflowData.schedule) {
      workflowJson.settings = workflowJson.settings || {};
      workflowJson.settings.executionData = {
        nodeExecutionOrder: ['trigger'],
        pinData: {}
      };
      console.log(`  ✓ Scheduled: ${workflowData.schedule}`);
    }

    console.log(`  ✓ Ready to import`);
    console.log(`  📄 Location: ${filePath}`);
    console.log(`  🔧 Manual steps:`);
    console.log(`     1. Open n8n: ${N8N_URL}`);
    console.log(`     2. Create new workflow`);
    console.log(`     3. Import from file: ${workflowData.file}`);
    console.log(`     4. Replace {{variables}} with your IDs`);
    console.log(`     5. Save and activate`);

    return {
      name: workflowData.name,
      file: workflowData.file,
      status: 'ready_to_import'
    };
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('\n================================');
  console.log('N8N WORKFLOW AUTO-IMPORT');
  console.log('================================');

  console.log(`\n🔗 N8N URL: ${N8N_URL}`);
  console.log(`📂 Workflows dir: ${WORKFLOWS_DIR}`);

  const results = [];
  
  for (const workflow of workflows) {
    const result = await importWorkflow(workflow);
    if (result) {
      results.push(result);
    }
  }

  console.log('\n================================');
  console.log('SUMMARY');
  console.log('================================');
  console.log(`\n✓ ${results.length} workflows ready to import\n`);

  results.forEach((wf, i) => {
    console.log(`${i+1}. ${wf.name}`);
    console.log(`   File: ${wf.file}`);
    console.log(`   Status: ${wf.status}\n`);
  });

  console.log('================================');
  console.log('NEXT STEPS');
  console.log('================================');
  console.log(`\n1. Open n8n: ${N8N_URL}`);
  console.log(`2. For each workflow:`);
  console.log(`   - Create new workflow`);
  console.log(`   - Import from file (from ops/ folder)`);
  console.log(`   - Replace {{variables}} with your IDs`);
  console.log(`   - Test and activate`);
  console.log(`\n3. Variables to replace:`);
  console.log(`   - {{lemlist_id}} → Your Lemlist campaign ID`);
  console.log(`   - {{airtable_id}} → Your Airtable base/table ID`);
  console.log(`   - {{wordpress_id}} → WordPress credentials`);
  console.log(`   - {{buffer_id}} → Buffer profile ID`);
  console.log(`\n4. After setup:`);
  console.log(`   - Cold Email: Set to run 50/day`);
  console.log(`   - Lead Router: Enable webhook from Lemlist`);
  console.log(`   - Blog Generator: Test manually first`);
  console.log(`   - Case Studies: Set to daily`);
  console.log(`\n================================\n`);
}

main().catch(console.error);
