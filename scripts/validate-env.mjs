const requiredEnvVars = ["TURSO_DATABASE_URL", "TURSO_AUTH_TOKEN"];
const isDeployBuild = process.env.VERCEL === "1";

if (!isDeployBuild) {
  process.exit(0);
}

const missing = requiredEnvVars.filter((key) => !process.env[key]?.trim());

if (missing.length > 0) {
  console.error(`Missing required deployment environment variables: ${missing.join(", ")}`);
  process.exit(1);
}
