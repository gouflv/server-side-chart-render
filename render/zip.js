function zipBuffers(buffers) {
  var zip = new JSZip();
  for (var i = 0; i < buffers.length; i++) {
    zip.file(i + ".txt", buffers[i]);
  }
  return zip.generate({ type: "uint8array", compression: "DEFLATE" });
}
