import express from "express";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const app = express();

app.get("/", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing ?url=" });

  try {
    const html = await fetch(url).then(r => r.text());
    const dom = new JSDOM(html, { url });
    const article = new Readability(dom.window.document).parse();
    res.json(article);
  } catch (err) {
    console.error("Readability failed:", err);
    res.status(500).json({ error: "Failed to parse" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Readability API running on port " + port));
