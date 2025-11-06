const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_SECRET = "r9AaPoMCwkSlp9Tjt_W9M7fv174";
const API_KEY = "849529682114478";
const CLOUD_NAME = "dmzdsr0af";

app.post("/delete-signature", (req, res) => {
  const { public_id } = req.body;
  const timestamp = Math.floor(Date.now() / 1000);

  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${public_id}&timestamp=${timestamp}${API_SECRET}`)
    .digest("hex");

  res.json({ signature, timestamp, api_key: API_KEY, cloud_name: CLOUD_NAME });
});

app.listen(3000, () => console.log("✅ Servidor backend rodando na porta 3000"));
