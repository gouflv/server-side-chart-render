const express = require("express");
const qs = require("qs");
const { chartAppBaseUrl } = require("./config");
const { capturePageToFile } = require("./pptr");

const app = express();
const port = 3000;

app.get("/render/radar", async (req, res) => {
  const { data: jsonString } = req.query;

  // validate input
  try {
    JSON.parse(jsonString);
  } catch (e) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  // TODO logging

  // Call render
  const renderPageUrl = `${chartAppBaseUrl}?${qs.stringify(req.query)}`;

  try {
    const fileBuffers = await capturePageToFile(renderPageUrl);
    // Put buffers into a zip file

    res.status(200).send(fileBuffers);
  } catch (e) {
    res.status(500).json({ message: "Capture error" });
    return;
  }

  // res.status(200).json({ message: "OK" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
