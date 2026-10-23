const fs = require('fs');

async function main() {
  try {
    let buf;
    const filePath = process.argv[2];
    if (filePath && fs.existsSync(filePath)) {
      buf = fs.readFileSync(filePath);
    } else {
      buf = fs.readFileSync(0); // read from stdin
    }

    if (!buf || buf.length === 0) {
      process.stdout.write(JSON.stringify({ text: '', numPages: 0 }));
      process.exit(0);
    }

    const { PDFParse } = require('pdf-parse');
    const parser = new PDFParse(new Uint8Array(buf));
    await parser.load();
    const result = await parser.getText();
    const text = result?.text || '';
    const numPages = result?.pages?.length || 1;

    process.stdout.write(JSON.stringify({ text, numPages, length: text.length }));
    process.exit(0);
  } catch (err) {
    process.stderr.write(String(err?.message || err));
    process.stdout.write(JSON.stringify({ text: '', error: String(err?.message || err) }));
    process.exit(0);
  }
}

main();
