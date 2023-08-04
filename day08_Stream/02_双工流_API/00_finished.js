const path = require('path');
const fs = require('fs');
const stream = require('stream');

const filePath = path.resolve(path.dirname(__filename), 'text.text');
const readable = fs.createReadStream(filePath);

// readable.destroy() // 关闭流

const clearnup = stream.finished(readable, (err) => {
    clearnup();
    if (err) {
        console.error('Stream failed.', err);
    } else {
        console.log('Stream is done reading.');
    }
});

readable.resume(); // Drain the stream. 
