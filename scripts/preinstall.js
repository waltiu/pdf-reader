if (!/pnpm/.test(process.env.npm_execpath || '')) {
    console.warn(
      `\u001b[33mThis repository must using pnpm as the package manager ` +
      ` npm run instal.\u001b[39m\n`,
    )
    process.exit(1)
  }