const yauzl = require("yauzl");
const fs = require("fs");
const path = require("path");

// Open the ZIP file
yauzl.open("yourfile.zip", { lazyEntries: true }, function (err, zipfile) {
  if (err) throw err;

  zipfile.readEntry();

  // When an entry is read
  zipfile.on("entry", function (entry) {
    console.log("File:", entry.fileName);

    // If it's a directory, we skip it
    if (/\/$/.test(entry.fileName)) {
      zipfile.readEntry();
    } else {
      // Open the file entry
      zipfile.openReadStream(entry, function (err, readStream) {
        if (err) throw err;

        // Define where to write the file, or you can process it in memory
        const outputPath = path.join(__dirname, "output", entry.fileName);

        // Ensure directories exist
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        // Create a write stream for the file
        const writeStream = fs.createWriteStream(outputPath);

        // Pipe the read stream to the write stream (or handle data chunks here)
        readStream.pipe(writeStream);

        readStream.on("end", function () {
          zipfile.readEntry();
        });
      });
    }
  });

  // When there are no more entries
  zipfile.on("end", function () {
    console.log("Finished unzipping");
  });
});
