import Contentstack from "contentstack";  // ✅ THIS LINE WAS MISSING

const Stack = Contentstack.Stack({
  api_key: "blte8a7320ba7ce4af3",
  delivery_token: "cs4b703d4ef75676a498e4112a",
  environment: "development",
  region: Contentstack.Region.EU,
});

export default Stack;